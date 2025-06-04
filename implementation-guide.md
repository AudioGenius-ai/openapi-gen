# Detailed Implementation Guide

## Issue 1: Duplicate Hook Exports - Implementation Details

### Step 1: Modify HooksGenerator to track operations

```typescript
// src/generator/hooks-generator.ts

export interface HooksGeneratorOptions {
  // existing options...
}

export class HooksGenerator {
  private generatedOperations = new Map<string, { tag: string; hookName: string }>();
  private reExports = new Map<string, string[]>(); // tagName -> array of re-export statements

  // ... existing code ...
}
```

### Step 2: Update hook generation logic

```typescript
private generateHooksForTag(tag: string, operations: ParsedOperation[]): string {
  const hooks: string[] = [];
  const imports = new Set<string>();
  
  operations.forEach(operation => {
    const hookName = this.generateHookName(operation);
    
    // Check if this operation was already generated
    const existingHook = this.generatedOperations.get(operation.operationId || hookName);
    if (existingHook && existingHook.tag !== tag) {
      // Add re-export instead of regenerating
      const reExportStatement = `export { ${hookName} } from './${existingHook.tag}';`;
      const tagReExports = this.reExports.get(tag) || [];
      tagReExports.push(reExportStatement);
      this.reExports.set(tag, tagReExports);
      return;
    }
    
    // Mark as generated
    this.generatedOperations.set(operation.operationId || hookName, { tag, hookName });
    
    // Generate hook as normal
    const hook = this.generateHook(operation, tag);
    hooks.push(hook);
  });
  
  // Add re-exports at the end of the file
  const reExports = this.reExports.get(tag) || [];
  
  return `${imports}${hooks.join('\n\n')}${reExports.length > 0 ? '\n\n// Re-exports from other tags\n' + reExports.join('\n') : ''}`;
}
```

### Step 3: Prioritize primary tags

```typescript
private determinePrimaryTag(operation: ParsedOperation): string {
  // Priority order for tags
  const tagPriority = ['Default', 'Admin', 'Users', 'Organizations'];
  
  if (operation.tags && operation.tags.length > 0) {
    // Check if any high-priority tag exists
    for (const priorityTag of tagPriority) {
      if (operation.tags.includes(priorityTag)) {
        return priorityTag;
      }
    }
    // Otherwise use first tag
    return operation.tags[0];
  }
  
  return 'Default';
}
```

## Issue 2: Inconsistent Return Types - Implementation Details

### Step 1: Enhance type tracking in EndpointGenerator

```typescript
// src/generator/endpoint-generator.ts

export class EndpointGenerator {
  private inlineModels = new Map<string, InlineModel>();
  private responseTypeMap = new Map<string, string>(); // schema representation -> TypeName
  
  // ... existing code ...
}
```

### Step 2: Improve response type generation

```typescript
private getResponseSchema(operation: ParsedOperation): string {
  const responses = operation.responses;
  const methodName = this.generateMethodName(operation);
  
  // Try to get 200, 201, or first successful response
  for (const statusCode of ['200', '201', '204']) {
    const response = responses[statusCode] as OpenAPIV3.ResponseObject;
    if (response?.content?.['application/json']?.schema) {
      const schema = response.content['application/json'].schema;
      const context = `${this.toPascalCase(methodName)}ResponseType`;
      
      // Generate schema and track the type
      const schemaRef = this.getSchemaReference(schema, context);
      
      // If it's an inline object, ensure we track its type
      if (schema.type === 'object' && !schema.$ref) {
        this.responseTypeMap.set(schemaRef, context);
      }
      
      return schemaRef;
    }
  }
  
  return 'z.unknown()';
}
```

### Step 3: Fix zodSchemaToTsType method

```typescript
private zodSchemaToTsType(zodSchema: string, context?: string): string {
  // Check if we have a tracked type for this schema
  const trackedType = this.responseTypeMap.get(zodSchema);
  if (trackedType) {
    return trackedType;
  }
  
  // Check for inline type references first
  if (zodSchema.endsWith('Schema')) {
    const typeName = zodSchema.replace('Schema', '');
    return typeName;
  }
  
  // Object types - try to infer the type name
  if (zodSchema.startsWith('z.object(')) {
    // If we have context, generate proper type
    if (context) {
      const typeName = context.endsWith('Type') ? context : `${context}Type`;
      // Store for future reference
      this.responseTypeMap.set(zodSchema, typeName);
      return typeName;
    }
    // Last resort - analyze the schema structure
    return this.inferObjectType(zodSchema) || 'Record<string, any>';
  }
  
  // ... rest of existing logic ...
}

private inferObjectType(zodSchema: string): string | null {
  // Try to extract type information from the schema
  // This is a simplified approach - in production, use a proper parser
  const match = zodSchema.match(/z\.object\(\{([^}]+)\}\)/);
  if (match) {
    // Analyze properties to generate a meaningful type name
    const properties = match[1];
    if (properties.includes('user:') || properties.includes('userId:')) {
      return 'UserResponse';
    }
    if (properties.includes('token:')) {
      return 'AuthResponse';
    }
    // Add more patterns as needed
  }
  return null;
}
```

