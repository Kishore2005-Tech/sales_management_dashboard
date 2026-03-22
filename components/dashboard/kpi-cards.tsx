"use client"

import { Card, CardContent } from "@/components/ui/card"
import { formatNumber } from "@/lib/dashboard-store"
import { Target, Users, CheckCircle, XCircle, BarChart3, Percent, TrendingDown } from "lucide-react"

interface KPICardsProps {
  metrics: {
    totalValue: number
    totalDeals: number
    openDeals: number
    wonDeals: number
    lostDeals: number
    avgDealValue: number
    winRate: number
    closedRate: number
    lossRate: number
  }
}

export function KPICards({ metrics }: KPICardsProps) {
  const cards = [
    {
      title: "Total Deals",
      value: formatNumber(metrics.totalDeals),
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Open",
      value: formatNumber(metrics.openDeals),
      icon: Users,
      color: "text-amber-500",
    },
    {
      title: "Won",
      value: formatNumber(metrics.wonDeals),
      icon: CheckCircle,
      color: "text-emerald-500",
    },
    {
      title: "Lost",
      value: formatNumber(metrics.lostDeals),
      icon: XCircle,
      color: "text-red-500",
    },
    {
      title: "Win Rate",
      value: `${metrics.winRate.toFixed(1)}%`,
      icon: BarChart3,
      color: "text-emerald-500",
    },
    {
      title: "Loss Rate",
      value: `${metrics.lossRate.toFixed(1)}%`,
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "Closed Rate",
      value: `${metrics.closedRate.toFixed(1)}%`,
      icon: Percent,
      color: "text-violet-500",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
      {cards.map((card) => (
        <Card key={card.title} className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center p-2 text-center">
            <div className="flex items-center gap-1 mb-0.5">
              <card.icon className={`h-3 w-3 ${card.color}`} />
              <span className="text-[10px] font-medium text-muted-foreground">{card.title}</span>
            </div>
            <div className="text-lg font-bold text-foreground leading-tight">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
