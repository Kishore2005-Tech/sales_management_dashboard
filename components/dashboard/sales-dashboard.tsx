"use client"

import { useState, useMemo, useEffect } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardFooter } from "./dashboard-footer"
import { KPICards } from "./kpi-cards"
import { DealsByOwnerChart } from "./deals-by-owner-chart"
import { DealsByStageChart } from "./deals-by-stage-chart"
import { DealsByStateChart } from "./deals-by-state-chart"
import { LostReasonsChart } from "./lost-reasons-chart"
import { LeadSourcesChart } from "./lead-sources-chart"
import { DealsOverTimeChart } from "./deals-over-time-chart"
import { WonDealsOverTimeChart } from "./won-deals-over-time-chart"
import { LostDealsOverTimeChart } from "./lost-deals-over-time-chart"
import { WinRateBySourceChart } from "./win-rate-by-source-chart"
import { LossRateBySourceChart } from "./loss-rate-by-source-chart"
import { WinRateByOwnerChart } from "./win-rate-by-owner-chart"
import { LossRateByOwnerChart } from "./loss-rate-by-owner-chart"
import { WinRateByStateChart } from "./win-rate-by-state-chart"
import { LossRateByStateChart } from "./loss-rate-by-state-chart"
import { LostReasonsByOwnerChart } from "./lost-reasons-by-owner-chart"
import { LostReasonsBySourceChart } from "./lost-reasons-by-source-chart"
import { HowItWorks } from "./how-it-works"
import { DealsTable } from "./deals-table"
import { StageOrderModal } from "./stage-order-modal"
import { loadSampleDeals } from "@/lib/sample-data"
import {
  calculateMetrics,
  getDealsByOwnerByStatus,
  getDealsByStage,
  getDealsByState,
  getDealsByLostReason,
  getDealsBySource,
  getWinRateBySource,
  getLossRateBySource,
  getWinRateByOwner,
  getLossRateByOwner,
  getWinRateByState,
  getLossRateByState,
  getLostReasonsByOwner,
  getLostReasonsBySource,
} from "@/lib/dashboard-store"
import type { Deal } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Loader2, LayoutDashboard, Table, HelpCircle } from "lucide-react"

