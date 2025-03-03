"use client"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Play, Calendar, Clock, FileCode, GitBranch, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { projects, vulnerabilities, recentScans } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { VulnerabilitiesTable } from "@/components/vulnerabilities-table"
import { ProjectVulnerabilityChart } from "@/components/project-vulnerability-chart"
import { RecentScansTable } from "@/components/recent-scans-table"

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.project_id === params.id)

  if (!project) {
    notFound()
  }

  const projectVulnerabilities = vulnerabilities.filter((v) => v.project_id === project.project_id)
  const projectScans = recentScans.filter((s) => s.project_id === project.project_id)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="/projects">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </a>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Repository
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm">
            <Play className="mr-2 h-4 w-4" />
            Scan Now
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Repository</CardTitle>
            <CardDescription>
              <a
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                {project.repository_url}
                <ExternalLink className="h-3 w-3" />
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Primary Language</span>
                <span className="font-medium">{project.primary_language}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Scan</span>
                <span className="font-medium">{formatDate(project.last_scan_date)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Vulnerabilities</span>
                <span className="font-medium">{project.vulnerability_summary.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Summary</CardTitle>
            <CardDescription>Distribution by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectVulnerabilityChart summary={project.vulnerability_summary} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repository Stats</CardTitle>
            <CardDescription>Code and contribution metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Files</span>
                <span className="ml-auto font-medium">247</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Branches</span>
                <span className="ml-auto font-medium">3</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Languages</span>
                <span className="ml-auto font-medium">4</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last Commit</span>
                <span className="ml-auto font-medium">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vulnerabilities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="scan-history">Scan History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerabilities</CardTitle>
              <CardDescription>All detected vulnerabilities in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilitiesTable vulnerabilities={projectVulnerabilities} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scan-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>Previous scans for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentScansTable scans={projectScans} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>Configure project-specific settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="project-name" className="text-sm font-medium">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="project-name"
                    className="rounded-md border px-3 py-2"
                    defaultValue={project.name}
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="repository-url" className="text-sm font-medium">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    id="repository-url"
                    className="rounded-md border px-3 py-2"
                    defaultValue={project.repository_url}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

