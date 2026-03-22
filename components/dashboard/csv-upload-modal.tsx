"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { parseCSV, autoMapFields, mapDataToDeals } from "@/lib/csv-parser"
import type { Deal, FieldMapping } from "@/lib/types"
import { DEAL_FIELDS } from "@/lib/types"
import { Upload, FileUp, Check, ArrowRight } from "lucide-react"

interface CSVUploadModalProps {
  onDataImported: (deals: Deal[]) => void
}

type Step = "upload" | "mapping" | "preview"

export function CSVUploadModal({ onDataImported }: CSVUploadModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("upload")
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([])
  const [mappings, setMappings] = useState<FieldMapping[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState<string>("")

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file")
      return
    }

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const { headers, rows } = parseCSV(text)
      setCsvHeaders(headers)
      setCsvRows(rows)

      // Auto-map fields
      const autoMappings = autoMapFields(headers)
      setMappings(autoMappings)
      setStep("mapping")
    }
    reader.readAsText(file)
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const updateMapping = (csvField: string, dealField: string) => {
    setMappings((prev) =>
      prev.map((m) =>
        m.csvField === csvField ? { ...m, dealField: dealField as FieldMapping["dealField"] } : m
      )
    )
  }

  const handleImport = () => {
    const deals = mapDataToDeals(csvRows, mappings) as Deal[]
    onDataImported(deals)
    setOpen(false)
    resetState()
  }

  const resetState = () => {
    setStep("upload")
    setCsvHeaders([])
    setCsvRows([])
    setMappings([])
    setFileName("")
  }

  const mappedFieldsCount = mappings.filter((m) => m.dealField).length

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) resetState()
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Upload className="mr-2 h-4 w-4" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {step === "upload" && "Upload CSV File"}
            {step === "mapping" && "Map Your Fields"}
            {step === "preview" && "Preview Import"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === "upload" && "Upload a CSV file with your sales data"}
            {step === "mapping" && "Map your CSV columns to the deal fields"}
            {step === "preview" && "Review your data before importing"}
          </DialogDescription>
        </DialogHeader>

        {step === "upload" && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <FileUp className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-center text-foreground">
              Drag and drop your CSV file here
            </p>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              or click to browse
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <Button variant="outline" className="pointer-events-none border-border bg-secondary text-foreground">
              Browse Files
            </Button>
          </div>
        )}

        {step === "mapping" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
              <span className="text-sm text-muted-foreground">
                File: <span className="font-medium text-foreground">{fileName}</span>
              </span>
              <span className="text-sm text-muted-foreground">
                {csvRows.length} rows found
              </span>
            </div>

            <ScrollArea className="h-[300px] rounded-lg border border-border p-4">
              <div className="space-y-4">
                {mappings.map((mapping) => (
                  <div key={mapping.csvField} className="flex items-center gap-4">
                    <div className="w-1/3">
                      <Label className="text-sm text-muted-foreground">CSV Column</Label>
                      <div className="mt-1 rounded-md bg-secondary px-3 py-2 text-sm text-foreground">
                        {mapping.csvField}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="w-1/2">
                      <Label className="text-sm text-muted-foreground">Map to Field</Label>
                      <Select
                        value={mapping.dealField || "none"}
                        onValueChange={(value) =>
                          updateMapping(mapping.csvField, value === "none" ? "" : value)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-secondary border-border">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">-- Skip this field --</SelectItem>
                          {DEAL_FIELDS.map((field) => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {mapping.dealField && (
                      <Check className="h-5 w-5 shrink-0 text-chart-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">
                {mappedFieldsCount} of {mappings.length} fields mapped
              </span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("upload")} className="border-border bg-secondary text-foreground">
                  Back
                </Button>
                <Button
                  onClick={() => setStep("preview")}
                  disabled={mappedFieldsCount === 0}
                  className="bg-primary text-primary-foreground"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-4">
            <div className="rounded-lg bg-secondary p-4">
              <h4 className="mb-2 font-medium text-foreground">Import Summary</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>{csvRows.length} deals will be imported</li>
                <li>{mappedFieldsCount} fields will be mapped</li>
              </ul>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    {mappings
                      .filter((m) => m.dealField)
                      .slice(0, 5)
                      .map((m) => (
                        <th key={m.csvField} className="p-2 text-left font-medium text-muted-foreground">
                          {m.dealField}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {csvRows.slice(0, 3).map((row, i) => (
                    <tr key={i} className="border-b border-border">
                      {mappings
                        .filter((m) => m.dealField)
                        .slice(0, 5)
                        .map((m) => (
                          <td key={m.csvField} className="p-2 text-foreground">
                            {row[m.csvField] || "-"}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep("mapping")} className="border-border bg-secondary text-foreground">
                Back
              </Button>
              <Button onClick={handleImport} className="bg-primary text-primary-foreground">
                Import {csvRows.length} Deals
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
