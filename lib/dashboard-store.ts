import type { Deal } from "./types"

// Helper functions for calculating dashboard metrics
export function calculateMetrics(deals: Deal[]) {
  const totalValue = deals.reduce((sum, deal) => sum + (deal.Value || 0), 0)
  const totalDeals = deals.length
  const openDeals = deals.filter((d) => d.Status === "Open").length
  const wonDeals = deals.filter((d) => d.Status === "Won").length
  const lostDeals = deals.filter((d) => d.Status === "Lost").length
  const avgDealValue = totalDeals > 0 ? totalValue / totalDeals : 0

  const closedDeals = wonDeals + lostDeals
  const closedRate = totalDeals > 0 ? (closedDeals / totalDeals) * 100 : 0
  const lossRate = totalDeals > 0 ? (lostDeals / totalDeals) * 100 : 0

  return {
    totalValue,
    totalDeals,
    openDeals,
    wonDeals,
    lostDeals,
    avgDealValue,
    winRate: totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0,
    closedRate,
    lossRate,
  }
}

export function getDealsbyOwner(deals: Deal[]) {
  const ownerMap = new Map<string, { count: number; value: number }>()

  deals.forEach((deal) => {
    const owner = deal.Owner || "Unassigned"
    const existing = ownerMap.get(owner) || { count: 0, value: 0 }
    ownerMap.set(owner, {
      count: existing.count + 1,
      value: existing.value + (deal.Value || 0),
    })
  })

  return Array.from(ownerMap.entries())
    .map(([name, data]) => ({
      name,
      deals: data.count,
      value: data.value,
    }))
    .sort((a, b) => b.value - a.value)
}

