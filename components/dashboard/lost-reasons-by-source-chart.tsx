"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts"

interface LostReasonsBySourceChartProps {
  data: Array<{ name: string; total: number; [key: string]: string | number }>
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"]

export function LostReasonsBySourceChart({ data }: LostReasonsBySourceChartProps) {
  const topData = data.slice(0, 5)
  
  const { reasons, chartConfig } = useMemo(() => {
    const allReasons = new Set<string>()
    topData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "name" && key !== "total" && typeof item[key] === "number") {
          allReasons.add(key)
        }
      })
    })
    const reasonList = Array.from(allReasons)
    
    const config: ChartConfig = {}
    reasonList.forEach((reason, index) => {
      config[reason] = {
        label: reason,
        color: COLORS[index % COLORS.length],
      }
    })
    
    return { reasons: reasonList, chartConfig: config }
  }, [topData])

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Lost Reasons by Source</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={topData} layout="vertical" margin={{ left: 0, right: 30 }}>
            <XAxis 
              type="number" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              type="category"
              dataKey="name"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {reasons.map((reason, index) => (
              <Bar
                key={reason}
                dataKey={reason}
                stackId="a"
                fill={COLORS[index % COLORS.length]}
                radius={index === reasons.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0]}
              >
                {index === reasons.length - 1 && (
                  <LabelList
                    dataKey="total"
                    position="right"
                    fontSize={10}
                    fill="hsl(var(--foreground))"
                    formatter={(value: number) => value.toLocaleString()}
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
