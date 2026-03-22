"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts"

interface DealsByOwnerChartProps {
  data: { name: string; Open: number; Won: number; Lost: number; total: number }[]
}

const chartConfig = {
  Open: {
    label: "Open",
    color: "#3b82f6",
  },
  Won: {
    label: "Won",
    color: "#10b981",
  },
  Lost: {
    label: "Lost",
    color: "#ef4444",
  },
} satisfies ChartConfig

export function DealsByOwnerChart({ data }: DealsByOwnerChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Deals by Salesperson</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={10}
              width={130}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="Open" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Won" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Lost" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]}>
              <LabelList
                dataKey="total"
                position="right"
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
