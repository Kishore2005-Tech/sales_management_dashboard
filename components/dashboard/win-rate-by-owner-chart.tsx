"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList } from "recharts"

interface WinRateByOwnerChartProps {
  data: Array<{ name: string; rate: number; total: number; won: number }>
}

const chartConfig = {
  rate: {
    label: "Win Rate",
    color: "#10b981",
  },
} satisfies ChartConfig

export function WinRateByOwnerChart({ data }: WinRateByOwnerChartProps) {
  const topData = data.slice(0, 5)
  const maxRate = Math.max(...topData.map(d => d.rate), 10)
  const domainMax = Math.ceil(maxRate / 10) * 10

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Win % by Salesperson</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[160px] w-full">
          <BarChart data={topData} layout="vertical" margin={{ left: 0, right: 40 }}>
            <XAxis
              type="number"
              domain={[0, domainMax]}
              tickFormatter={(value) => `${value}%`}
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-foreground">{item.payload.name}</div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Win Rate</span>
                        <span className="font-mono font-medium">{(value as number).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Won / Total</span>
                        <span className="font-mono font-medium">{item.payload.won.toLocaleString()} / {item.payload.total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  hideLabel
                />
              }
            />
            <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
              {topData.map((_, index) => (
                <Cell key={`cell-${index}`} fill="#10b981" />
              ))}
              <LabelList
                dataKey="rate"
                position="right"
                formatter={(value: number) => `${value.toFixed(0)}%`}
                fontSize={10}
                fill="hsl(var(--foreground))"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
