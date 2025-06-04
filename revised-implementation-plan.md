# Revised Implementation Plan Based on OpenAPI Analysis

## Priority 1: Fix Inline Return Types (Most Critical)

### Problem
The OpenAPI spec uses inline schemas extensively, causing methods to return `Promise<Record<string, any>>`.

### Solution
Generate proper TypeScript types for ALL inline schemas, not just some.

### Implementation

1. **Modify EndpointGenerator to always generate types for inline response schemas**

```typescript
private getResponseSchema(operation: ParsedOperation): string {
  const responses = operation.responses;
  const methodName = this.generateMethodName(operation);
  
  for (const statusCode of ['200', '201', '204']) {
    const response = responses[statusCode] as OpenAPIV3.ResponseObject;
    if (response?.content?.['application/json']?.schema) {
      const schema = response.content['application/json'].schema;
      
      // Always generate a type for inline schemas
      if (!schema.$ref && schema.type === 'object') {
        const typeName = `${this.toPascalCase(methodName)}ResponseType`;
        this.generateInlineTypeForObject(schema, typeName);
        return `${typeName}Schema`;
      }
      
      return this.getSchemaReference(schema, `${this.toPascalCase(methodName)}Response`);
    }
  }
  
  return 'z.unknown()';
}
```

2. **Fix the inferReturnType method**

```typescript
private inferReturnType(responseSchema: string): string {
  if (responseSchema === 'z.unknown()') {
    return 'Promise<unknown>';
  }
  
  // All schemas ending with 'Schema' should have a corresponding type
  if (responseSchema.endsWith('Schema')) {
    const typeName = responseSchema.replace('Schema', '');
    return `Promise<${typeName}>`;
  }
  
  // This should rarely happen now
  return 'Promise<unknown>';
}
```

3. **Remove the problematic zodSchemaToTsType logic**

The current `zodSchemaToTsType` method tries to convert Zod schemas to TypeScript types, but this is unnecessary if we always generate proper types.

## Priority 2: Fix Duplicate Hooks (Critical)

### Problem
Operations with multiple tags generate duplicate hooks, causing compilation errors.

### Solution
Use a deterministic approach based on operation context.

### Implementation

1. **Create a deduplication strategy based on operation signature**

```typescript
// In HooksGenerator
private getOperationKey(operation: ParsedOperation): string {
  // Use operationId if available, otherwise use method + path
  return operation.operationId || `${operation.method}_${operation.path}`;
}

private selectPrimaryTag(operation: ParsedOperation): string {
  if (!operation.tags || operation.tags.length === 0) {
    return 'Default';
  }
  
  // Prioritize based on path structure
  const path = operation.path.toLowerCase();
  
  // If path starts with /admin/, use Admin tag if present
  if (path.startsWith('/admin/') && operation.tags.includes('Admin')) {
    return 'Admin';
  }
  
  // Otherwise use first tag
  return operation.tags[0];
}
```

2. **Track and generate re-exports**

```typescript
async generateHooks(operations: OperationsByTag): Promise<GeneratedHook[]> {
  const operationMap = new Map<string, { primaryTag: string; operation: ParsedOperation }>();
  const hooks: GeneratedHook[] = [];
  
  // First pass: determine primary tag for each operation
  for (const [tag, tagOperations] of operations) {
    for (const operation of tagOperations) {
      const key = this.getOperationKey(operation);
      
      if (!operationMap.has(key)) {
        const primaryTag = this.selectPrimaryTag(operation);
        operationMap.set(key, { primaryTag, operation });
      }
    }
  }
  
  // Second pass: generate hooks and re-exports
  for (const [tag, tagOperations] of operations) {
    const primaryHooks: string[] = [];
    const reExports: string[] = [];
    
    for (const operation of tagOperations) {
      const key = this.getOperationKey(operation);
      const { primaryTag } = operationMap.get(key)!;
      
      if (primaryTag === tag) {
        // Generate the hook in this file
        primaryHooks.push(this.generateHook(operation, tag));
      } else {
        // Generate a re-export
        const hookName = this.generateHookName(operation);
        reExports.push(`export { ${hookName} } from './${primaryTag}';`);
      }
    }
    
    // Combine content
    const content = [
      ...imports,
      ...primaryHooks,
      reExports.length > 0 ? '\n// Re-exported hooks from other domains' : '',
      ...reExports
    ].filter(Boolean).join('\n');
    
    hooks.push({ tag, content, operations: tagOperations });
  }
  
  return hooks;
}
```

## Priority 3: File Naming (Quick Fix)

### Implementation

```typescript
// Add to generator utils
export function sanitizeTagName(tag: string): string {
  return tag
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, ''); // Remove special chars
}

// Use throughout generators
const fileName = `${sanitizeTagName(tag)}.ts`;
```

## Priority 4: ApiSDK Optimization (Optional)

Keep current implementation for now - it works and changing it might break existing code.

## Testing Strategy

### Test Case 1: Inline Response Types
```typescript
it('should generate proper types for inline response schemas', () => {
  const operation = {
    path: '/blog/posts',
    method: 'GET',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: { type: 'array' },
                meta: { type: 'object' }
              }
            }
          }
        }
      }
    }
  };
  
  const result = generator.generateEndpoint(operation);
  
  expect(result).toContain('Promise<GetBlogPostsResponseType>');
  expect(result).not.toContain('Promise<Record<string, any>>');
});
```

### Test Case 2: Multi-Tag Operations
```typescript
it('should generate hook only once for multi-tag operations', () => {
  const operations = new Map([
    ['Admin', [multiTagOperation]],
    ['Payments', [multiTagOperation]],
    ['Analytics', [multiTagOperation]]
  ]);
  
  const hooks = generator.generateHooks(operations);
  
  // Should generate actual hook in Admin (first tag)
  expect(hooks.find(h => h.tag === 'Admin').content)
    .toContain('export function useGetAdminPaymentsCustomersStats');
  
  // Should generate re-exports in other files
  expect(hooks.find(h => h.tag === 'Payments').content)
    .toContain("export { useGetAdminPaymentsCustomersStats } from './Admin'");
});
```

## Implementation Order

1. **Fix inline return types first** - This is the most visible issue
2. **Fix duplicate hooks** - This prevents compilation
3. **Fix file naming** - Quick win
4. **Skip ApiSDK optimization** - Not critical

## Success Metrics

- ✅ All generated methods have properly typed returns (no `Record<string, any>`)
- ✅ No duplicate export errors during TypeScript compilation
- ✅ Generated file names have no spaces
- ✅ All existing tests pass
- ✅ Generated code compiles without errors