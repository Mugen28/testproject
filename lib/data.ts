import type { Severity } from "./utils"

export interface Project {
  project_id: string
  name: string
  repository_url: string
  primary_language: string
  last_scan_date: string
  vulnerability_summary: {
    LOW: number
    MEDIUM: number
    HIGH: number
    CRITICAL: number
    total: number
  }
}

export interface Vulnerability {
  id: string
  tool: string
  severity: Severity
  message: string
  path: string
  line: number
  project_id: string
  project_name: string
  scan_id: string
  scan_date: string
}

export interface Scan {
  scan_id: string
  project_id: string
  project_name: string
  status: "queued" | "running" | "completed" | "failed"
  progress?: string
  timestamp: string
  vulnerabilities_found?: number
}

export interface Schedule {
  id: string
  project_id: string
  project_name: string
  frequency: "daily" | "weekly" | "monthly"
  next_run: string
  enabled: boolean
  last_run?: string
  scan_type: "standard" | "custom"
  custom_options?: {
    branch?: string
    tools?: string[]
  }
}

// Mock data for projects
export const projects: Project[] = [
  {
    project_id: "proj-1",
    name: "E-commerce Platform",
    repository_url: "https://github.com/company/ecommerce",
    primary_language: "JavaScript",
    last_scan_date: "2024-03-01T10:30:00Z",
    vulnerability_summary: {
      LOW: 12,
      MEDIUM: 8,
      HIGH: 3,
      CRITICAL: 1,
      total: 24,
    },
  },
  {
    project_id: "proj-2",
    name: "Payment Gateway",
    repository_url: "https://github.com/company/payments",
    primary_language: "Python",
    last_scan_date: "2024-02-28T14:15:00Z",
    vulnerability_summary: {
      LOW: 5,
      MEDIUM: 7,
      HIGH: 4,
      CRITICAL: 2,
      total: 18,
    },
  },
  {
    project_id: "proj-3",
    name: "User Authentication Service",
    repository_url: "https://github.com/company/auth",
    primary_language: "TypeScript",
    last_scan_date: "2024-03-02T09:45:00Z",
    vulnerability_summary: {
      LOW: 3,
      MEDIUM: 2,
      HIGH: 1,
      CRITICAL: 0,
      total: 6,
    },
  },
  {
    project_id: "proj-4",
    name: "Inventory Management",
    repository_url: "https://github.com/company/inventory",
    primary_language: "Java",
    last_scan_date: "2024-02-25T11:20:00Z",
    vulnerability_summary: {
      LOW: 15,
      MEDIUM: 10,
      HIGH: 5,
      CRITICAL: 0,
      total: 30,
    },
  },
  {
    project_id: "proj-5",
    name: "Analytics Dashboard",
    repository_url: "https://github.com/company/analytics",
    primary_language: "JavaScript",
    last_scan_date: "2024-03-03T08:10:00Z",
    vulnerability_summary: {
      LOW: 8,
      MEDIUM: 4,
      HIGH: 2,
      CRITICAL: 0,
      total: 14,
    },
  },
  {
    project_id: "proj-6",
    name: "Mobile App Backend",
    repository_url: "https://github.com/company/mobile-api",
    primary_language: "Go",
    last_scan_date: "2024-02-29T16:40:00Z",
    vulnerability_summary: {
      LOW: 6,
      MEDIUM: 3,
      HIGH: 1,
      CRITICAL: 0,
      total: 10,
    },
  },
  {
    project_id: "proj-7",
    name: "Customer Support Portal",
    repository_url: "https://github.com/company/support",
    primary_language: "PHP",
    last_scan_date: "2024-02-27T13:25:00Z",
    vulnerability_summary: {
      LOW: 20,
      MEDIUM: 15,
      HIGH: 8,
      CRITICAL: 3,
      total: 46,
    },
  },
  {
    project_id: "proj-8",
    name: "Content Management System",
    repository_url: "https://github.com/company/cms",
    primary_language: "Ruby",
    last_scan_date: "2024-03-01T15:50:00Z",
    vulnerability_summary: {
      LOW: 10,
      MEDIUM: 6,
      HIGH: 2,
      CRITICAL: 1,
      total: 19,
    },
  },
]

