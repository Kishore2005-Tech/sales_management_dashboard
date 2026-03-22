"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings2, GripVertical, RotateCcw } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface StageOrderModalProps {
  stages: string[]
  stageOrder: string[]
  onOrderChange: (newOrder: string[]) => void
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]

function SortableStageItem({ stage, index }: { stage: string; index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-md border border-border bg-secondary/50 px-3 py-2.5 ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      <button
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div
        className="h-3 w-3 rounded-sm"
        style={{ backgroundColor: COLORS[index % COLORS.length] }}
      />
      <span className="flex-1 text-sm font-medium text-foreground">{stage}</span>
      <span className="text-xs text-muted-foreground">#{index + 1}</span>
    </div>
  )
}

export function StageOrderModal({ stages, stageOrder, onOrderChange }: StageOrderModalProps) {
  const [open, setOpen] = useState(false)
  const [localOrder, setLocalOrder] = useState<string[]>(stageOrder)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Sync local order when stageOrder prop changes or modal opens
  useEffect(() => {
    if (open) {
      setLocalOrder(stageOrder)
    }
  }, [open, stageOrder])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setLocalOrder((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleReset = () => {
    setLocalOrder(stages)
  }

  const handleApply = () => {
    onOrderChange(localOrder)
    setOpen(false)
  }

  const hasChanges = JSON.stringify(localOrder) !== JSON.stringify(stageOrder)
  const isDefaultOrder = JSON.stringify(localOrder) === JSON.stringify(stages)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Stage Order</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pipeline Stage Order</DialogTitle>
          <DialogDescription>
            Drag and drop to reorder the pipeline stages. This order will be used in charts and reports.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={localOrder} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {localOrder.map((stage, index) => (
                  <SortableStageItem key={stage} stage={stage} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={isDefaultOrder}
            className="gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Reset to Default
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={!hasChanges}>
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
