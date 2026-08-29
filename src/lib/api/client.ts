import type { ApiError } from "@/types/api";

const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env["VITE_API_URL"] || import.meta.env["NEXT_PUBLIC_API_URL"]
    : "") || "http://localhost:4000/api";

const API_TIMEOUT = parseInt(
  (typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env["VITE_API_TIMEOUT"] || import.meta.env["NEXT_PUBLIC_API_TIMEOUT"]
    : "") || "10000",
  10,
);

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

function buildUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {},
): Promise<Response> {
  const { timeout = API_TIMEOUT, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const authHeaders: Record<string, string> = {};
  if (authToken) {
    authHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...fetchOptions.headers,
      },
    });
    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeError(error: unknown): ApiError {
  if (error instanceof Error) {
    if (error.message === "Request timeout") {
      return { message: "Request timed out. Please try again.", code: "TIMEOUT" };
    }
    if (error.message.includes("API base URL")) {
      return { message: "Studio services are temporarily unavailable.", code: "CONFIG_ERROR" };
    }
    return { message: error.message, code: "NETWORK_ERROR" };
  }
  return { message: "An unexpected error occurred", code: "UNKNOWN_ERROR" };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: { message?: string; code?: string } = {};
    try {
      errorData = await response.json();
    } catch {
      // Ignore JSON parse errors
    }

    const statusCode = response.status;
    let message: string;

    switch (statusCode) {
      case 400:
        message = errorData.message || "Invalid request";
        break;
      case 401:
        message = "Authentication required";
        break;
      case 403:
        message = "Access denied";
        break;
      case 404:
        message = "Resource not found";
        break;
      case 422:
        message = errorData.message || "Validation failed";
        break;
      case 429:
        message = "Too many requests. Please try again later.";
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message = "Studio services are temporarily unavailable.";
        break;
      default:
        message = errorData.message || `Request failed with status ${statusCode}`;
    }

    const apiError: ApiError = {
      message,
      statusCode,
      code: errorData.code,
    };

    throw apiError;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const json = await response.json();
    // Handle backend response format: { data: T, meta?: ... } or direct array/object
    if (json && typeof json === "object" && "data" in json) {
      return json.data as T;
    }
    return json as T;
  }

  return response.text() as unknown as T;
}

export const apiClient = {
  async get<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    const url = new URL(buildUrl(path));
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetchWithTimeout(url.toString(), {
      method: "GET",
    });

    return handleResponse<T>(response);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetchWithTimeout(buildUrl(path), {
      method: "POST",
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  async patch<T>(path: string, body: unknown): Promise<T> {
    const response = await fetchWithTimeout(buildUrl(path), {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  async delete<T>(path: string): Promise<T> {
    const response = await fetchWithTimeout(buildUrl(path), {
      method: "DELETE",
    });

    return handleResponse<T>(response);
  },
};

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetchWithTimeout(buildUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return handleResponse<T>(response);
}

export { normalizeError };
export type { ApiError };
