import { describe, it, expect, beforeEach, vi } from 'vitest'
import { EndpointGenerator } from './endpoint-generator'
import { OpenAPIParser, ParsedOperation } from '../utils/openapi-parser'
import { OpenAPIV3 } from 'openapi-types'

describe('EndpointGenerator', () => {
  let generator: EndpointGenerator
  let mockParser: OpenAPIParser

  beforeEach(() => {
    mockParser = new OpenAPIParser()
    vi.spyOn(mockParser, 'generateClassName').mockReturnValue('UsersApi')
    generator = new EndpointGenerator(mockParser)
  })

  describe('generateEndpointClasses', () => {
    it('should generate endpoint class with operations', () => {
      const operations: ParsedOperation[] = [{
        operationId: 'getUser',
        method: 'GET',
        path: '/users/{id}',
        tags: ['users'],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          }
        }
      }]

      const result = generator.generateEndpointClasses(operations, 'users')

      expect(result.className).toBe('UsersApi')
      expect(result.operations).toHaveLength(1)
      expect(result.content).toContain('export class UsersApi extends ApiClient')
      expect(result.content).toContain('getUser(id: string | number): Promise<User>')
    })

    it('should group operations without tags under the default tag', () => {
      const operations: ParsedOperation[] = [{
        operationId: 'getHealth',
        method: 'GET',
        path: '/health',
        responses: { '200': { description: 'OK' } }
      }]

      const defaultResult = generator.generateEndpointClasses(operations, 'default')
      const otherResult = generator.generateEndpointClasses(operations, 'health')

      expect(defaultResult.operations).toHaveLength(1)
      expect(otherResult.operations).toHaveLength(0)
    })
  })

  describe('generateMethod', () => {
    it('should generate method with path parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'getUserById',
        method: 'GET',
        path: '/users/{id}',
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          }
        }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      
      expect(result.content).toContain('getUserById(id: string | number)')
      expect(result.content).toContain('this.get(`/users/${id}`')
    })

    it('should generate method with query parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'getUsers',
        method: 'GET',
        path: '/users',
        parameters: [{
          name: 'limit',
          in: 'query',
          required: false,
          schema: { type: 'number' }
        }],
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      
      expect(result.content).toContain('limit?: number')
      expect(result.content).toContain('queryParams: { limit }')
    })

    it('should generate method with request body', () => {
      const operation: ParsedOperation = {
        operationId: 'createUser',
        method: 'POST',
        path: '/users',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUser' }
            }
          }
        },
        responses: { '201': { description: 'Created' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      
      expect(result.content).toContain('data: CreateUser')
      expect(result.content).toContain('body: data')
      expect(result.content).toContain('bodySchema: CreateUserSchema')
    })

    it('should generate method with header parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'deleteUser',
        method: 'DELETE',
        path: '/users/{id}',
        parameters: [{
          name: 'x-api-key',
          in: 'header',
          required: true,
          schema: { type: 'string' }
        }],
        responses: { '204': { description: 'Deleted' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      
      expect(result.content).toContain('xApiKey: string')
      expect(result.content).toContain('"xApiKey": xApiKey')
    })
  })

  describe('method name generation', () => {
    it('should use operationId when available', () => {
      const operation: ParsedOperation = {
        operationId: 'getUserProfile',
        method: 'GET',
        path: '/users/profile',
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('getUserProfile(')
    })

    it('should generate method name from path when no operationId', () => {
      const operation: ParsedOperation = {
        method: 'POST',
        path: '/users/profile/settings',
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('postUsersProfileSettings(')
    })

    it('should handle camelCase conversion for operationId', () => {
      const operation: ParsedOperation = {
        operationId: 'get-user-profile',
        method: 'GET',
        path: '/users/profile',
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('getUserProfile(')
    })
  })

  describe('response schema handling', () => {
    it('should handle 200 response', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          }
        }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('Promise<User>')
      expect(result.content).toContain('UserSchema')
    })

    it('should handle 201 response', () => {
      const operation: ParsedOperation = {
        method: 'POST',
        path: '/users',
        responses: {
          '201': {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          }
        }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('Promise<User>')
    })

    it('should fallback to unknown for responses without schema', () => {
      const operation: ParsedOperation = {
        method: 'DELETE',
        path: '/users/{id}',
        responses: {
          '204': { description: 'No Content' }
        }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('Promise<unknown>')
      expect(result.content).toContain('z.unknown()')
    })
  })

  describe('parameter type inference', () => {
    it('should handle string parameters', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        parameters: [{
          name: 'search',
          in: 'query',
          schema: { type: 'string' }
        }],
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('search?: string')
    })

    it('should handle number parameters', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        parameters: [{
          name: 'limit',
          in: 'query',
          schema: { type: 'number' }
        }],
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('limit?: number')
    })

    it('should handle boolean parameters', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        parameters: [{
          name: 'active',
          in: 'query',
          schema: { type: 'boolean' }
        }],
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('active?: boolean')
    })

    it('should handle array parameters', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        parameters: [{
          name: 'tags',
          in: 'query',
          schema: { type: 'array' }
        }],
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('tags?: unknown[]')
    })

    it('should handle typed array parameters', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        parameters: [{
          name: 'tags',
          in: 'query',
          schema: { type: 'array', items: { type: 'string' } }
        }],
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('tags?: string[]')
    })

    it('should default to unknown for unknown parameter types', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        parameters: [{
          name: 'custom',
          in: 'query',
          schema: { type: 'unknown' as any }
        }],
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('custom?: unknown')
    })
  })

  describe('generateIndexFile', () => {
    it('should generate index file with exports', () => {
      const classNames = ['UsersApi', 'PostsApi', 'AuthApi']
      const result = generator.generateIndexFile(classNames)
      
      expect(result).toContain('export * from "./UsersApi";')
      expect(result).toContain('export * from "./PostsApi";')
      expect(result).toContain('export * from "./AuthApi";')
    })
  })

  describe('edge cases', () => {
    it('should handle operations without request body', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).not.toContain('body:')
    })

    it('should handle operations without parameters', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/health',
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('getHealth(): Promise<unknown>')
    })

    it('should handle path parameters in path', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users/{userId}/posts/{postId}',
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('userId: string | number, postId: string | number')
      expect(result.content).toContain('`/users/${userId}/posts/${postId}`')
    })

    it('should handle operations without request body returning undefined', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      // This tests the case where getRequestBodySchema returns undefined (line 181)
      expect(result.content).not.toContain('bodySchema:')
    })

    it('should handle inline object schemas', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'string' } }
                }
              }
            }
          }
        }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      expect(result.content).toContain('z.object')
      expect(result.content).toContain('id: z.string()')
    })

    it('should handle type inference for unknown schemas', () => {
      const operation: ParsedOperation = {
        method: 'POST',
        path: '/users',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { name: { type: 'string' } }
              }
            }
          }
        },
        responses: { '201': { description: 'Created' } }
      }

      const result = generator.generateEndpointClasses([operation], 'default')
      // This tests inferTypeFromSchema for unknown type (lines 206-207)
      expect(result.content).toContain('data: unknown')
    })
  })
})