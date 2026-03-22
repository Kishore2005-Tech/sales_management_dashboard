"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/dashboard-store"
import type { Deal } from "@/lib/types"

interface DealsOverTimeChartProps {
  deals: Deal[]
}

type Period = "day" | "week" | "month"

const chartConfig = {
  deals: {
    label: "Deals",
    color: "hsl(var(--chart-1))",
  },
  value: {
    label: "Value",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function getDealsOverTimeByPeriod(deals: Deal[], period: Period) {
  const dateMap = new Map<string, { count: number; value: number }>()

  deals.forEach((deal) => {
    if (deal["Deal created"]) {
      const dateStr = deal["Deal created"].split(" ")[0]
      const date = new Date(dateStr)
      
      let key: string
      if (period === "day") {
        key = dateStr
      } else if (period === "week") {
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1)
        const monday = new Date(date)
        monday.setDate(diff)
        key = monday.toISOString().split("T")[0]
      } else {
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

function formatDateLabel(date: string, period: Period): string {
  if (period === "month") {
    const [year, month] = date.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`
  }
  if (period === "week") {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
  }
  const d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function DealsOverTimeChart({ deals }: DealsOverTimeChartProps) {
  const [period, setPeriod] = useState<Period>("month")

  const data = useMemo(() => {
    const allData = getDealsOverTimeByPeriod(deals, period)
    // Limit data points for readability
    if (period === "day" && allData.length > 60) {
      return allData.slice(-60)
    }
    if (period === "week" && allData.length > 52) {
      return allData.slice(-52)
    }
    return allData
  }, [deals, period])

  const formattedData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      label: formatDateLabel(d.date, period),
    }))
  }, [data, period])

  if (data.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">New Deals Over Time</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center pt-0">
          <p className="text-sm text-muted-foreground">No timeline data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">New Deals Over Time</CardTitle>
        <div className="flex items-center gap-1">
          {(["day", "week", "month"] as Period[]).map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2 text-xs capitalize"
              onClick={() => setPeriod(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillDeals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="label"
              className="fill-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              className="fill-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-foreground">{item.payload.date}</div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">New Deals</span>
                        <span className="font-mono font-medium">{item.payload.deals}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Value</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(item.payload.value)}
                        </span>
                      </div>
                    </div>
                  )}
                  hideLabel
                />
              }
            />
            <Area
              type="monotone"
              dataKey="deals"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#fillDeals)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
