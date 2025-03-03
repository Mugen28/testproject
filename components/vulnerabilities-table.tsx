"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, ExternalLink, FileCode, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Vulnerability } from "@/lib/data"
import { getSeverityColor } from "@/lib/utils"

export function VulnerabilitiesTable({ vulnerabilities }: { vulnerabilities: Vulnerability[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [toolFilter, setToolFilter] = useState("all")

  const tools = Array.from(new Set(vulnerabilities.map((vuln) => vuln.tool)))

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    const matchesSearch =
      vuln.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.path.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = severityFilter === "all" || vuln.severity === severityFilter
    const matchesTool = toolFilter === "all" || vuln.tool === toolFilter

    return matchesSearch && matchesSeverity && matchesTool
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search vulnerabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={toolFilter} onValueChange={setToolFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Tool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tools</SelectItem>
              {tools.map((tool) => (
                <SelectItem key={tool} value={tool}>
                  {tool}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <div className="flex items-center gap-2">
                    Severity
                    <Button variant="ghost" size="sm" className="p-0">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">Tool</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVulnerabilities.map((vuln) => (
                <tr key={vuln.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <Badge variant="outline" className={`${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {vuln.tool}
                    </span>
                  </td>
                  <td className="p-4 align-middle max-w-[300px] truncate" title={vuln.message}>
                    {vuln.message}
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">{vuln.path}</span>
                      <span>:</span>
                      <span>{vuln.line}</span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileCode className="mr-2 h-4 w-4" />
                          <span>View Code</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Open in Repository</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          <span>Mark as Fixed</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

