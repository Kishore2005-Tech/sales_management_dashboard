"use client"

import type { Deal } from "./types"
import { parseCSV, autoMapFields, mapDataToDeals } from "./csv-parser"

let cachedDeals: Deal[] | null = null

const LEAD_SOURCES = ["Referral", "Directory", "Ads", "Social", "SEO", "Email Campaign", "Cold Call", "Trade Show", "Partner"]

// Deterministic source assignment based on deal index
function getSourceForDeal(index: number): string {
  return LEAD_SOURCES[index % LEAD_SOURCES.length]
}

export async function loadSampleDeals(forceRefresh = false): Promise<Deal[]> {
  if (cachedDeals && !forceRefresh) return cachedDeals

  try {
    const response = await fetch("/sample-data.csv")
    if (!response.ok) throw new Error("Failed to load sample data")
    
    const csvText = await response.text()
    const { headers, rows } = parseCSV(csvText)
    const mappings = autoMapFields(headers)
    const deals = mapDataToDeals(rows, mappings) as Deal[]
    
    // Filter out invalid deals and ensure required fields
    cachedDeals = deals.filter(deal => 
      deal.Value !== undefined && 
      deal.Stage && 
      deal.Owner
    ).map((deal, index) => ({
      ...deal,
      ID: deal.ID || index + 1,
      Status: deal.Status || "Open",
      Pipeline: deal.Pipeline || "Sales",
      Source: deal.Source || getSourceForDeal(index),
    })) as Deal[]
    
    return cachedDeals
  } catch (error) {
    console.error("Error loading sample data:", error)
    return []
  }
}

// For synchronous access when data is already loaded
export function getSampleDeals(): Deal[] {
  return cachedDeals || []
}

// Clear cache if needed
export function clearSampleDealsCache(): void {
  cachedDeals = null
}
