"use client"
import { Download, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vulnerabilities } from "@/lib/data"
import { VulnerabilitiesTable } from "@/components/vulnerabilities-table"

export default function VulnerabilitiesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vulnerability Explorer</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>Configure advanced filtering options for vulnerabilities.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Severity</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Critical
                    </Button>
                    <Button variant="outline" size="sm">
                      High
                    </Button>
                    <Button variant="outline" size="sm">
                      Medium
                    </Button>
                    <Button variant="outline" size="sm">
                      Low
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      semgrep
                    </Button>
                    <Button variant="outline" size="sm">
                      bandit
                    </Button>
                    <Button variant="outline" size="sm">
                      eslint-security
                    </Button>
                    <Button variant="outline" size="sm">
                      spotbugs
                    </Button>
                    <Button variant="outline" size="sm">
                      gosec
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1.5">
                      <label htmlFor="from-date" className="text-xs">
                        From
                      </label>
                      <input type="date" id="from-date" className="rounded-md border px-3 py-2 text-sm" />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="to-date" className="text-xs">
                        To
                      </label>
                      <input type="date" id="to-date" className="rounded-md border px-3 py-2 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Projects</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select projects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="proj-1">E-commerce Platform</SelectItem>
                      <SelectItem value="proj-2">Payment Gateway</SelectItem>
                      <SelectItem value="proj-3">User Authentication Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Vulnerabilities</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="high">High</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="low">Low</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Vulnerabilities</CardTitle>
              <CardDescription>Comprehensive list of all detected vulnerabilities across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Vulnerabilities</CardTitle>
              <CardDescription>High-priority vulnerabilities that require immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilitiesTable vulnerabilities={vulnerabilities.filter((v) => v.severity === "CRITICAL")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>High Vulnerabilities</CardTitle>
              <CardDescription>Serious vulnerabilities that should be addressed soon</CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilitiesTable vulnerabilities={vulnerabilities.filter((v) => v.severity === "HIGH")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medium Vulnerabilities</CardTitle>
              <CardDescription>Moderate risk vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilitiesTable vulnerabilities={vulnerabilities.filter((v) => v.severity === "MEDIUM")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Vulnerabilities</CardTitle>
              <CardDescription>Low risk vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilitiesTable vulnerabilities={vulnerabilities.filter((v) => v.severity === "LOW")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

