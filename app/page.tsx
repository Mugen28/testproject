import { Suspense } from "react"
import { BarChart, Activity, GitBranch, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getSeverityColor } from "@/lib/utils"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentScansTable } from "@/components/recent-scans-table"
import { fetchDashboardStats, fetchScans } from "@/lib/api"
import { ErrorBoundary } from "@/components/error-boundary" // Import ErrorBoundary

function ErrorFallback({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
        {error.stack && (
          <details className="mt-2">
            <summary>Error Details</summary>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.stack}</code>
            </pre>
          </details>
        )}
      </AlertDescription>
    </Alert>
  )
}

async function DashboardContent() {
  try {
    const [dashboardStats, recentScans] = await Promise.all([fetchDashboardStats(), fetchScans()])

    // Add null checks and default values
    const totalProjects = dashboardStats?.total_projects ?? 0
    const projectsScannedLast7Days = dashboardStats?.projects_scanned_last_7_days ?? 0
    const totalVulnerabilities = dashboardStats?.total_vulnerabilities ?? 0
    const vulnerabilityDistribution = dashboardStats?.vulnerability_distribution ?? { HIGH: 0, CRITICAL: 0 }
    const activeScans = dashboardStats?.active_scans ?? 0
    const scanStatus = dashboardStats?.scan_status ?? { running: 0, queued: 0 }
    const languages = dashboardStats?.languages ?? {}

    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">{projectsScannedLast7Days} scanned in the last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vulnerabilities</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVulnerabilities}</div>
              <div className="flex items-center gap-1 text-xs">
                <span className={getSeverityColor("HIGH")}>{vulnerabilityDistribution.HIGH} high</span>
                <span>•</span>
                <span className={getSeverityColor("CRITICAL")}>{vulnerabilityDistribution.CRITICAL} critical</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Scans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeScans}</div>
              <p className="text-xs text-muted-foreground">
                {scanStatus.running} running • {scanStatus.queued} queued
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Languages</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">{Object.keys(languages).length} languages detected</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Vulnerability Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <DashboardCharts vulnerabilityDistribution={vulnerabilityDistribution} />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>{recentScans.length} scans in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentScansTable scans={recentScans.slice(0, 5)} />
            </CardContent>
          </Card>
        </div>
      </>
    )
  } catch (error) {
    console.error("Error in DashboardContent:", error)
    throw error
  }
}

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <a href="/scan">New Scan</a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {" "}
              {/* ErrorBoundary is now used */}
              <DashboardContent />
            </ErrorBoundary>
          </Suspense>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Vulnerability Trends</CardTitle>
                <CardDescription>Vulnerability detection over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Trend chart will be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detection by Tool</CardTitle>
                <CardDescription>Vulnerabilities found by each scanning tool</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Tool distribution chart will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

