import { AdminSessionResponse } from "./auth/admin-auth-response";

/**
 * API Client - Type-safe HTTP client with automatic error handling
 * Handles all communication with VietBike backend
 */

export interface ApiResponse<T = unknown> {
  status: number;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
}

export interface ApiError {
  status: number;
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
}

export class HttpClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string, defaultTimeout: number = 30000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = defaultTimeout;
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "GET",
    });
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(
    url: string,
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a PUT request
   */
  async put<T = unknown>(
    url: string,
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T = unknown>(
    url: string,
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T = unknown>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "DELETE",
    });
  }

  /**
   * Internal request method with error handling and timeouts
   */
  private async request<T = unknown>(
    url: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const sessionResponse = await fetch(`/api/admin/auth/session`);
    const body: AdminSessionResponse = await sessionResponse.json();
    const token = body?.data?.accessToken ?? null;

    const timeout = options.timeout || this.defaultTimeout;
    const fullUrl = `${this.baseUrl}${url}`;

    // Add default headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...((options.headers as Record<string, string>) || {}),
    };

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true") {
        console.log(`[API] ${options.method || "GET"} ${fullUrl}`);
      }

      const response = await fetch(fullUrl, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response
      let data: any;
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Handle successful response
      if (response.ok) {
        if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true") {
          console.log(`[API] ✓ ${response.status} ${fullUrl}`, data);
        }

        // Return data from response.data if it exists, otherwise return whole response
        return data?.data !== undefined ? data.data : data;
      }

      // Handle error response
      const error = this.parseError(data, response.status);
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true") {
        console.error(`[API] ✗ ${response.status} ${fullUrl}`, error);
      }
      throw error;
    } catch (err) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (err instanceof Error && err.name === "AbortError") {
        const timeoutError: ApiError = {
          status: 408,
          code: "REQUEST_TIMEOUT",
          message:
            "Request timeout. Please check your connection and try again.",
        };
        throw timeoutError;
      }

      // Handle network errors
      if (err instanceof TypeError) {
        const networkError: ApiError = {
          status: 0,
          code: "NETWORK_ERROR",
          message: "Network error. Please check your internet connection.",
        };
        throw networkError;
      }

      // Re-throw if already an API error
      if (this.isApiError(err)) {
        throw err;
      }

      // Unknown error
      throw {
        status: 500,
        code: "UNKNOWN_ERROR",
        message: "An unexpected error occurred",
        details: err,
      } as ApiError;
    }
  }

  /**
   * Parse error response from backend
   */
  private parseError(data: any, status: number): ApiError {
    if (typeof data === "object" && data !== null) {
      return {
        status,
        code: data.code || data.error?.code || "API_ERROR",
        message: data.message || data.error?.message || "An error occurred",
        details: data.details || data.error?.details,
      };
    }

    return {
      status,
      code: "API_ERROR",
      message: typeof data === "string" ? data : "An error occurred",
    };
  }

  /**
   * Type guard for API errors
   */
  private isApiError(err: any): err is ApiError {
    return (
      err &&
      typeof err === "object" &&
      "status" in err &&
      "code" in err &&
      "message" in err
    );
  }
}

// Create singleton instance
const apiClient = new HttpClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
  parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
);

export default apiClient;