// Mock data for vulnerabilities
export const vulnerabilities: Vulnerability[] = [
  {
    id: "vuln-1",
    tool: "semgrep",
    severity: "HIGH",
    message: "SQL Injection vulnerability in query construction",
    path: "src/database/queries.js",
    line: 42,
    project_id: "proj-1",
    project_name: "E-commerce Platform",
    scan_id: "scan-1",
    scan_date: "2024-03-01T10:30:00Z",
  },
  {
    id: "vuln-2",
    tool: "bandit",
    severity: "CRITICAL",
    message: "Hardcoded credentials in configuration file",
    path: "config/settings.py",
    line: 17,
    project_id: "proj-2",
    project_name: "Payment Gateway",
    scan_id: "scan-2",
    scan_date: "2024-02-28T14:15:00Z",
  },
  {
    id: "vuln-3",
    tool: "eslint-security",
    severity: "MEDIUM",
    message: "Cross-site scripting (XSS) vulnerability in user input handling",
    path: "src/components/UserInput.tsx",
    line: 28,
    project_id: "proj-3",
    project_name: "User Authentication Service",
    scan_id: "scan-3",
    scan_date: "2024-03-02T09:45:00Z",
  },
  {
    id: "vuln-4",
    tool: "spotbugs",
    severity: "LOW",
    message: "Potential resource leak in file handling",
    path: "src/main/java/com/company/FileProcessor.java",
    line: 56,
    project_id: "proj-4",
    project_name: "Inventory Management",
    scan_id: "scan-4",
    scan_date: "2024-02-25T11:20:00Z",
  },
  {
    id: "vuln-5",
    tool: "semgrep",
    severity: "HIGH",
    message: "Insecure direct object reference (IDOR)",
    path: "routes/api/users.js",
    line: 89,
    project_id: "proj-1",
    project_name: "E-commerce Platform",
    scan_id: "scan-1",
    scan_date: "2024-03-01T10:30:00Z",
  },
  {
    id: "vuln-6",
    tool: "bandit",
    severity: "MEDIUM",
    message: "Weak cryptographic key generation",
    path: "utils/crypto.py",
    line: 34,
    project_id: "proj-2",
    project_name: "Payment Gateway",
    scan_id: "scan-2",
    scan_date: "2024-02-28T14:15:00Z",
  },
  {
    id: "vuln-7",
    tool: "gosec",
    severity: "MEDIUM",
    message: "Unhandled errors in HTTP response",
    path: "handlers/api.go",
    line: 127,
    project_id: "proj-6",
    project_name: "Mobile App Backend",
    scan_id: "scan-6",
    scan_date: "2024-02-29T16:40:00Z",
  },
  {
    id: "vuln-8",
    tool: "phpcs-security-audit",
    severity: "CRITICAL",
    message: "Remote code execution vulnerability in file upload",
    path: "includes/upload.php",
    line: 75,
    project_id: "proj-7",
    project_name: "Customer Support Portal",
    scan_id: "scan-7",
    scan_date: "2024-02-27T13:25:00Z",
  },
  {
    id: "vuln-9",
    tool: "brakeman",
    severity: "HIGH",
    message: "Mass assignment vulnerability in user model",
    path: "app/models/user.rb",
    line: 12,
    project_id: "proj-8",
    project_name: "Content Management System",
    scan_id: "scan-8",
    scan_date: "2024-03-01T15:50:00Z",
  },
  {
    id: "vuln-10",
    tool: "eslint-security",
    severity: "LOW",
    message: "Outdated npm package with known vulnerabilities",
    path: "package.json",
    line: 25,
    project_id: "proj-5",
    project_name: "Analytics Dashboard",
    scan_id: "scan-5",
    scan_date: "2024-03-03T08:10:00Z",
  },
]

