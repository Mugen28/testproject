"use client"

import { useState } from "react"
import { Calendar, Clock, Edit, MoreHorizontal, Play, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { schedules } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function SchedulesPage() {
  const [enabledSchedules, setEnabledSchedules] = useState<Record<string, boolean>>(
    schedules.reduce(
      (acc, schedule) => ({
        ...acc,
        [schedule.id]: schedule.enabled,
      }),
      {},
    ),
  )

  const handleToggleSchedule = (id: string) => {
    setEnabledSchedules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Scheduled Scans</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <a href="/scan">
              <Plus className="mr-2 h-4 w-4" />
              New Schedule
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{schedule.project_name}</CardTitle>
                  <CardDescription className="mt-1">
                    {schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1)} scan
                  </CardDescription>
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
                      <span>Run Now</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Schedule</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Schedule</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Next run:</span>
                  </div>
                  <span className="text-sm font-medium">{formatDate(schedule.next_run)}</span>
                </div>

                {schedule.last_run && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Last run:</span>
                    </div>
                    <span className="text-sm">{formatDate(schedule.last_run)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium">Enabled</span>
                  <Switch
                    checked={enabledSchedules[schedule.id]}
                    onCheckedChange={() => handleToggleSchedule(schedule.id)}
                  />
                </div>

                {schedule.scan_type === "custom" && schedule.custom_options && (
                  <div className="rounded-md bg-muted p-2 text-xs">
                    <div className="font-medium">Custom options:</div>
                    <div>Branch: {schedule.custom_options.branch}</div>
                    {schedule.custom_options.tools && <div>Tools: {schedule.custom_options.tools.join(", ")}</div>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

