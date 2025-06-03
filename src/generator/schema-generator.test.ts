import { describe, it, expect, beforeEach } from 'vitest'
import { SchemaGenerator } from './schema-generator'
import { ParsedSchema } from '../utils/openapi-parser'
import { OpenAPIV3 } from 'openapi-types'

describe('SchemaGenerator', () => {
  let generator: SchemaGenerator

  beforeEach(() => {
    generator = new SchemaGenerator()
  })

  describe('generateSchemas', () => {
    it('should generate Zod schema for string type', () => {
      const schemas: ParsedSchema[] = [{
        name: 'StringSchema',
        schema: {
          type: 'string'
        }
      }]

      const result = generator.generateSchemas(schemas)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('StringSchema')
      expect(result[0].content).toContain('z.string()')
      expect(result[0].content).toContain('export const StringSchemaSchema')
      expect(result[0].content).toContain('export type StringSchema')
    })

    it('should generate Zod schema for object type', () => {
      const schemas: ParsedSchema[] = [{
        name: 'User',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            age: { type: 'number' }
          },
          required: ['id', 'name']
        }
      }]

      const result = generator.generateSchemas(schemas)

      expect(result[0].content).toContain('z.object({')
      expect(result[0].content).toContain('id: z.string()')
      expect(result[0].content).toContain('name: z.string()')
      expect(result[0].content).toContain('age: z.number().optional()')
    })

    it('should handle string with format validations', () => {
      const schemas: ParsedSchema[] = [{
        name: 'EmailSchema',
        schema: {
          type: 'string',
          format: 'email'
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.string().email()')
    })

    it('should handle array schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'StringArray',
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.array(z.string())')
    })

    it('should handle enum schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'Status',
        schema: {
          type: 'string',
          enum: ['active', 'inactive', 'pending']
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.enum(["active", "inactive", "pending"])')
    })

    it('should handle number with min/max constraints', () => {
      const schemas: ParsedSchema[] = [{
        name: 'Age',
        schema: {
          type: 'integer',
          minimum: 0,
          maximum: 120
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.number().int().min(0).max(120)')
    })

    it('should handle string with length constraints', () => {
      const schemas: ParsedSchema[] = [{
        name: 'Name',
        schema: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^[a-zA-Z]+$'
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.string().min(1).max(100).regex(/^[a-zA-Z]+$/)')
    })

    it('should handle oneOf schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'StringOrNumber',
        schema: {
          oneOf: [
            { type: 'string' },
            { type: 'number' }
          ]
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.union([z.string(), z.number()])')
    })

    it('should handle anyOf schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'Flexible',
        schema: {
          anyOf: [
            { type: 'string' },
            { type: 'boolean' }
          ]
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.union([z.string(), z.boolean()])')
    })

    it('should handle nullable schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'NullableName',
        schema: {
          type: 'string',
          nullable: true
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.union([z.string(), z.null()])')
    })

    it('should handle type array with null', () => {
      const schemas: ParsedSchema[] = [{
        name: 'MaybeNumber',
        schema: {
          type: ['number', 'null'] as any
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.union([z.number(), z.null()])')
    })

    it('should handle allOf schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'Combined',
        schema: {
          allOf: [
            { type: 'object', properties: { name: { type: 'string' } } },
            { type: 'object', properties: { age: { type: 'number' } } }
          ]
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('.and(')
    })

    it('should handle object with additionalProperties', () => {
      const schemas: ParsedSchema[] = [{
        name: 'FlexibleObject',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' }
          },
          additionalProperties: { type: 'string' }
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.object({')
    })

    it('should handle object with strict mode', () => {
      const schemas: ParsedSchema[] = [{
        name: 'StrictObject',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' }
          },
          additionalProperties: false
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('.strict()')
    })

    it('should handle schemas with dependencies', () => {
      const schemas: ParsedSchema[] = [{
        name: 'UserWithRef',
        schema: {
          type: 'object',
          properties: {
            profile: { $ref: '#/components/schemas/Profile' }
          }
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].dependencies).toContain('Profile')
      expect(result[0].content).toContain('ProfileSchema')
    })
  })

  describe('generateIndexFile', () => {
    it('should generate proper index file exports', () => {
      const schemaNames = ['User', 'Post', 'Comment']
      
      const result = generator.generateIndexFile(schemaNames)
      
      expect(result).toContain('export * from "./User";')
      expect(result).toContain('export * from "./Post";')
      expect(result).toContain('export * from "./Comment";')
    })

    it('should handle empty schema names', () => {
      const result = generator.generateIndexFile([])
      expect(result).toBe('\n')
    })
  })

  describe('edge cases', () => {
    it('should handle unknown schema types', () => {
      const schemas: ParsedSchema[] = [{
        name: 'Unknown',
        schema: {
          type: 'unknown' as any
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.unknown()')
    })

    it('should handle array without items', () => {
      const schemas: ParsedSchema[] = [{
        name: 'EmptyArray',
        schema: {
          type: 'array'
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.array(z.unknown())')
    })

    it('should handle object without properties', () => {
      const schemas: ParsedSchema[] = [{
        name: 'EmptyObject',
        schema: {
          type: 'object'
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.object({})')
    })

    it('should handle empty enum', () => {
      const schemas: ParsedSchema[] = [{
        name: 'EmptyEnum',
        schema: {
          enum: []
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.unknown()')
    })

    it('should handle empty anyOf schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'EmptyAnyOf',
        schema: {
          anyOf: []
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.unknown()')
    })

    it('should handle empty allOf schemas', () => {
      const schemas: ParsedSchema[] = [{
        name: 'EmptyAllOf',
        schema: {
          allOf: []
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.unknown()')
    })

    it('should handle single item in allOf', () => {
      const schemas: ParsedSchema[] = [{
        name: 'SingleAllOf',
        schema: {
          allOf: [
            { type: 'string' }
          ]
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('z.string()')
      expect(result[0].content).not.toContain('.and(')
    })

    it('should handle ref extraction with unknown reference', () => {
      const schemas: ParsedSchema[] = [{
        name: 'TestSchema',
        schema: {
          type: 'object',
          properties: {
            ref: { $ref: 'invalid-ref' }
          }
        }
      }]

      const result = generator.generateSchemas(schemas)
      expect(result[0].content).toContain('invalid-refSchema')
    })
  })
})