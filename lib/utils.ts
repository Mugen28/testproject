import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export function getSeverityColor(severity: Severity) {
  switch (severity) {
    case "LOW":
      return "severity-low"
    case "MEDIUM":
      return "severity-medium"
    case "HIGH":
      return "severity-high"
    case "CRITICAL":
      return "severity-critical"
    default:
      return ""
  }
}

export function getSeverityBgColor(severity: Severity) {
  switch (severity) {
    case "LOW":
      return "bg-severity-low"
    case "MEDIUM":
      return "bg-severity-medium"
    case "HIGH":
      return "bg-severity-high"
    case "CRITICAL":
      return "bg-severity-critical"
    default:
      return ""
  }
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

