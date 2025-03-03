"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dashboardStats } from "@/lib/data"

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("bar")

  const barData = [
    { name: "Low", value: dashboardStats.vulnerability_distribution.LOW, color: "hsl(var(--low))" },
    { name: "Medium", value: dashboardStats.vulnerability_distribution.MEDIUM, color: "hsl(var(--medium))" },
    { name: "High", value: dashboardStats.vulnerability_distribution.HIGH, color: "hsl(var(--high))" },
    { name: "Critical", value: dashboardStats.vulnerability_distribution.CRITICAL, color: "hsl(var(--critical))" },
  ]

  const pieData = barData.filter((item) => item.value > 0)

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="space-y-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} vulnerabilities`, "Count"]}
                  labelFormatter={(name) => `${name} Severity`}
                />
                <Bar dataKey="value">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="pie" className="space-y-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} vulnerabilities`, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

