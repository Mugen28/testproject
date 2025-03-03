"use client"

import type React from "react"

import { useState } from "react"
import { GitBranch, Play, Clock, AlertTriangle, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { scanningTools } from "@/lib/data"

export default function ScanPage() {
  const [repositoryUrl, setRepositoryUrl] = useState("")
  const [scanType, setScanType] = useState("standard")
  const [branch, setBranch] = useState("main")
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [scanFrequency, setScanFrequency] = useState("once")

  const handleToolToggle = (tool: string) => {
    setSelectedTools((prev) => (prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      repositoryUrl,
      scanType,
      branch,
      selectedTools,
      scanFrequency,
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Scan Repository</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Repository Information</CardTitle>
              <CardDescription>Enter the details of the repository you want to scan</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repository-url">Repository URL</Label>
                  <Input
                    id="repository-url"
                    placeholder="https://github.com/username/repository"
                    value={repositoryUrl}
                    onChange={(e) => setRepositoryUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <Input id="branch" placeholder="main" value={branch} onChange={(e) => setBranch(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Scan Type</Label>
                  <RadioGroup value={scanType} onValueChange={setScanType} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-normal">
                        Standard Scan (Recommended)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quick" id="quick" />
                      <Label htmlFor="quick" className="font-normal">
                        Quick Scan
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="font-normal">
                        Custom Scan
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {scanType === "custom" && (
                  <div className="space-y-2 border rounded-md p-4">
                    <Label>Select Scanning Tools</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {scanningTools.map((tool) => (
                        <div key={tool} className="flex items-center space-x-2">
                          <Checkbox
                            id={tool}
                            checked={selectedTools.includes(tool)}
                            onCheckedChange={() => handleToolToggle(tool)}
                          />
                          <label
                            htmlFor={tool}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tool}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Schedule</Label>
                  <RadioGroup
                    value={scanFrequency}
                    onValueChange={setScanFrequency}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="once" id="once" />
                      <Label htmlFor="once" className="font-normal">
                        Run Once
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily" className="font-normal">
                        Daily
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="font-normal">
                        Weekly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="font-normal">
                        Monthly
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Start Scan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan Information</CardTitle>
              <CardDescription>What to expect from different scan types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Standard Scan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive scan using all available security tools. Provides thorough coverage of common
                  vulnerabilities and security issues.
                </p>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Estimated time:</span> 5-10 minutes
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Quick Scan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Faster scan focusing on critical and high-severity issues. Good for quick checks during development.
                </p>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Estimated time:</span> 1-3 minutes
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Custom Scan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tailored scan with specific tools and configurations. Ideal for specialized security requirements.
                </p>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Estimated time:</span> Varies based on configuration
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Repositories</CardTitle>
              <CardDescription>Quick access to previously scanned repositories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center justify-between w-full">
                  <span>company/ecommerce</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center justify-between w-full">
                  <span>company/payments</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center justify-between w-full">
                  <span>company/auth</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

