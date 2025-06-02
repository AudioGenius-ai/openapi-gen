import { describe, it, expect } from 'vitest'

describe('Main index exports', () => {
  it('should export all main classes', async () => {
    const {
      CodeGenerator,
      OpenAPIParser,
      SchemaGenerator,
      EndpointGenerator,
      HooksGenerator,
      ApiClient
    } = await import('./index')

    expect(CodeGenerator).toBeDefined()
    expect(OpenAPIParser).toBeDefined()
    expect(SchemaGenerator).toBeDefined()
    expect(EndpointGenerator).toBeDefined()
    expect(HooksGenerator).toBeDefined()
    expect(ApiClient).toBeDefined()
  })

  it('should export all main types', async () => {
    // Type exports are checked at compile time, but we can verify the module loads
    const module = await import('./index')
    
    // Verify the module contains the expected exports
    expect(typeof module.CodeGenerator).toBe('function')
    expect(typeof module.OpenAPIParser).toBe('function')
    expect(typeof module.SchemaGenerator).toBe('function')
    expect(typeof module.EndpointGenerator).toBe('function')
    expect(typeof module.HooksGenerator).toBe('function')
    expect(typeof module.ApiClient).toBe('function')
  })

  it('should allow instantiating exported classes', async () => {
    const {
      CodeGenerator,
      OpenAPIParser,
      SchemaGenerator,
      EndpointGenerator,
      HooksGenerator,
      ApiClient
    } = await import('./index')

    expect(() => new CodeGenerator()).not.toThrow()
    expect(() => new OpenAPIParser()).not.toThrow()
    expect(() => new SchemaGenerator()).not.toThrow()
    
    const parser = new OpenAPIParser()
    expect(() => new EndpointGenerator(parser)).not.toThrow()
    expect(() => new HooksGenerator()).not.toThrow()
    expect(() => new ApiClient({ baseUrl: 'https://api.example.com' })).not.toThrow()
  })
})