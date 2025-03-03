"use client"

import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  FallbackComponent: React.ComponentType<{ error: Error }>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <this.props.FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}

export { ErrorBoundary }