export function SalesDashboard() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPipeline, setSelectedPipeline] = useState<string>("all")
  const [selectedOwner, setSelectedOwner] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [stageOrder, setStageOrder] = useState<string[]>([])

  // Load sample data on mount
  useEffect(() => {
    loadSampleDeals().then((data) => {
      setDeals(data)
      setIsLoading(false)
    })
  }, [])

  // Get unique pipelines from deals
  const pipelines = useMemo(() => {
    const uniquePipelines = [...new Set(deals.map((d) => d.Pipeline).filter(Boolean))]
    return uniquePipelines.sort()
  }, [deals])

  // Get unique owners from deals
  const owners = useMemo(() => {
    const uniqueOwners = [...new Set(deals.map((d) => d.Owner).filter(Boolean))]
    return uniqueOwners.sort()
  }, [deals])

  // Get unique statuses from deals
  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(deals.map((d) => d.Status).filter(Boolean))]
    return uniqueStatuses.sort()
  }, [deals])

  // Filter deals by selected pipeline, owner, and status
  const filteredDeals = useMemo(() => {
    return deals.filter((d) => {
      if (selectedPipeline !== "all" && d.Pipeline !== selectedPipeline) return false
      if (selectedOwner !== "all" && d.Owner !== selectedOwner) return false
      if (selectedStatus !== "all" && d.Status !== selectedStatus) return false
      return true
    })
  }, [deals, selectedPipeline, selectedOwner, selectedStatus])

  // Get unique stages from filtered deals (default order)
  const defaultStages = useMemo(() => {
    const stages = [...new Set(filteredDeals.map((d) => d.Stage).filter(Boolean))]
    return stages
  }, [filteredDeals])

  // Initialize stageOrder if empty or if stages changed
  const effectiveStageOrder = useMemo(() => {
    if (stageOrder.length === 0) return defaultStages
    const validOrder = stageOrder.filter((s) => defaultStages.includes(s))
    const newStages = defaultStages.filter((s) => !stageOrder.includes(s))
    return [...validOrder, ...newStages]
  }, [stageOrder, defaultStages])

  const metrics = useMemo(() => calculateMetrics(filteredDeals), [filteredDeals])
  const dealsByOwner = useMemo(() => getDealsByOwnerByStatus(filteredDeals), [filteredDeals])
  const dealsByStage = useMemo(() => getDealsByStage(filteredDeals), [filteredDeals])
  const dealsByState = useMemo(() => getDealsByState(filteredDeals), [filteredDeals])
  const dealsByLostReason = useMemo(() => getDealsByLostReason(filteredDeals), [filteredDeals])
  const dealsBySource = useMemo(() => getDealsBySource(filteredDeals), [filteredDeals])
  const winRateBySource = useMemo(() => getWinRateBySource(filteredDeals), [filteredDeals])
  const lossRateBySource = useMemo(() => getLossRateBySource(filteredDeals), [filteredDeals])
  const winRateByOwner = useMemo(() => getWinRateByOwner(filteredDeals), [filteredDeals])
  const lossRateByOwner = useMemo(() => getLossRateByOwner(filteredDeals), [filteredDeals])
  const winRateByState = useMemo(() => getWinRateByState(filteredDeals), [filteredDeals])
  const lossRateByState = useMemo(() => getLossRateByState(filteredDeals), [filteredDeals])
  const lostReasonsByOwner = useMemo(() => getLostReasonsByOwner(filteredDeals), [filteredDeals])
  const lostReasonsBySource = useMemo(() => getLostReasonsBySource(filteredDeals), [filteredDeals])

  const handleDataImported = (newDeals: Deal[]) => {
    setDeals(newDeals)
    setSelectedPipeline("all")
    setSelectedOwner("all")
    setSelectedStatus("all")
    setStageOrder([])
  }

  const handleResetData = async () => {
    setIsLoading(true)
    const data = await loadSampleDeals(true)
    setDeals(data)
    setSelectedPipeline("all")
    setSelectedOwner("all")
    setSelectedStatus("all")
    setStageOrder([])
    setIsLoading(false)
  }

  const handleStageOrderChange = (newOrder: string[]) => {
    setStageOrder(newOrder)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onDataImported={handleDataImported} onResetData={handleResetData} />

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="space-y-4">
          {/* Tabs and Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList>
              <TabsTrigger value="overview" className="gap-1.5">
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="deals" className="gap-1.5">
                <Table className="h-4 w-4" />
                Deals
              </TabsTrigger>
              <TabsTrigger value="how-it-works" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                How this works
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
              </div>
              <Select value={selectedPipeline} onValueChange={setSelectedPipeline}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Pipelines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pipelines</SelectItem>
                  {pipelines.map((pipeline) => (
                    <SelectItem key={pipeline} value={pipeline}>
                      {pipeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Owners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  {owners.map((owner) => (
                    <SelectItem key={owner} value={owner}>
                      {owner}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <StageOrderModal
                stages={defaultStages}
                stageOrder={effectiveStageOrder}
                onOrderChange={handleStageOrderChange}
              />

              {(selectedPipeline !== "all" || selectedOwner !== "all" || selectedStatus !== "all") && (
                <span className="text-xs text-muted-foreground">
                  Showing {filteredDeals.length} of {deals.length} deals
                </span>
              )}
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* KPI Cards */}
            <section aria-label="Key Performance Indicators">
              <KPICards metrics={metrics} />
            </section>

            {/* Deals Over Time */}
            <section aria-label="Deals Over Time">
              <DealsOverTimeChart deals={filteredDeals} />
            </section>

            {/* Won and Lost Deals Over Time */}
            <section aria-label="Won and Lost Deals" className="grid gap-4 lg:grid-cols-2">
              <WonDealsOverTimeChart deals={filteredDeals} />
              <LostDealsOverTimeChart deals={filteredDeals} />
            </section>

            {/* Charts Row */}
            <section aria-label="Charts" className="grid gap-4 lg:grid-cols-2">
              <DealsByOwnerChart data={dealsByOwner} />
              <DealsByStageChart data={dealsByStage} stageOrder={effectiveStageOrder} />
            </section>

            {/* Win/Loss Rate by Source */}
            <section aria-label="Win Loss Rate by Source" className="grid gap-4 md:grid-cols-2">
              <WinRateBySourceChart data={winRateBySource} />
              <LossRateBySourceChart data={lossRateBySource} />
            </section>

            {/* Win/Loss Rate by Salesperson */}
            <section aria-label="Win Loss Rate by Salesperson" className="grid gap-4 md:grid-cols-2">
              <WinRateByOwnerChart data={winRateByOwner} />
              <LossRateByOwnerChart data={lossRateByOwner} />
            </section>

            {/* Win/Loss Rate by State */}
            <section aria-label="Win Loss Rate by State" className="grid gap-4 md:grid-cols-2">
              <WinRateByStateChart data={winRateByState} />
              <LossRateByStateChart data={lossRateByState} />
            </section>

            {/* Lost Reasons Breakdown */}
            <section aria-label="Lost Reasons Breakdown" className="grid gap-4 md:grid-cols-2">
              <LostReasonsByOwnerChart data={lostReasonsByOwner} />
              <LostReasonsBySourceChart data={lostReasonsBySource} />
            </section>

            {/* Donut Charts Row */}
            <section aria-label="Distribution Charts" className="grid gap-4 md:grid-cols-3">
              <DealsByStateChart data={dealsByState} />
              <LeadSourcesChart data={dealsBySource} />
              <LostReasonsChart data={dealsByLostReason} />
            </section>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals" className="space-y-4">
            <section aria-label="Deals Table">
              <DealsTable deals={filteredDeals} />
            </section>
          </TabsContent>

          {/* How It Works Tab */}
          <TabsContent value="how-it-works" className="space-y-4">
            <HowItWorks />
          </TabsContent>
        </Tabs>
      </main>

      <DashboardFooter />
    </div>
  )
}
