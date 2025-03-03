"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FolderGit2,
  Shield,
  AlertTriangle,
  Play,
  Calendar,
  Settings,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    title: "Vulnerabilities",
    href: "/vulnerabilities",
    icon: AlertTriangle,
  },
  {
    title: "Scan",
    href: "/scan",
    icon: Play,
  },
  {
    title: "Schedules",
    href: "/schedules",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isMinimized ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            {!isMinimized && <span>GitAudit</span>}
          </Link>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                isMinimized && "justify-center",
              )}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {!isMinimized && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <ThemeToggle isMinimized={isMinimized} />
        </div>
      </div>
    </>
  )
}

