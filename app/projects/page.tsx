"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MoreHorizontal, Play, Calendar, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { ProjectVulnerabilityBadge } from "@/components/project-vulnerability-badge"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [languageFilter, setLanguageFilter] = useState("all")

  const languages = Array.from(new Set(projects.map((project) => project.primary_language)))

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.repository_url.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLanguage = languageFilter === "all" || project.primary_language === languageFilter

    return matchesSearch && matchesLanguage
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <a href="/scan">New Scan</a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguageFilter("all")}>All Languages</DropdownMenuItem>
              {languages.map((language) => (
                <DropdownMenuItem key={language} onClick={() => setLanguageFilter(language)}>
                  {language}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="grid">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Grid View</SelectItem>
              <SelectItem value="table">Table View</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="name">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="vulnerabilities">Vulnerabilities</SelectItem>
              <SelectItem value="last_scan">Last Scan Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.project_id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">
                    <Link href={`/projects/${project.project_id}`} className="hover:underline">
                      {project.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="mt-1 truncate">{project.repository_url}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="mr-2 h-4 w-4" />
                      <span>Scan Now</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Schedule Scan</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>Open Repository</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {project.primary_language}
                  </span>
                  <span className="text-muted-foreground">Last scan: {formatDate(project.last_scan_date)}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Vulnerabilities</span>
                  <span className="text-sm font-medium">{project.vulnerability_summary.total}</span>
                </div>
                <ProjectVulnerabilityBadge summary={project.vulnerability_summary} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

