"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatCurrency } from "@/lib/dashboard-store"
import { PieChart, Pie, Cell, Label } from "recharts"

interface LeadSourcesChartProps {
  data: { name: string; deals: number; value: number }[]
}

const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#ec4899", "#10b981"]

export function LeadSourcesChart({ data }: LeadSourcesChartProps) {
  const topSources = data.slice(0, 5)

  const chartConfig = topSources.reduce((acc, source, index) => {
    acc[source.name] = {
      label: source.name,
      color: COLORS[index % COLORS.length],
    }
    return acc
  }, {} as ChartConfig)

  if (topSources.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Lead Sources</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center pt-0">
          <p className="text-sm text-muted-foreground">No data to display</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <PieChart>
            <Pie
              data={topSources}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {topSources.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const totalDeals = topSources.reduce((sum, s) => sum + s.deals, 0)
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xl font-bold">
                          {totalDeals.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 16} className="fill-muted-foreground text-xs">
                          deals
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-foreground">{item.payload.name}</div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Value</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(value as number)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Deals</span>
                        <span className="font-mono font-medium">
                          {item.payload.deals}
                        </span>
                      </div>
                    </div>
                  )}
                  hideLabel
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
