"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/dashboard-store"
import type { Deal } from "@/lib/types"
import { Search, Settings2, GripVertical } from "lucide-react"
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
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface DealsTableProps {
  deals: Deal[]
}

type ColumnKey = "id" | "location" | "owner" | "stage" | "source" | "status" | "value"

interface Column {
  key: ColumnKey
  label: string
  visible: boolean
}

const DEFAULT_COLUMNS: Column[] = [
  { key: "id", label: "ID", visible: true },
  { key: "location", label: "Location", visible: true },
  { key: "owner", label: "Owner", visible: true },
  { key: "stage", label: "Stage", visible: true },
  { key: "source", label: "Source", visible: true },
  { key: "status", label: "Status", visible: true },
  { key: "value", label: "Value", visible: true },
]

function SortableColumnHeader({ column, children }: { column: Column; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.key })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      className={`text-muted-foreground ${column.key === "value" ? "text-right" : ""}`}
    >
      <div className="flex items-center gap-1">
        <button
          className="cursor-grab touch-none text-muted-foreground/50 hover:text-muted-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-3 w-3" />
        </button>
        {children}
      </div>
    </TableHead>
  )
}

export function DealsTable({ deals }: DealsTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [ownerFilter, setOwnerFilter] = useState<string>("all")
  const [stageFilter, setStageFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [stateFilter, setStateFilter] = useState<string>("all")
  const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const owners = useMemo(() => Array.from(new Set(deals.map((d) => d.Owner))).filter(Boolean).sort(), [deals])
  const stages = useMemo(() => Array.from(new Set(deals.map((d) => d.Stage))).filter(Boolean).sort(), [deals])
  const sources = useMemo(() => Array.from(new Set(deals.map((d) => d.Source))).filter(Boolean).sort(), [deals])
  const states = useMemo(() => Array.from(new Set(deals.map((d) => d.State))).filter(Boolean).sort(), [deals])

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        search === "" ||
        deal.City?.toLowerCase().includes(search.toLowerCase()) ||
        deal.State?.toLowerCase().includes(search.toLowerCase()) ||
        deal.Owner?.toLowerCase().includes(search.toLowerCase()) ||
        deal.Stage?.toLowerCase().includes(search.toLowerCase()) ||
        deal.Source?.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === "all" || deal.Status === statusFilter
      const matchesOwner = ownerFilter === "all" || deal.Owner === ownerFilter
      const matchesStage = stageFilter === "all" || deal.Stage === stageFilter
      const matchesSource = sourceFilter === "all" || deal.Source === sourceFilter
      const matchesState = stateFilter === "all" || deal.State === stateFilter

      return matchesSearch && matchesStatus && matchesOwner && matchesStage && matchesSource && matchesState
    })
  }, [deals, search, statusFilter, ownerFilter, stageFilter, sourceFilter, stateFilter])

  const visibleColumns = columns.filter((col) => col.visible)

  const toggleColumn = (key: ColumnKey) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((i) => i.key === active.id)
        const newIndex = items.findIndex((i) => i.key === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">Open</Badge>
      case "Won":
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">Won</Badge>
      case "Lost":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Lost</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderCell = (deal: Deal, columnKey: ColumnKey) => {
    switch (columnKey) {
      case "id":
        return (
          <TableCell className="font-mono text-sm text-muted-foreground">
            #{deal.ID}
          </TableCell>
        )
      case "location":
        return (
          <TableCell>
            <div className="text-foreground">{deal.City}</div>
            <div className="text-sm text-muted-foreground">
              {deal.State}, {deal.Country}
            </div>
          </TableCell>
        )
      case "owner":
        return <TableCell className="text-foreground">{deal.Owner}</TableCell>
      case "stage":
        return <TableCell className="text-foreground">{deal.Stage}</TableCell>
      case "source":
        return <TableCell className="text-foreground">{deal.Source}</TableCell>
      case "status":
        return <TableCell>{getStatusBadge(deal.Status)}</TableCell>
      case "value":
        return (
          <TableCell className="text-right font-medium text-foreground">
            {formatCurrency(deal.Value, deal.Currency)}
          </TableCell>
        )
      default:
        return null
    }
  }

  const resetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setOwnerFilter("all")
    setStageFilter("all")
    setSourceFilter("all")
    setStateFilter("all")
  }

  const hasActiveFilters = search || statusFilter !== "all" || ownerFilter !== "all" || stageFilter !== "all" || sourceFilter !== "all" || stateFilter !== "all"

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Deals</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings2 className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={column.visible}
                  onCheckedChange={() => toggleColumn(column.key)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col gap-3 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-secondary border-border pl-10"
              />
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="shrink-0">
                Clear filters
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] bg-secondary border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[150px] bg-secondary border-border">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[140px] bg-secondary border-border">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ownerFilter} onValueChange={setOwnerFilter}>
              <SelectTrigger className="w-[150px] bg-secondary border-border">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Owners</SelectItem>
                {owners.map((owner) => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[150px] bg-secondary border-border">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-border">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <SortableContext
                    items={visibleColumns.map((c) => c.key)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {visibleColumns.map((column) => (
                      <SortableColumnHeader key={column.key} column={column}>
                        {column.label}
                      </SortableColumnHeader>
                    ))}
                  </SortableContext>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.slice(0, 15).map((deal) => (
                  <TableRow key={deal.ID} className="border-border hover:bg-secondary/50">
                    {visibleColumns.map((column) => (
                      <React.Fragment key={column.key}>
                        {renderCell(deal, column.key)}
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
                {filteredDeals.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length} className="h-24 text-center text-muted-foreground">
                      No deals found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Showing {Math.min(15, filteredDeals.length)} of {filteredDeals.length} deals
        </p>
      </CardContent>
    </Card>
  )
}