// Mock data for recent scans
export const recentScans: Scan[] = [
  {
    scan_id: "scan-1",
    project_id: "proj-1",
    project_name: "E-commerce Platform",
    status: "completed",
    timestamp: "2024-03-01T10:30:00Z",
    vulnerabilities_found: 24,
  },
  {
    scan_id: "scan-2",
    project_id: "proj-2",
    project_name: "Payment Gateway",
    status: "completed",
    timestamp: "2024-02-28T14:15:00Z",
    vulnerabilities_found: 18,
  },
  {
    scan_id: "scan-3",
    project_id: "proj-3",
    project_name: "User Authentication Service",
    status: "completed",
    timestamp: "2024-03-02T09:45:00Z",
    vulnerabilities_found: 6,
  },
  {
    scan_id: "scan-4",
    project_id: "proj-4",
    project_name: "Inventory Management",
    status: "completed",
    timestamp: "2024-02-25T11:20:00Z",
    vulnerabilities_found: 30,
  },
  {
    scan_id: "scan-5",
    project_id: "proj-5",
    project_name: "Analytics Dashboard",
    status: "completed",
    timestamp: "2024-03-03T08:10:00Z",
    vulnerabilities_found: 14,
  },
  {
    scan_id: "scan-9",
    project_id: "proj-1",
    project_name: "E-commerce Platform",
    status: "running",
    progress: "Running Semgrep scan (65%)",
    timestamp: "2024-03-03T14:20:00Z",
  },
  {
    scan_id: "scan-10",
    project_id: "proj-3",
    project_name: "User Authentication Service",
    status: "queued",
    timestamp: "2024-03-03T15:00:00Z",
  },
]

// Mock data for scheduled scans
export const schedules: Schedule[] = [
  {
    id: "sched-1",
    project_id: "proj-1",
    project_name: "E-commerce Platform",
    frequency: "daily",
    next_run: "2024-03-04T10:00:00Z",
    enabled: true,
    last_run: "2024-03-03T10:00:00Z",
    scan_type: "standard",
  },
  {
    id: "sched-2",
    project_id: "proj-2",
    project_name: "Payment Gateway",
    frequency: "weekly",
    next_run: "2024-03-07T14:00:00Z",
    enabled: true,
    last_run: "2024-02-28T14:00:00Z",
    scan_type: "custom",
    custom_options: {
      branch: "develop",
      tools: ["bandit", "semgrep"],
    },
  },
  {
    id: "sched-3",
    project_id: "proj-3",
    project_name: "User Authentication Service",
    frequency: "daily",
    next_run: "2024-03-04T09:00:00Z",
    enabled: false,
    last_run: "2024-03-02T09:00:00Z",
    scan_type: "standard",
  },
  {
    id: "sched-4",
    project_id: "proj-4",
    project_name: "Inventory Management",
    frequency: "monthly",
    next_run: "2024-03-25T11:00:00Z",
    enabled: true,
    last_run: "2024-02-25T11:00:00Z",
    scan_type: "standard",
  },
]

// Statistics for dashboard
export const dashboardStats = {
  total_projects: projects.length,
  total_vulnerabilities: projects.reduce((acc, project) => acc + project.vulnerability_summary.total, 0),
  vulnerability_distribution: {
    LOW: projects.reduce((acc, project) => acc + project.vulnerability_summary.LOW, 0),
    MEDIUM: projects.reduce((acc, project) => acc + project.vulnerability_summary.MEDIUM, 0),
    HIGH: projects.reduce((acc, project) => acc + project.vulnerability_summary.HIGH, 0),
    CRITICAL: projects.reduce((acc, project) => acc + project.vulnerability_summary.CRITICAL, 0),
  },
  languages: {
    JavaScript: 2,
    TypeScript: 1,
    Python: 1,
    Java: 1,
    Go: 1,
    PHP: 1,
    Ruby: 1,
  },
  scan_status: {
    completed: 5,
    running: 1,
    queued: 1,
    failed: 0,
  },
}

// Tools used for scanning
export const scanningTools = [
  "semgrep",
  "bandit",
  "eslint-security",
  "spotbugs",
  "gosec",
  "phpcs-security-audit",
  "brakeman",
  "sonarqube",
  "snyk",
  "trivy",
]