export function getDealsByStage(deals: Deal[]) {
  // Only count open deals for pipeline stages
  const openDeals = deals.filter((d) => d.Status === "Open")
  
  const stageOrder = [
    "New Lead",
    "Contacted",
    "Qualified",
    "Proposal",
    "Negotiation",
    "Discussion",
    "Enquiry",
    "Hot Pipeline",
  ]

  const stageMap = new Map<string, { count: number; value: number }>()

  openDeals.forEach((deal) => {
    const stage = deal.Stage || "Unknown"
    const existing = stageMap.get(stage) || { count: 0, value: 0 }
    stageMap.set(stage, {
      count: existing.count + 1,
      value: existing.value + (deal.Value || 0),
    })
  })

  return Array.from(stageMap.entries())
    .map(([name, data]) => ({
      name,
      deals: data.count,
      value: data.value,
    }))
    .sort((a, b) => {
      const aIndex = stageOrder.indexOf(a.name)
      const bIndex = stageOrder.indexOf(b.name)
      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
}

export function getDealsByState(deals: Deal[]) {
  const stateMap = new Map<string, { count: number; value: number }>()

  deals.forEach((deal) => {
    const state = deal.State || "Unknown"
    const existing = stateMap.get(state) || { count: 0, value: 0 }
    stateMap.set(state, {
      count: existing.count + 1,
      value: existing.value + (deal.Value || 0),
    })
  })

  return Array.from(stateMap.entries())
    .map(([name, data]) => ({
      name,
      deals: data.count,
      value: data.value,
    }))
    .sort((a, b) => b.value - a.value)
}

export function getDealsByStatus(deals: Deal[]) {
  const statusMap = new Map<string, number>()

  deals.forEach((deal) => {
    const status = deal.Status || "Unknown"
    statusMap.set(status, (statusMap.get(status) || 0) + 1)
  })

  return Array.from(statusMap.entries()).map(([name, value]) => ({
    name,
    value,
  }))
}

export function getDealsOverTime(deals: Deal[], period: "day" | "week" | "month" = "day") {
  const dateMap = new Map<string, { count: number; value: number }>()

  deals.forEach((deal) => {
    if (deal["Deal created"]) {
      const dateStr = deal["Deal created"].split(" ")[0]
      const date = new Date(dateStr)
      
      let key: string
      if (period === "day") {
        key = dateStr
      } else if (period === "week") {
        // Get the Monday of the week
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1)
        const monday = new Date(date.setDate(diff))
        key = monday.toISOString().split("T")[0]
      } else {
        // Month
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      }
      
      const existing = dateMap.get(key) || { count: 0, value: 0 }
      dateMap.set(key, {
        count: existing.count + 1,
        value: existing.value + (deal.Value || 0),
      })
    }
  })

  return Array.from(dateMap.entries())
    .map(([date, data]) => ({
      date,
      deals: data.count,
      value: data.value,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function getDealsByLostReason(deals: Deal[]) {
  const lostDeals = deals.filter((d) => d.Status === "Lost")
  const reasonMap = new Map<string, { count: number; value: number }>()

  lostDeals.forEach((deal) => {
    const reason = deal["Lost reason"] || "No reason specified"
    const existing = reasonMap.get(reason) || { count: 0, value: 0 }
    reasonMap.set(reason, {
      count: existing.count + 1,
      value: existing.value + (deal.Value || 0),
    })
  })

  return Array.from(reasonMap.entries())
    .map(([name, data]) => ({
      name,
      deals: data.count,
      value: data.value,
    }))
    .sort((a, b) => b.value - a.value)
}

export function getDealsBySource(deals: Deal[]) {
  const sourceMap = new Map<string, { count: number; value: number }>()

  deals.forEach((deal) => {
    const source = deal.Source || "Unknown"
    const existing = sourceMap.get(source) || { count: 0, value: 0 }
    sourceMap.set(source, {
      count: existing.count + 1,
      value: existing.value + (deal.Value || 0),
    })
  })

  return Array.from(sourceMap.entries())
    .map(([name, data]) => ({
      name,
      deals: data.count,
      value: data.value,
    }))
    .sort((a, b) => b.value - a.value)
}

export function getWinRateBySource(deals: Deal[]) {
  const sourceMap = new Map<string, { total: number; won: number }>()

  deals.forEach((deal) => {
    const source = deal.Source || "Unknown"
    const existing = sourceMap.get(source) || { total: 0, won: 0 }
    sourceMap.set(source, {
      total: existing.total + 1,
      won: existing.won + (deal.Status === "Won" ? 1 : 0),
    })
  })

  return Array.from(sourceMap.entries())
    .map(([name, data]) => ({
      name,
      rate: data.total > 0 ? (data.won / data.total) * 100 : 0,
      total: data.total,
      won: data.won,
    }))
    .sort((a, b) => b.rate - a.rate)
}

export function getLossRateBySource(deals: Deal[]) {
  const sourceMap = new Map<string, { total: number; lost: number }>()

  deals.forEach((deal) => {
    const source = deal.Source || "Unknown"
    const existing = sourceMap.get(source) || { total: 0, lost: 0 }
    sourceMap.set(source, {
      total: existing.total + 1,
      lost: existing.lost + (deal.Status === "Lost" ? 1 : 0),
    })
  })

  return Array.from(sourceMap.entries())
    .map(([name, data]) => ({
      name,
      rate: data.total > 0 ? (data.lost / data.total) * 100 : 0,
      total: data.total,
      lost: data.lost,
    }))
    .sort((a, b) => b.rate - a.rate)
}

export function getWinRateByOwner(deals: Deal[]) {
  const ownerMap = new Map<string, { total: number; won: number }>()

  deals.forEach((deal) => {
    const owner = deal.Owner || "Unassigned"
    const existing = ownerMap.get(owner) || { total: 0, won: 0 }
    ownerMap.set(owner, {
      total: existing.total + 1,
      won: existing.won + (deal.Status === "Won" ? 1 : 0),
    })
  })

  return Array.from(ownerMap.entries())
    .map(([name, data]) => ({
      name,
      rate: data.total > 0 ? (data.won / data.total) * 100 : 0,
      total: data.total,
      won: data.won,
    }))
    .sort((a, b) => b.rate - a.rate)
}

export function getLossRateByOwner(deals: Deal[]) {
  const ownerMap = new Map<string, { total: number; lost: number }>()

  deals.forEach((deal) => {
    const owner = deal.Owner || "Unassigned"
    const existing = ownerMap.get(owner) || { total: 0, lost: 0 }
    ownerMap.set(owner, {
      total: existing.total + 1,
      lost: existing.lost + (deal.Status === "Lost" ? 1 : 0),
    })
  })

  return Array.from(ownerMap.entries())
    .map(([name, data]) => ({
      name,
      rate: data.total > 0 ? (data.lost / data.total) * 100 : 0,
      total: data.total,
      lost: data.lost,
    }))
    .sort((a, b) => b.rate - a.rate)
}

export function getWinRateByState(deals: Deal[]) {
  const stateMap = new Map<string, { total: number; won: number }>()

  deals.forEach((deal) => {
    const state = deal.State || "Unknown"
    const existing = stateMap.get(state) || { total: 0, won: 0 }
    stateMap.set(state, {
      total: existing.total + 1,
      won: existing.won + (deal.Status === "Won" ? 1 : 0),
    })
  })

  return Array.from(stateMap.entries())
    .map(([name, data]) => ({
      name,
      rate: data.total > 0 ? (data.won / data.total) * 100 : 0,
      total: data.total,
      won: data.won,
    }))
    .sort((a, b) => b.rate - a.rate)
}

export function getLossRateByState(deals: Deal[]) {
  const stateMap = new Map<string, { total: number; lost: number }>()

  deals.forEach((deal) => {
    const state = deal.State || "Unknown"
    const existing = stateMap.get(state) || { total: 0, lost: 0 }
    stateMap.set(state, {
      total: existing.total + 1,
      lost: existing.lost + (deal.Status === "Lost" ? 1 : 0),
    })
  })

  return Array.from(stateMap.entries())
    .map(([name, data]) => ({
      name,
      rate: data.total > 0 ? (data.lost / data.total) * 100 : 0,
      total: data.total,
      lost: data.lost,
    }))
    .sort((a, b) => b.rate - a.rate)
}

export function getLostReasonsByOwner(deals: Deal[]) {
  const lostDeals = deals.filter((d) => d.Status === "Lost")
  const ownerReasonMap = new Map<string, Map<string, number>>()

  lostDeals.forEach((deal) => {
    const owner = deal.Owner || "Unassigned"
    const reason = deal["Lost reason"] || "No reason"
    
    if (!ownerReasonMap.has(owner)) {
      ownerReasonMap.set(owner, new Map())
    }
    const reasonMap = ownerReasonMap.get(owner)!
    reasonMap.set(reason, (reasonMap.get(reason) || 0) + 1)
  })

  return Array.from(ownerReasonMap.entries())
    .map(([owner, reasons]) => {
      const total = Array.from(reasons.values()).reduce((a, b) => a + b, 0)
      return {
        name: owner,
        total,
        ...Object.fromEntries(reasons),
      }
    })
    .sort((a, b) => b.total - a.total)
}

export function getLostReasonsBySource(deals: Deal[]) {
  const lostDeals = deals.filter((d) => d.Status === "Lost")
  const sourceReasonMap = new Map<string, Map<string, number>>()

  lostDeals.forEach((deal) => {
    const source = deal.Source || "Unknown"
    const reason = deal["Lost reason"] || "No reason"
    
    if (!sourceReasonMap.has(source)) {
      sourceReasonMap.set(source, new Map())
    }
    const reasonMap = sourceReasonMap.get(source)!
    reasonMap.set(reason, (reasonMap.get(reason) || 0) + 1)
  })

  return Array.from(sourceReasonMap.entries())
    .map(([source, reasons]) => {
      const total = Array.from(reasons.values()).reduce((a, b) => a + b, 0)
      return {
        name: source,
        total,
        ...Object.fromEntries(reasons),
      }
    })
    .sort((a, b) => b.total - a.total)
}

export function getDealsByOwnerByStatus(deals: Deal[]) {
  const ownerStatusMap = new Map<string, { open: number; won: number; lost: number }>()

  deals.forEach((deal) => {
    const owner = deal.Owner || "Unassigned"
    const existing = ownerStatusMap.get(owner) || { open: 0, won: 0, lost: 0 }
    
    if (deal.Status === "Open") {
      existing.open++
    } else if (deal.Status === "Won") {
      existing.won++
    } else if (deal.Status === "Lost") {
      existing.lost++
    }
    
    ownerStatusMap.set(owner, existing)
  })

  return Array.from(ownerStatusMap.entries())
    .map(([name, data]) => ({
      name,
      Open: data.open,
      Won: data.won,
      Lost: data.lost,
      total: data.open + data.won + data.lost,
    }))
    .sort((a, b) => b.total - a.total)
}

export function formatCurrency(value: number, currency = "USD"): string {
  const absValue = Math.abs(value)
  const sign = value < 0 ? "-" : ""
  const symbol = currency === "USD" ? "$" : currency
  
  if (absValue >= 1_000_000_000) {
    return `${sign}${symbol}${(absValue / 1_000_000_000).toFixed(1)}B`
  }
  if (absValue >= 1_000_000) {
    return `${sign}${symbol}${(absValue / 1_000_000).toFixed(1)}M`
  }
  // For values under 1M, use full number with thousand separators
  return `${sign}${symbol}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(absValue)}`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}
