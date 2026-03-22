"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Upload, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  MapPin,
  AlertCircle,
  Target,
  Clock,
  FileSpreadsheet,
  Lock
} from "lucide-react"

export function HowItWorks() {
  return (
    <div className="space-y-8">
      {/* Privacy Notice */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Your Data Stays Private
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="font-medium text-foreground">
            All data processing happens entirely in your browser. No data is sent to any server.
          </p>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Your CSV file is parsed locally using JavaScript</li>
            <li>All calculations and visualizations are computed client-side</li>
            <li>Refreshing or closing the page will clear all uploaded data</li>
            <li>We do not store, transmit, or have access to your sales data</li>
          </ul>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Upload className="h-5 w-5" />
          Getting Started
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Export your data from Pipedrive</span> - Go to Deals, select all columns you need, and export as CSV
              </li>
              <li>
                <span className="font-medium text-foreground">Click "Upload CSV"</span> - Use the button in the header to upload your exported file
              </li>
              <li>
                <span className="font-medium text-foreground">Map your columns</span> - The system will auto-detect common fields, but you can manually adjust mappings
              </li>
              <li>
                <span className="font-medium text-foreground">Explore your data</span> - Use filters to drill down by pipeline, salesperson, or deal status
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* KPI Scorecards */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Target className="h-5 w-5" />
          KPI Scorecards
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-foreground">Total Deals</h4>
                <p className="text-sm text-muted-foreground">The complete count of all deals in your selected filter criteria.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Open Deals</h4>
                <p className="text-sm text-muted-foreground">Deals currently in progress that have not been won or lost yet.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Won Deals</h4>
                <p className="text-sm text-muted-foreground">Deals that have been successfully closed and converted to customers.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Lost Deals</h4>
                <p className="text-sm text-muted-foreground">Deals that did not convert, regardless of the reason.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Win Rate</h4>
                <p className="text-sm text-muted-foreground">Percentage of total deals that were won. Formula: (Won Deals / Total Deals) x 100</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Loss Rate</h4>
                <p className="text-sm text-muted-foreground">Percentage of total deals that were lost. Formula: (Lost Deals / Total Deals) x 100</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Closed Rate</h4>
                <p className="text-sm text-muted-foreground">Percentage of deals that have reached a final outcome (won or lost). Formula: ((Won + Lost) / Total) x 100</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Time-Based Charts */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Clock className="h-5 w-5" />
          Time-Based Charts
        </h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h4 className="font-medium text-foreground">New Deals Over Time</h4>
              <p className="text-sm text-muted-foreground">
                Shows when deals were created in your CRM. Use the Day/Week/Month toggle to change the time granularity.
                Helps identify lead generation trends and seasonal patterns.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Won Deals Over Time</h4>
              <p className="text-sm text-muted-foreground">
                Tracks when deals were successfully closed. Useful for understanding revenue timing and identifying 
                your team's most productive periods.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Lost Deals Over Time</h4>
              <p className="text-sm text-muted-foreground">
                Shows when deals were lost. Spikes may indicate competitive pressure, market changes, or internal issues 
                that need attention.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Performance Charts */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Users className="h-5 w-5" />
          Performance Analysis
        </h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h4 className="font-medium text-foreground">Deals by Salesperson (Stacked)</h4>
              <p className="text-sm text-muted-foreground">
                Shows how many deals each salesperson has, broken down by status (Open, Won, Lost). 
                The total number appears at the end of each bar. Helps identify workload distribution and individual performance.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Pipeline Stages</h4>
              <p className="text-sm text-muted-foreground">
                Displays the count of open deals in each pipeline stage. Use the "Stage Order" button to customize 
                the order of stages to match your sales process. Only shows open deals to give an accurate picture 
                of your current pipeline.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Win Rate by Source/Salesperson/State</h4>
              <p className="text-sm text-muted-foreground">
                Shows the percentage of deals won, grouped by different dimensions. Helps identify which lead sources 
                convert best, which salespeople have the highest close rates, and which geographic regions perform best.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Loss Rate by Source/Salesperson/State</h4>
              <p className="text-sm text-muted-foreground">
                The inverse of win rate - shows where deals are being lost. High loss rates may indicate training needs, 
                poor lead quality from certain sources, or challenging markets.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Lost Reason Analysis */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <AlertCircle className="h-5 w-5" />
          Lost Reason Analysis
        </h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h4 className="font-medium text-foreground">Lost Reasons by Salesperson</h4>
              <p className="text-sm text-muted-foreground">
                Stacked bar chart showing why each salesperson loses deals. Different colors represent different 
                loss reasons. Helps identify if certain salespeople struggle with specific objections.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Lost Reasons by Source</h4>
              <p className="text-sm text-muted-foreground">
                Shows which lead sources tend to result in specific loss reasons. For example, if "Price" is a 
                common loss reason for Ads leads, you may need to adjust targeting or qualification criteria.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Lost Reasons (Donut Chart)</h4>
              <p className="text-sm text-muted-foreground">
                Overall breakdown of why deals are lost. The center shows total lost deals. Hover over segments 
                to see specific counts and values.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Distribution Charts */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <PieChart className="h-5 w-5" />
          Distribution Charts
        </h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h4 className="font-medium text-foreground">Top States by Value</h4>
              <p className="text-sm text-muted-foreground">
                Donut chart showing deal distribution by geographic state. Sized by deal value, not count. 
                Shows your top 5 performing states.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Lead Sources</h4>
              <p className="text-sm text-muted-foreground">
                Where your deals are coming from - Referral, Ads, SEO, Social, etc. Helps understand which 
                marketing channels are generating the most pipeline.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Filters */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <BarChart3 className="h-5 w-5" />
          Using Filters
        </h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h4 className="font-medium text-foreground">Pipeline Filter</h4>
              <p className="text-sm text-muted-foreground">
                If you have multiple pipelines (e.g., Sales, Renewals, Upsells), filter to analyze each separately.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Owner Filter</h4>
              <p className="text-sm text-muted-foreground">
                Drill down to a specific salesperson's performance. Great for 1:1 coaching sessions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Status Filter</h4>
              <p className="text-sm text-muted-foreground">
                Filter by Open, Won, or Lost to focus your analysis. For example, filter to "Lost" to deeply 
                analyze why deals fail.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Stage Order</h4>
              <p className="text-sm text-muted-foreground">
                Customize the order of pipeline stages in the Pipeline Stages chart to match your actual sales process.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Glossary */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <FileSpreadsheet className="h-5 w-5" />
          Glossary of Terms
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <Badge variant="secondary" className="mb-1">Deal</Badge>
                  <p className="text-sm text-muted-foreground">A potential sale or opportunity being tracked in your CRM.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Pipeline</Badge>
                  <p className="text-sm text-muted-foreground">A visual representation of your sales process, containing multiple stages.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Stage</Badge>
                  <p className="text-sm text-muted-foreground">A step in your sales process (e.g., New Lead, Qualified, Proposal, Negotiation).</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Lead Source</Badge>
                  <p className="text-sm text-muted-foreground">How the deal/lead was acquired (e.g., Referral, Ads, Cold Call, SEO).</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Win Rate</Badge>
                  <p className="text-sm text-muted-foreground">The percentage of deals that result in a successful sale.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Loss Rate</Badge>
                  <p className="text-sm text-muted-foreground">The percentage of deals that do not convert to a sale.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Badge variant="secondary" className="mb-1">Closed Rate</Badge>
                  <p className="text-sm text-muted-foreground">The percentage of deals that have reached a final outcome (won or lost), excluding open deals.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Lost Reason</Badge>
                  <p className="text-sm text-muted-foreground">The documented reason why a deal was not won (e.g., Price, Competition, No Budget).</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Deal Value</Badge>
                  <p className="text-sm text-muted-foreground">The monetary worth of a deal, usually the expected revenue if won.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Owner</Badge>
                  <p className="text-sm text-muted-foreground">The salesperson or account manager responsible for the deal.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Creator</Badge>
                  <p className="text-sm text-muted-foreground">The person who originally created the deal in the CRM (may differ from Owner).</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">CSV</Badge>
                  <p className="text-sm text-muted-foreground">Comma-Separated Values - a common file format for exporting data from CRMs and spreadsheets.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tips */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
          <TrendingUp className="h-5 w-5" />
          Tips for Better Analysis
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground">Keep your Pipedrive data clean</span> - Ensure all deals have proper stages, owners, and loss reasons filled in
              </li>
              <li>
                <span className="text-foreground">Use consistent naming</span> - Standardize lead source names and loss reasons for better grouping
              </li>
              <li>
                <span className="text-foreground">Export regularly</span> - Run this health check weekly or monthly to track trends over time
              </li>
              <li>
                <span className="text-foreground">Filter to compare</span> - Use filters to compare different time periods, salespeople, or sources
              </li>
              <li>
                <span className="text-foreground">Focus on outliers</span> - Look for salespeople or sources with unusually high/low win rates
              </li>
              <li>
                <span className="text-foreground">Document loss reasons</span> - The more detailed your loss reasons, the more actionable insights you'll get
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Data Security Reminder */}
      <Card className="border-green-500/50 bg-green-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-green-600 dark:text-green-400">
            <Lock className="h-5 w-5" />
            100% Client-Side Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            This dashboard is built with privacy in mind. All data processing, calculations, and visualizations 
            happen entirely within your web browser. Your sales data never leaves your computer and is never 
            transmitted to any external server. When you close or refresh this page, all uploaded data is 
            automatically cleared from memory.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
