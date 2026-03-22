import type { Deal, FieldMapping } from "./types"

export function parseCSV(csvText: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim())
  if (lines.length === 0) return { headers: [], rows: [] }

  // Parse headers
  const headers = parseCSVLine(lines[0])

  // Parse rows
  const rows: Record<string, string>[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ""
    })
    rows.push(row)
  }

  return { headers, rows }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        current += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ",") {
        result.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
  }

  result.push(current.trim())
  return result
}

export function autoMapFields(csvHeaders: string[]): FieldMapping[] {
  const fieldMappings: Record<string, string> = {
    city: "City",
    state: "State",
    region: "Region",
    country: "Country",
    "post code": "Post Code",
    postcode: "Post Code",
    "postal code": "Post Code",
    zip: "Post Code",
    zipcode: "Post Code",
    title: "Title",
    creator: "Creator",
    owner: "Owner",
    value: "Value",
    amount: "Value",
    deal_value: "Value",
    currency: "Currency",
    "weighted value": "Weighted value",
    probability: "Probability",
    organization: "Organization",
    company: "Organization",
    pipeline: "Pipeline",
    "contact person": "Contact person",
    contact: "Contact person",
    stage: "Stage",
    "deal created": "Deal created",
    created: "Deal created",
    created_at: "Deal created",
    "update time": "Update time",
    updated: "Update time",
    updated_at: "Update time",
    status: "Status",
    id: "ID",
    deal_id: "ID",
    "total activities": "Total activities",
    activities: "Total activities",
    "done activities": "Done activities",
    "activities to do": "Activities to do",
    "email messages count": "Email messages count",
    emails: "Email messages count",
    label: "Label",
    "won time": "Won time",
    "lost time": "Lost time",
    "lost reason": "Lost reason",
  }

  return csvHeaders.map((header) => {
    const normalizedHeader = header.toLowerCase().trim()
    const matchedField = fieldMappings[normalizedHeader]
    return {
      csvField: header,
      dealField: (matchedField || "") as FieldMapping["dealField"],
    }
  })
}

export function mapDataToDeals(
  rows: Record<string, string>[],
  mappings: FieldMapping[]
): Partial<Deal>[] {
  return rows.map((row) => {
    const deal: Partial<Deal> = {}

    mappings.forEach((mapping) => {
      if (mapping.dealField && mapping.csvField) {
        const value = row[mapping.csvField]
        if (value !== undefined && value !== "") {
          // Handle numeric fields
          if (["Value", "Weighted value", "ID", "Total activities", "Done activities", "Activities to do", "Email messages count"].includes(mapping.dealField)) {
            const numValue = parseFloat(value.replace(/[^0-9.-]/g, ""))
            if (!isNaN(numValue)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (deal as any)[mapping.dealField] = numValue
            }
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (deal as any)[mapping.dealField] = value
          }
        }
      }
    })

    return deal
  })
}
