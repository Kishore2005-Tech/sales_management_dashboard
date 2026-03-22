export interface Deal {
  City: string
  State: string
  Region: string
  Country: string
  "Post Code": string | number
  Title: string
  Creator: string
  Owner: string
  Value: number
  Currency: string
  Source: string
  "Weighted value": number
  "Currency of Weighted value": string
  Probability: number | string
  Organization: string
  Pipeline: string
  "Contact person": string
  Stage: string
  "Deal created": string
  "Update time": string
  "Last stage change": string
  "Next activity date": string
  "Last activity date": string
  "Won time": string
  "Last email received": string
  "Last email sent": string
  "Lost time": string
  "Deal closed on": string
  "Expected close date": string
  Status: "Open" | "Won" | "Lost"
  "Lost reason": string
  "Visible to": string
  ID: number
  "Total activities": number
  "Done activities": number
  "Activities to do": number
  "Email messages count": number
  Label: string
  "Product quantity": string | number
  "Product amount": string | number
}

export interface FieldMapping {
  csvField: string
  dealField: keyof Deal | ""
}

export const DEAL_FIELDS: (keyof Deal)[] = [
  "City",
  "State",
  "Region",
  "Country",
  "Post Code",
  "Title",
  "Creator",
  "Owner",
  "Value",
  "Currency",
  "Source",
  "Weighted value",
  "Currency of Weighted value",
  "Probability",
  "Organization",
  "Pipeline",
  "Contact person",
  "Stage",
  "Deal created",
  "Update time",
  "Last stage change",
  "Next activity date",
  "Last activity date",
  "Won time",
  "Last email received",
  "Last email sent",
  "Lost time",
  "Deal closed on",
  "Expected close date",
  "Status",
  "Lost reason",
  "Visible to",
  "ID",
  "Total activities",
  "Done activities",
  "Activities to do",
  "Email messages count",
  "Label",
  "Product quantity",
  "Product amount",
]
