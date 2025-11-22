// API base URL
const API_BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL+'/api' : 'http://localhost:8000/api';

// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Supported languages
export const SUPPORTED_LOCALES = ['az', 'ru'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'az';

// API Error class
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// Request options interface
export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string>;
  locale?: SupportedLocale;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  credentials?: RequestCredentials;
  skipAuth?: boolean;
  _isRetry?: boolean;
}

// Default request headers
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};


/**
 * Generic API client for making HTTP requests
 */
export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    locale = DEFAULT_LOCALE,
    cache,
    revalidate,
    tags,
    credentials = 'same-origin',
  } = options;

  // Build URL with query parameters
  const url = new URL(
    endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  );
  
  // Add query parameters if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== 'undefined' && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }

  // Prepare headers with authentication
  const requestHeaders: Record<string, string> = {
    ...defaultHeaders,
    'Accept-Language': locale,
    ...headers,
  };

  

  // Prepare request options
  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials,
    // Add next.js specific caching options
    next: {
      ...(revalidate !== undefined ? { revalidate } : {}),
      ...(tags ? { tags } : {}),
    },
    ...(cache ? { cache } : {}),
  };

  // Add body for non-GET requests
  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url.toString(), fetchOptions);
    if (!response.ok) {
        const errorData = await response.json();
        throw { status: response.status, data: errorData };
    }
    const responseData: T = await response.json();
    return  responseData ;
} catch (error) {
  console.error(error)
    throw error;
}
}

// Convenience methods for different HTTP verbs
export const get = <T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> => 
  apiClient<T>(endpoint, { 
    ...options, 
    method: 'GET',
  });

export const post = <T, D extends object>(endpoint: string, data: D, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> => 
  apiClient<T>(endpoint, { 
    ...options, 
    method: 'POST', 
    body: data,
  });

export const put = <T, D extends object>(endpoint: string, data: D, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> => 
  apiClient<T>(endpoint, { 
    ...options, 
    method: 'PUT', 
    body: data,
  });

export const patch = <T, D extends object>(endpoint: string, data: D, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> => 
  apiClient<T>(endpoint, { 
    ...options, 
    method: 'PATCH', 
    body: data,
  });

export const del = <T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> => 
  apiClient<T>(endpoint, { 
    ...options, 
    method: 'DELETE',
  });

// Export an object with all methods for more traditional usage
const api = {
  request: apiClient,
  get,
  post,
  put,
  patch,
  delete: del
};

export default api;