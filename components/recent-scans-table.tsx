import { Check, Clock, Play, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Scan } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export function RecentScansTable({ scans }: { scans: Scan[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium">Project</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.scan_id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">{scan.project_name}</td>
                  <td className="p-4 align-middle">
                    <Badge
                      variant="outline"
                      className={`flex w-fit items-center gap-1 ${
                        scan.status === "completed"
                          ? "border-green-500 text-green-500"
                          : scan.status === "running"
                            ? "border-blue-500 text-blue-500"
                            : scan.status === "queued"
                              ? "border-yellow-500 text-yellow-500"
                              : "border-red-500 text-red-500"
                      }`}
                    >
                      {scan.status === "completed" ? (
                        <Check className="h-3 w-3" />
                      ) : scan.status === "running" ? (
                        <Play className="h-3 w-3" />
                      ) : scan.status === "queued" ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      {scan.status}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">{formatDate(scan.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

