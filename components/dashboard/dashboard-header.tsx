"use client"

import { CSVUploadModal } from "./csv-upload-modal"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Deal } from "@/lib/types"
import { BarChart3, RefreshCw, ExternalLink } from "lucide-react"

interface DashboardHeaderProps {
  onDataImported: (deals: Deal[]) => void
  onResetData: () => void
}

export function DashboardHeader({ onDataImported, onResetData }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Pipeline Health Check</h1>
            </div>
          </div>
          <nav className="hidden items-center gap-4 md:flex">
            <a
              href="https://go.amitsarda.xyz/pipedrive"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pipedrive
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://go.amitsarda.xyz/coupler"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Coupler
              <ExternalLink className="h-3 w-3" />
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={onResetData}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Reset to Sample</span>
            <span className="sm:hidden">Reset</span>
          </Button>
          <CSVUploadModal onDataImported={onDataImported} />
        </div>
      </div>
    </header>
  )
}
