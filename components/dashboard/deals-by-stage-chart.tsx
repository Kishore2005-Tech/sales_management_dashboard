"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatCurrency } from "@/lib/dashboard-store"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from "recharts"

interface StageData {
  name: string
  deals: number
  value: number
}

interface DealsByStageChartProps {
  data: StageData[]
  stageOrder: string[]
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]

export function DealsByStageChart({ data, stageOrder }: DealsByStageChartProps) {
  // Order data according to stageOrder
  const orderedData = [...data].sort((a, b) => {
    const indexA = stageOrder.indexOf(a.name)
    const indexB = stageOrder.indexOf(b.name)
    // If not in stageOrder, put at the end
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  const chartConfig = orderedData.reduce((acc, stage, index) => {
    acc[stage.name] = {
      label: stage.name,
      color: COLORS[index % COLORS.length],
    }
    return acc
  }, {} as ChartConfig)

  chartConfig.deals = { label: "Deals" }

  // Calculate max for domain padding
  const maxDeals = Math.max(...orderedData.map(d => d.deals), 0)
  const domainMax = Math.ceil(maxDeals * 1.15)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Pipeline Stages</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={orderedData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickFormatter={(value) => value.length > 10 ? value.slice(0, 10) + "..." : value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={10}
              width={40}
              domain={[0, domainMax]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => (
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground">Deals</span>
                        <span className="font-mono font-medium">{(value as number).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground">Value</span>
                        <span className="font-mono font-medium">{formatCurrency(item.payload.value)}</span>
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="deals" radius={[3, 3, 0, 0]}>
              {orderedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList
                dataKey="deals"
                position="top"
                fontSize={10}
                fill="hsl(var(--foreground))"
                formatter={(value: number) => value.toLocaleString()}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
