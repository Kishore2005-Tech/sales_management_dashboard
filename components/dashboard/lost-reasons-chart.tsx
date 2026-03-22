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

interface LostReasonsChartProps {
  data: { name: string; deals: number; value: number }[]
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"]

export function LostReasonsChart({ data }: LostReasonsChartProps) {
  const topReasons = data.slice(0, 5)

  const chartConfig = topReasons.reduce((acc, reason, index) => {
    acc[reason.name] = {
      label: reason.name,
      color: COLORS[index % COLORS.length],
    }
    return acc
  }, {} as ChartConfig)

  if (topReasons.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Lost Reasons</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center pt-0">
          <p className="text-sm text-muted-foreground">No lost deals to display</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Lost Reasons</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <PieChart>
            <Pie
              data={topReasons}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {topReasons.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const totalDeals = topReasons.reduce((sum, r) => sum + r.deals, 0)
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xl font-bold">
                          {totalDeals.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 16} className="fill-muted-foreground text-xs">
                          lost
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
