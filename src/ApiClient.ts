import { z } from 'zod';

export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export class ApiClient {
  protected baseUrl: string;
  protected headers: Record<string, string>;
  protected timeout: number;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.headers = config.headers || {};
    this.timeout = config.timeout || 30000;
  }

  protected async request<Schema extends z.ZodTypeAny>(
    method: string,
    path: string,
    responseSchema: Schema,
    options: {
      body?: any;
      bodySchema?: z.ZodTypeAny;
      queryParams?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<z.infer<Schema>> {
    const { body, bodySchema, queryParams, headers = {} } = options;

    // Validate request body if schema provided
    if (bodySchema && body !== undefined) {
      bodySchema.parse(body);
    }

    // Build URL with query parameters
    const url = new URL(`${this.baseUrl}${path}`);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    // Setup request headers
    const requestHeaders: Record<string, string> = {
      ...this.headers,
      ...headers,
    };

    if (body && !requestHeaders['Content-Type']) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // For non-JSON responses, return empty object if schema expects it
        const result = responseSchema.parse({});
        return result;
      }

      const data = await response.json();
      return responseSchema.parse(data);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      
      throw error;
    }
  }

  protected async get<Schema extends z.ZodTypeAny>(
    path: string,
    responseSchema: Schema,
    options: {
      queryParams?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<z.infer<Schema>> {
    return this.request('GET', path, responseSchema, options);
  }

  protected async post<Schema extends z.ZodTypeAny>(
    path: string,
    responseSchema: Schema,
    options: {
      body?: any;
      bodySchema?: z.ZodTypeAny;
      queryParams?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<z.infer<Schema>> {
    return this.request('POST', path, responseSchema, options);
  }

  protected async put<Schema extends z.ZodTypeAny>(
    path: string,
    responseSchema: Schema,
    options: {
      body?: any;
      bodySchema?: z.ZodTypeAny;
      queryParams?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<z.infer<Schema>> {
    return this.request('PUT', path, responseSchema, options);
  }

  protected async patch<Schema extends z.ZodTypeAny>(
    path: string,
    responseSchema: Schema,
    options: {
      body?: any;
      bodySchema?: z.ZodTypeAny;
      queryParams?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<z.infer<Schema>> {
    return this.request('PATCH', path, responseSchema, options);
  }

  protected async delete<Schema extends z.ZodTypeAny>(
    path: string,
    responseSchema: Schema,
    options: {
      queryParams?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<z.infer<Schema>> {
    return this.request('DELETE', path, responseSchema, options);
  }
}