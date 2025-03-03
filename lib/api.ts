import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://185.60.136.91:8000"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const handleApiError = (error: any) => {
  console.error("API Error:", error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || "Unknown error"}`)
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("No response received from the server. Please try again later.")
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error("Error setting up the request. Please check your connection and try again.")
  }
}

export const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/dashboard/stats")
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const fetchProjects = async () => {
  try {
    const response = await api.get("/projects")
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const fetchProject = async (id: string) => {
  try {
    const response = await api.get(`/projects/${id}`)
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const fetchVulnerabilities = async (projectId?: string) => {
  try {
    const url = projectId ? `/vulnerabilities?projectId=${projectId}` : "/vulnerabilities"
    const response = await api.get(url)
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const fetchScans = async (projectId?: string) => {
  try {
    const url = projectId ? `/scans?projectId=${projectId}` : "/scans"
    const response = await api.get(url)
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const fetchSchedules = async () => {
  try {
    const response = await api.get("/schedules")
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const createScan = async (data: {
  repositoryUrl: string
  scanType: string
  branch?: string
  tools?: string[]
}) => {
  try {
    const response = await api.post("/scans", data)
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const updateSchedule = async (id: string, data: { enabled: boolean }) => {
  try {
    const response = await api.patch(`/schedules/${id}`, data)
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

