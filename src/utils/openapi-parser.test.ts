import { describe, it, expect, beforeEach, vi } from 'vitest'
import { OpenAPIParser, ParsedOperation } from './openapi-parser'
import { OpenAPIV3 } from 'openapi-types'

describe('OpenAPIParser', () => {
  let parser: OpenAPIParser

  beforeEach(() => {
    parser = new OpenAPIParser()
  })

  describe('parseFromFile', () => {
    it('should parse OpenAPI spec from file', async () => {
      // Mock SwaggerParser.dereference for file parsing
      const SwaggerParser = await import('@apidevtools/swagger-parser')
      const mockDereference = vi.spyOn(SwaggerParser.default, 'dereference').mockResolvedValue({
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/test': {
            get: {
              responses: { '200': { description: 'Success' } }
            }
          }
        }
      } as any)
      
      const result = await parser.parseFromFile('/path/to/spec.json')
      
      expect(mockDereference).toHaveBeenCalledWith('/path/to/spec.json')
      expect(result.info.title).toBe('Test API')
      expect(result.operations).toHaveLength(1)
      
      mockDereference.mockRestore()
    })
  })

  describe('parseFromUrl', () => {
    it('should parse OpenAPI spec from URL', async () => {
      const SwaggerParser = await import('@apidevtools/swagger-parser')
      const mockDereference = vi.spyOn(SwaggerParser.default, 'dereference').mockResolvedValue({
        openapi: '3.0.0',
        info: { title: 'Remote API', version: '2.0.0' },
        paths: {}
      } as any)
      
      const result = await parser.parseFromUrl('https://api.example.com/openapi.json')
      
      expect(mockDereference).toHaveBeenCalledWith('https://api.example.com/openapi.json')
      expect(result.info.title).toBe('Remote API')
      
      mockDereference.mockRestore()
    })
  })

  describe('parseFromObject', () => {
    it('should parse a simple OpenAPI spec', async () => {
      const spec: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: {
          title: 'Test API',
          version: '1.0.0'
        },
        paths: {
          '/users': {
            get: {
              operationId: 'getUsers',
              summary: 'Get all users',
              responses: {
                '200': {
                  description: 'Success'
                }
              }
            }
          }
        }
      }

      const result = await parser.parseFromObject(spec)

      expect(result.info.title).toBe('Test API')
      expect(result.operations).toHaveLength(1)
      expect(result.operations[0].operationId).toBe('getUsers')
      expect(result.operations[0].method).toBe('GET')
      expect(result.operations[0].path).toBe('/users')
    })

    it('should handle schemas in components', async () => {
      const spec: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: {
          title: 'Test API',
          version: '1.0.0'
        },
        paths: {},
        components: {
          schemas: {
            User: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' }
              }
            }
          }
        }
      }

      const result = await parser.parseFromObject(spec)

      expect(result.schemas).toHaveLength(1)
      expect(result.schemas[0].name).toBe('User')
    })
  })

  describe('generateOperationId', () => {
    it('should return existing operationId if present', () => {
      const operation: ParsedOperation = {
        operationId: 'existingId',
        method: 'GET',
        path: '/users',
        responses: {}
      }

      const result = parser.generateOperationId(operation)
      expect(result).toBe('existingId')
    })

    it('should generate operationId from method and path', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users/profile',
        responses: {}
      }

      const result = parser.generateOperationId(operation)
      expect(result).toBe('getUsersProfile')
    })

    it('should ignore path parameters in operationId generation', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users/{id}/posts',
        responses: {}
      }

      const result = parser.generateOperationId(operation)
      expect(result).toBe('getUsersPosts')
    })
  })

  describe('generateClassName', () => {
    it('should generate proper class name from tag', () => {
      expect(parser.generateClassName('users')).toBe('UsersApi')
      expect(parser.generateClassName('auth')).toBe('AuthApi')
    })
  })

  describe('getSchemaByName', () => {
    it('should return schema when found', async () => {
      const spec: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {},
        components: {
          schemas: {
            User: {
              type: 'object',
              properties: { id: { type: 'string' } }
            }
          }
        }
      }

      await parser.parseFromObject(spec)
      const schema = parser.getSchemaByName('User')
      
      expect(schema).toEqual({
        type: 'object',
        properties: { id: { type: 'string' } }
      })
    })

    it('should return undefined when schema not found', async () => {
      const spec: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {}
      }

      await parser.parseFromObject(spec)
      const schema = parser.getSchemaByName('NonExistent')
      
      expect(schema).toBeUndefined()
    })
  })

  describe('getOperationsByTag', () => {
    it('should return operations for specific tag', async () => {
      const spec: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users': {
            get: {
              tags: ['users'],
              responses: { '200': { description: 'Success' } }
            }
          },
          '/posts': {
            get: {
              tags: ['posts'],
              responses: { '200': { description: 'Success' } }
            }
          }
        }
      }

      await parser.parseFromObject(spec)
      const userOps = parser.getOperationsByTag('users')
      
      expect(userOps).toHaveLength(1)
      expect(userOps[0].path).toBe('/users')
    })
  })

  describe('version and servers', () => {
    it('should detect v2 specs and convert servers', async () => {
      const spec: any = {
        swagger: '2.0',
        info: { title: 'V2', version: '1' },
        host: 'api.example.com',
        basePath: '/v2',
        schemes: ['https'],
        paths: { '/ping': { get: { responses: { '200': { description: 'ok' } } } } },
        securityDefinitions: { ApiKeyAuth: { type: 'apiKey', name: 'X-API', in: 'header' } },
      };

      const result = await parser.parseFromObject(spec);
      expect(result.version).toBe('2');
      expect(result.servers?.[0].url).toBe('https://api.example.com/v2');
    });
  })

  describe('error handling', () => {
    it('should throw error when no spec is loaded', () => {
      // Create a new parser that hasn't loaded any spec
      const emptyParser = new OpenAPIParser()
      
      expect(() => {
        emptyParser['extractParsedSpec']()
      }).toThrow('No OpenAPI spec loaded')
    })
  })
})