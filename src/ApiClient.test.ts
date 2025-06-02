import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { ApiClient, ApiClientConfig } from './ApiClient'
import { z } from 'zod'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('ApiClient', () => {
  let client: ApiClient
  let config: ApiClientConfig

  beforeEach(() => {
    config = {
      baseUrl: 'https://api.example.com',
      headers: { 'Authorization': 'Bearer token' },
      timeout: 5000
    }
    client = new ApiClient(config)
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should initialize with provided config', () => {
      expect(client['baseUrl']).toBe('https://api.example.com')
      expect(client['headers']).toEqual({ 'Authorization': 'Bearer token' })
      expect(client['timeout']).toBe(5000)
    })

    it('should remove trailing slash from baseUrl', () => {
      const clientWithSlash = new ApiClient({ baseUrl: 'https://api.example.com/' })
      expect(clientWithSlash['baseUrl']).toBe('https://api.example.com')
    })

    it('should use default values for optional config', () => {
      const minimalClient = new ApiClient({ baseUrl: 'https://api.example.com' })
      expect(minimalClient['headers']).toEqual({})
      expect(minimalClient['timeout']).toBe(30000)
    })
  })

  describe('request method', () => {
    const responseSchema = z.object({ id: z.string(), name: z.string() })

    it('should make successful GET request', async () => {
      const mockResponse = { id: '1', name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve(mockResponse)
      })

      const result = await client['request']('GET', '/users', responseSchema)

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Authorization': 'Bearer token' }
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle query parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({})
      })

      await client['request']('GET', '/users', z.object({}), {
        queryParams: { page: 1, limit: 10, active: true, empty: null, undefined: undefined }
      })

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users?page=1&limit=10&active=true',
        expect.any(Object)
      )
    })

    it('should handle request body with validation', async () => {
      const bodySchema = z.object({ name: z.string() })
      const body = { name: 'Test User' }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({})
      })

      await client['request']('POST', '/users', z.object({}), {
        body,
        bodySchema
      })

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
      )
    })

    it('should validate request body against schema', async () => {
      const bodySchema = z.object({ name: z.string() })
      const invalidBody = { name: 123 } // Invalid type

      await expect(
        client['request']('POST', '/users', z.object({}), {
          body: invalidBody,
          bodySchema
        })
      ).rejects.toThrow()
    })

    it('should handle custom headers', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({})
      })

      await client['request']('GET', '/users', z.object({}), {
        headers: { 'Custom-Header': 'value' }
      })

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          headers: {
            'Authorization': 'Bearer token',
            'Custom-Header': 'value'
          }
        })
      )
    })

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: () => Promise.resolve('Not Found')
      })

      await expect(
        client['request']('GET', '/users', z.object({}))
      ).rejects.toThrow('HTTP 404: Not Found')
    })

    it('should handle non-JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'text/plain' },
        json: () => Promise.resolve({})
      })

      const result = await client['request']('DELETE', '/users/1', z.object({}))
      expect(result).toEqual({})
    })

    it('should handle request timeout', async () => {
      // Mock a delayed response
      mockFetch.mockImplementation(() => 
        new Promise(resolve => {
          setTimeout(() => resolve({
            ok: true,
            headers: { get: () => 'application/json' },
            json: () => Promise.resolve({})
          }), 10000) // 10 second delay
        })
      )

      // Create client with short timeout
      const shortTimeoutClient = new ApiClient({ baseUrl: 'https://api.example.com', timeout: 100 })

      // Mock AbortError
      const abortError = new Error('The operation was aborted')
      abortError.name = 'AbortError'
      mockFetch.mockRejectedValueOnce(abortError)

      await expect(
        shortTimeoutClient['request']('GET', '/users', z.object({}))
      ).rejects.toThrow('Request timeout after 100ms')
    })

    it('should validate response against schema', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({ invalid: 'data' })
      })

      await expect(
        client['request']('GET', '/users', responseSchema)
      ).rejects.toThrow()
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network error')
      mockFetch.mockRejectedValueOnce(networkError)

      await expect(
        client['request']('GET', '/users', z.object({}))
      ).rejects.toThrow('Network error')
    })
  })

  describe('HTTP method helpers', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({})
      })
    })

    it('should call GET request', async () => {
      const requestSpy = vi.spyOn(client as any, 'request')
      
      await client['get']('/users', z.object({}), {
        queryParams: { page: 1 },
        headers: { 'Custom': 'header' }
      })

      expect(requestSpy).toHaveBeenCalledWith('GET', '/users', expect.any(Object), {
        queryParams: { page: 1 },
        headers: { 'Custom': 'header' }
      })
    })

    it('should call POST request', async () => {
      const requestSpy = vi.spyOn(client as any, 'request')
      const bodySchema = z.object({ name: z.string() })
      
      await client['post']('/users', z.object({}), {
        body: { name: 'test' },
        bodySchema,
        queryParams: { page: 1 },
        headers: { 'Custom': 'header' }
      })

      expect(requestSpy).toHaveBeenCalledWith('POST', '/users', expect.any(Object), {
        body: { name: 'test' },
        bodySchema,
        queryParams: { page: 1 },
        headers: { 'Custom': 'header' }
      })
    })

    it('should call PUT request', async () => {
      const requestSpy = vi.spyOn(client as any, 'request')
      
      await client['put']('/users/1', z.object({}), {
        body: { name: 'updated' }
      })

      expect(requestSpy).toHaveBeenCalledWith('PUT', '/users/1', expect.any(Object), {
        body: { name: 'updated' }
      })
    })

    it('should call PATCH request', async () => {
      const requestSpy = vi.spyOn(client as any, 'request')
      
      await client['patch']('/users/1', z.object({}), {
        body: { name: 'patched' }
      })

      expect(requestSpy).toHaveBeenCalledWith('PATCH', '/users/1', expect.any(Object), {
        body: { name: 'patched' }
      })
    })

    it('should call DELETE request', async () => {
      const requestSpy = vi.spyOn(client as any, 'request')
      
      await client['delete']('/users/1', z.object({}), {
        queryParams: { force: true },
        headers: { 'Admin': 'true' }
      })

      expect(requestSpy).toHaveBeenCalledWith('DELETE', '/users/1', expect.any(Object), {
        queryParams: { force: true },
        headers: { 'Admin': 'true' }
      })
    })

    it('should work with default options', async () => {
      const requestSpy = vi.spyOn(client as any, 'request')
      
      await client['get']('/users', z.object({}))

      expect(requestSpy).toHaveBeenCalledWith('GET', '/users', expect.any(Object), {})
    })
  })

  describe('edge cases', () => {
    it('should handle empty response body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => null },
        json: () => Promise.resolve({})
      })

      const result = await client['request']('GET', '/users', z.object({}))
      expect(result).toEqual({})
    })

    it('should not add Content-Type header when already provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({})
      })

      await client['request']('POST', '/users', z.object({}), {
        body: { name: 'test' },
        headers: { 'Content-Type': 'application/xml' }
      })

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/xml'
          }
        })
      )
    })

    it('should not add body when undefined', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({})
      })

      await client['request']('GET', '/users', z.object({}))

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          body: undefined
        })
      )
    })
  })
})