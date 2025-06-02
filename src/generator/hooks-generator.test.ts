import { describe, it, expect, beforeEach } from 'vitest'
import { HooksGenerator } from './hooks-generator'
import { ParsedOperation } from '../utils/openapi-parser'
import { GeneratedMethod } from './endpoint-generator'

describe('HooksGenerator', () => {
  let generator: HooksGenerator

  beforeEach(() => {
    generator = new HooksGenerator()
  })

  describe('generateHooksForTag', () => {
    it('should generate hooks file for query operations', () => {
      const operations: ParsedOperation[] = [{
        operationId: 'getUsers',
        method: 'GET',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }]

      const methods: GeneratedMethod[] = [{
        name: 'getUsers',
        parameters: [],
        returnType: 'Promise<User[]>',
        httpMethod: 'GET',
        path: '/users',
        responseSchema: 'UserArraySchema'
      }]

      const result = generator.generateHooksForTag(operations, 'users', 'UsersApi', methods)

      expect(result.tag).toBe('users')
      expect(result.hooks).toHaveLength(1)
      expect(result.hooks[0].hookType).toBe('query')
      expect(result.content).toContain('export function useGetUsers(')
      expect(result.content).toContain('useQuery({')
      expect(result.content).toContain('const usersApi = new UsersApi')
    })

    it('should generate hooks file for mutation operations', () => {
      const operations: ParsedOperation[] = [{
        operationId: 'createUser',
        method: 'POST',
        path: '/users',
        responses: { '201': { description: 'Created' } }
      }]

      const methods: GeneratedMethod[] = [{
        name: 'createUser',
        parameters: [{
          name: 'data',
          type: 'CreateUser',
          required: true,
          location: 'body'
        }],
        returnType: 'Promise<User>',
        httpMethod: 'POST',
        path: '/users',
        responseSchema: 'UserSchema'
      }]

      const result = generator.generateHooksForTag(operations, 'users', 'UsersApi', methods)

      expect(result.hooks[0].hookType).toBe('mutation')
      expect(result.content).toContain('export function useCreateUser(')
      expect(result.content).toContain('useMutation({')
    })

    it('should inject provided baseUrl into api instance', () => {
      const operations: ParsedOperation[] = [{
        operationId: 'getUsers',
        method: 'GET',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }]

      const methods: GeneratedMethod[] = [{
        name: 'getUsers',
        parameters: [],
        returnType: 'Promise<User[]>',
        httpMethod: 'GET',
        path: '/users',
        responseSchema: 'UserArraySchema'
      }]

      const result = generator.generateHooksForTag(
        operations,
        'users',
        'UsersApi',
        methods,
        'https://api.test.com'
      )

      expect(result.content).toContain(
        'new UsersApi("https://api.test.com")'
      )
    })
  })

  describe('query hook generation', () => {
    it('should generate query hook with required parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'getUserById',
        method: 'GET',
        path: '/users/{id}',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'getUserById',
        parameters: [{
          name: 'id',
          type: 'string',
          required: true,
          location: 'path'
        }],
        returnType: 'Promise<User>',
        httpMethod: 'GET',
        path: '/users/{id}',
        responseSchema: 'UserSchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])

      expect(result.content).toContain('useGetUserById(id: string')
      expect(result.content).toContain('queryKey: ["getUserById", id]')
      expect(result.content).toContain('enabled: id != null')
      expect(result.content).toContain('usersApi.getUserById(id)')
    })

    it('should generate query hook with optional parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'getUsers',
        method: 'GET',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'getUsers',
        parameters: [{
          name: 'limit',
          type: 'number',
          required: false,
          location: 'query'
        }],
        returnType: 'Promise<User[]>',
        httpMethod: 'GET',
        path: '/users',
        responseSchema: 'UserArraySchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])

      expect(result.content).toContain('options?: { limit?: number }')
      expect(result.content).toContain('usersApi.getUsers(options?.limit)')
      expect(result.content).toContain('...queryOptions')
    })

    it('should generate query hook without parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'getHealth',
        method: 'GET',
        path: '/health',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'getHealth',
        parameters: [],
        returnType: 'Promise<unknown>',
        httpMethod: 'GET',
        path: '/health',
        responseSchema: 'z.unknown()'
      }

      const result = generator.generateHooksForTag([operation], 'health', 'HealthApi', [method])

      expect(result.content).toContain('useGetHealth(')
      expect(result.content).toContain('queryKey: ["getHealth"]')
      expect(result.content).toContain('healthApi.getHealth()')
    })
  })

  describe('mutation hook generation', () => {
    it('should generate mutation hook with parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'createUser',
        method: 'POST',
        path: '/users',
        responses: { '201': { description: 'Created' } }
      }

      const method: GeneratedMethod = {
        name: 'createUser',
        parameters: [{
          name: 'data',
          type: 'CreateUser',
          required: true,
          location: 'body'
        }],
        returnType: 'Promise<User>',
        httpMethod: 'POST',
        path: '/users',
        responseSchema: 'UserSchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])

      expect(result.content).toContain('useCreateUser(')
      expect(result.content).toContain('UseMutationOptions<User, Error, { data: CreateUser }>')
      expect(result.content).toContain('variables: { data: CreateUser }')
      expect(result.content).toContain('usersApi.createUser(variables.data)')
    })

    it('should generate mutation hook without parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'logout',
        method: 'POST',
        path: '/auth/logout',
        responses: { '204': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'logout',
        parameters: [],
        returnType: 'Promise<void>',
        httpMethod: 'POST',
        path: '/auth/logout',
        responseSchema: 'z.void()'
      }

      const result = generator.generateHooksForTag([operation], 'auth', 'AuthApi', [method])

      expect(result.content).toContain('useLogout(')
      expect(result.content).toContain('UseMutationOptions<void, Error, void>')
      expect(result.content).toContain('authApi.logout()')
    })

    it('should generate mutation hook with multiple parameters', () => {
      const operation: ParsedOperation = {
        operationId: 'updateUser',
        method: 'PUT',
        path: '/users/{id}',
        responses: { '200': { description: 'Updated' } }
      }

      const method: GeneratedMethod = {
        name: 'updateUser',
        parameters: [
          {
            name: 'id',
            type: 'string',
            required: true,
            location: 'path'
          },
          {
            name: 'data',
            type: 'UpdateUser',
            required: true,
            location: 'body'
          }
        ],
        returnType: 'Promise<User>',
        httpMethod: 'PUT',
        path: '/users/{id}',
        responseSchema: 'UserSchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])

      expect(result.content).toContain('{ id: string; data: UpdateUser }')
      expect(result.content).toContain('usersApi.updateUser(variables.id, variables.data)')
    })
  })

  describe('hook name generation', () => {
    it('should use operationId when available', () => {
      const operation: ParsedOperation = {
        operationId: 'getUserProfile',
        method: 'GET',
        path: '/users/profile',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'getUserProfile',
        parameters: [],
        returnType: 'Promise<User>',
        httpMethod: 'GET',
        path: '/users/profile',
        responseSchema: 'UserSchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])
      expect(result.content).toContain('useGetUserProfile(')
    })

    it('should generate hook name from method and path', () => {
      const operation: ParsedOperation = {
        method: 'POST',
        path: '/users/settings',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'postUsersSettings',
        parameters: [],
        returnType: 'Promise<void>',
        httpMethod: 'POST',
        path: '/users/settings',
        responseSchema: 'z.void()'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])
      expect(result.content).toContain('usePostUsersSettings(')
    })

    it('should handle camelCase conversion', () => {
      const operation: ParsedOperation = {
        operationId: 'get-user-profile',
        method: 'GET',
        path: '/users/profile',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'getUserProfile',
        parameters: [],
        returnType: 'Promise<User>',
        httpMethod: 'GET',
        path: '/users/profile',
        responseSchema: 'UserSchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])
      expect(result.content).toContain('useGetUserProfile(')
    })
  })

  describe('operation type detection', () => {
    it('should identify GET as query operation', () => {
      const operation: ParsedOperation = {
        method: 'GET',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'getUsers',
        parameters: [],
        returnType: 'Promise<User[]>',
        httpMethod: 'GET',
        path: '/users',
        responseSchema: 'UserArraySchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])
      expect(result.hooks[0].hookType).toBe('query')
    })

    it('should identify HEAD as query operation', () => {
      const operation: ParsedOperation = {
        method: 'HEAD',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'headUsers',
        parameters: [],
        returnType: 'Promise<void>',
        httpMethod: 'HEAD',
        path: '/users',
        responseSchema: 'z.void()'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])
      expect(result.hooks[0].hookType).toBe('query')
    })

    it('should identify OPTIONS as query operation', () => {
      const operation: ParsedOperation = {
        method: 'OPTIONS',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }

      const method: GeneratedMethod = {
        name: 'optionsUsers',
        parameters: [],
        returnType: 'Promise<void>',
        httpMethod: 'OPTIONS',
        path: '/users',
        responseSchema: 'z.void()'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])
      expect(result.hooks[0].hookType).toBe('query')
    })

    it('should identify POST as mutation operation', () => {
      const operation: ParsedOperation = {
        method: 'POST',
        path: '/users',
        responses: { '201': { description: 'Created' } }
      }

      const method: GeneratedMethod = {
        name: 'createUser',
        parameters: [],
        returnType: 'Promise<User>',
        httpMethod: 'POST',
        path: '/users',
        responseSchema: 'UserSchema'
      }

      const result = generator.generateHooksForTag([operation], 'users', 'UsersApi', [method])
      expect(result.hooks[0].hookType).toBe('mutation')
    })
  })

  describe('generateQueryKeys', () => {
    it('should generate query keys for operations with parameters', () => {
      const operations: ParsedOperation[] = [{
        operationId: 'getUserById',
        method: 'GET',
        path: '/users/{id}',
        responses: { '200': { description: 'Success' } }
      }]

      const result = generator.generateQueryKeys(operations)

      expect(result).toContain('export const useGetUserByIdKey = (id: string | number)')
      expect(result).toContain('["getUserById", id] as const')
    })

    it('should generate query keys for operations without parameters', () => {
      const operations: ParsedOperation[] = [{
        operationId: 'getUsers',
        method: 'GET',
        path: '/users',
        responses: { '200': { description: 'Success' } }
      }]

      const result = generator.generateQueryKeys(operations)

      expect(result).toContain('export const useGetUsersKey = ()')
      expect(result).toContain('["getUsers"] as const')
    })

    it('should only include query operations', () => {
      const operations: ParsedOperation[] = [
        {
          operationId: 'getUsers',
          method: 'GET',
          path: '/users',
          responses: { '200': { description: 'Success' } }
        },
        {
          operationId: 'createUser',
          method: 'POST',
          path: '/users',
          responses: { '201': { description: 'Created' } }
        }
      ]

      const result = generator.generateQueryKeys(operations)

      expect(result).toContain('useGetUsersKey')
      expect(result).not.toContain('useCreateUserKey')
    })
  })

  describe('generateIndexFile', () => {
    it('should generate index file with exports', () => {
      const tags = ['users', 'posts', 'auth']
      const result = generator.generateIndexFile(tags)

      expect(result).toContain('export * from "./users";')
      expect(result).toContain('export * from "./posts";')
      expect(result).toContain('export * from "./auth";')
      expect(result).toContain('export * from "./queryKeys";')
    })
  })
})