## Issue 3: File Naming - Implementation Details

### Step 1: Add sanitization utility

```typescript
// src/utils/file-utils.ts

export function sanitizeFileName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, '-')              // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-_]/g, '')    // Remove special characters except - and _
    .replace(/--+/g, '-')              // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '')           // Remove leading/trailing hyphens
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add hyphen before capital letters
    .toLowerCase();                     // Convert to lowercase for consistency
}

export function sanitizeClassName(name: string): string {
  return name
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
```

### Step 2: Update file generation

```typescript
// In HooksGenerator
async generateHooks(operations: OperationsByTag): Promise<GeneratedHook[]> {
  const hooks: GeneratedHook[] = [];
  
  for (const [tag, tagOperations] of operations) {
    const sanitizedTag = sanitizeFileName(tag);
    const content = this.generateHooksForTag(tag, tagOperations);
    
    hooks.push({
      tag: sanitizedTag,  // Use sanitized name for file
      originalTag: tag,   // Keep original for display/imports
      content,
      operations: tagOperations,
    });
  }
  
  return hooks;
}
```

### Step 3: Update import generation

```typescript
// Update import paths to use sanitized names
private generateImports(): string {
  const imports: string[] = [];
  
  // When importing from other files, use sanitized names
  imports.push(`import { ${classNames.join(', ')} } from './endpoints/${sanitizeFileName(tag)}Api';`);
  
  return imports.join('\n');
}
```

## Issue 4: ApiSDK Instance Optimization - Implementation Details

### Step 1: Create factory module

```typescript
// src/generator/templates/apiSdkFactory.ts.template

import { ApiSDK } from './ApiSDK';
import type { ApiClientConfig } from './ApiClient';

const instances = new Map<string, ApiSDK>();

export interface ApiSDKFactoryOptions extends Partial<ApiClientConfig> {
  instanceKey?: string;
}

export function getApiSDK(options: ApiSDKFactoryOptions = {}): ApiSDK {
  const {
    instanceKey = 'default',
    baseUrl = process.env.NEXT_PUBLIC_API_URL || '',
    ...config
  } = options;
  
  const key = `${instanceKey}-${baseUrl}`;
  
  if (!instances.has(key)) {
    instances.set(key, new ApiSDK({ baseUrl, ...config }));
  }
  
  return instances.get(key)!;
}

export function clearApiSDKInstances(): void {
  instances.clear();
}
```

### Step 2: Update hook template

```typescript
// In HooksGenerator - update hook template
private generateQueryHook(operation: ParsedOperation, apiInstance: string): string {
  return `
export function ${hookName}(
  params?: ${paramsType},
  options?: Omit<UseQueryOptions<${returnType}, Error>, 'queryKey' | 'queryFn'>,
  baseUrl?: string
) {
  const apiSDK = getApiSDK({ baseUrl });
  
  return useQuery({
    queryKey: ${queryKey},
    queryFn: async () => {
      return ${apiInstance}.${methodName}(${args});
    },
    ...options,
  });
}`;
}
```

### Step 3: Add configuration options

```typescript
// Allow users to choose instance strategy
export interface GeneratorConfig {
  // ... existing config ...
  apiInstanceStrategy?: 'singleton' | 'factory' | 'per-hook';
}
```

## Testing Implementation

### Create test fixtures

```typescript
// src/generator/__tests__/fixtures/multi-tag-openapi.json
{
  "openapi": "3.0.0",
  "paths": {
    "/admin/users": {
      "get": {
        "operationId": "getAdminUsers",
        "tags": ["Admin", "Users"],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "users": { "type": "array" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Add test cases

```typescript
// src/generator/__tests__/hooks-generator.test.ts

describe('HooksGenerator - Duplicate Prevention', () => {
  it('should generate hook only once for multi-tag operations', async () => {
    const generator = new HooksGenerator();
    const operations = parseMultiTagSpec();
    
    const hooks = await generator.generateHooks(operations);
    
    // Check that hook is only generated once
    const adminHooks = hooks.find(h => h.tag === 'Admin');
    const userHooks = hooks.find(h => h.tag === 'Users');
    
    expect(adminHooks.content).toContain('export function useGetAdminUsers');
    expect(userHooks.content).toContain("export { useGetAdminUsers } from './Admin'");
  });
});
```