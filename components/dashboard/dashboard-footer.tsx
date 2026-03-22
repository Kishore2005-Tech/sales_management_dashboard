import { ExternalLink } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">
              Pipeline Health Check
            </p>
            <p className="text-xs text-muted-foreground/70">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
          <nav className="flex items-center gap-6">
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
      </div>
    </footer>
  )
}
