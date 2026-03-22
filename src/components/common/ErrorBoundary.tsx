"use client";

import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log to external error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Also log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-surface-container/30">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mx-auto mb-4">
              <AlertCircle className="text-red-500" size={24} />
            </div>

            <h2 className="text-2xl font-bold text-on-surface text-center mb-2">
              Something went wrong
            </h2>

            <p className="text-secondary text-center text-sm mb-6">
              We encountered an error while processing your request. Please try
              again.
            </p>

            {this.props.showDetails && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200/30 rounded-xl text-xs text-red-700 font-mono overflow-auto max-h-32">
                <p className="font-bold mb-2">Error Details:</p>
                <p>{this.state.error.message}</p>
                {this.state.errorInfo && (
                  <details className="mt-2 text-[10px]">
                    <summary className="cursor-pointer font-bold">
                      Stack Trace
                    </summary>
                    <pre className="mt-1 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                <RotateCcw size={18} />
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 bg-surface-container text-on-surface py-3 rounded-xl font-bold hover:bg-surface-container/80 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
