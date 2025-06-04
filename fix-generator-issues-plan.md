# Comprehensive Plan to Fix OpenAPI Generator Issues

## Overview
This plan addresses the four main issues identified in the generated code review:
1. Duplicate hook exports (Critical)
2. Inconsistent return types (High)
3. File naming with spaces (Medium)
4. Multiple ApiSDK instances (Low)

## Issue 1: Duplicate Hook Exports (Critical)

### Problem
Operations with multiple tags generate the same hook in multiple files, causing TypeScript compilation errors.

### Root Cause
In the OpenAPI spec, operations can have multiple tags (e.g., `["Admin", "Payments", "Customers"]`), and the current generator creates hooks in each tag's file.

### Solution Options

#### Option A: Operation Deduplication (Recommended)
- Generate each hook only once based on operationId
- Place hooks in the first tag's file or a primary tag
- Other tag files can re-export from the primary location

#### Option B: Namespace by Tag
- Generate hooks with tag-prefixed names
- Example: `useAdminGetPaymentsCustomersStats`, `usePaymentsGetPaymentsCustomersStats`
- Downside: Verbose naming and confusion

#### Option C: Single Hooks File
- Generate all hooks in a single file regardless of tags
- Downside: Loss of organization by domain

### Implementation Plan for Option A
1. **Track generated operations by operationId**
   ```typescript
   // In HooksGenerator
   private generatedOperations = new Map<string, string>(); // operationId -> tagName
   ```

2. **Check before generating**
   ```typescript
   // Before generating a hook
   if (this.generatedOperations.has(operation.operationId)) {
     // Skip or create re-export
     continue;
   }
   this.generatedOperations.set(operation.operationId, tagName);
   ```

3. **Create re-exports for secondary tags**
   ```typescript
   // In secondary tag files
   export { useGetAdminPaymentsCustomersStats } from './Admin';
   ```

## Issue 2: Inconsistent Return Types (High)

### Problem
Methods return `Promise<Record<string, any>>` for inline object schemas instead of properly typed responses.

### Root Cause
The `zodSchemaToTsType` method returns `Record<string, any>` when it encounters `z.object()`.

### Solution
Enhance the type inference system to handle inline objects properly.

### Implementation Plan
1. **Track inline response types during schema generation**
   ```typescript
   // When generating inline schemas, store the type name
   private inlineResponseTypes = new Map<string, string>(); // schemaString -> TypeName
   ```

2. **Improve zodSchemaToTsType method**
   ```typescript
   private zodSchemaToTsType(zodSchema: string, context?: string): string {
     // Check if this is an inline type we generated
     if (zodSchema.startsWith('z.object(') && context) {
       // Generate and track inline type
       const typeName = this.generateInlineTypeForObject(schema, context);
       return typeName;
     }
     // ... existing logic
   }
   ```

3. **Alternative: Use Zod's TypeScript inference**
   ```typescript
   // Instead of manually mapping, use z.infer
   type ResponseType = z.infer<typeof responseSchema>;
   ```

## Issue 3: File Naming with Spaces (Medium)

### Problem
Files like "Organization Invitations.ts" have spaces, which isn't ideal practice.

### Root Cause
Tag names with spaces are used directly as file names.

### Solution
Sanitize file names by replacing spaces and special characters.

### Implementation Plan
1. **Add file name sanitization utility**
   ```typescript
   private sanitizeFileName(name: string): string {
     return name
       .replace(/\s+/g, '-')           // Replace spaces with hyphens
       .replace(/[^a-zA-Z0-9-]/g, '')  // Remove special characters
       .replace(/--+/g, '-')           // Replace multiple hyphens with single
       .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
   }
   ```

2. **Apply to all file generation**
   - Endpoint files: `${this.sanitizeFileName(tag)}Api.ts`
   - Hook files: `${this.sanitizeFileName(tag)}.ts`
   - Update imports accordingly

## Issue 4: Multiple ApiSDK Instances (Low)

### Problem
Each hook file creates its own ApiSDK instance, which is inefficient.

### Root Cause
Current design instantiates ApiSDK in each hook file.

### Solution Options

#### Option A: Singleton Pattern
- Create a single shared instance
- Export from a separate file

#### Option B: Dependency Injection
- Pass ApiSDK instance to hooks
- More flexible but requires API changes

#### Option C: Factory Pattern (Recommended)
- Create a factory that returns cached instances
- Allows for multiple configurations if needed

### Implementation Plan for Option C
1. **Create ApiSDK factory**
   ```typescript
   // generated/apiSdkFactory.ts
   let cachedInstance: ApiSDK | null = null;
   
   export function getApiSDK(baseUrl?: string): ApiSDK {
     if (!cachedInstance || baseUrl) {
       cachedInstance = new ApiSDK({ 
         baseUrl: baseUrl || process.env.NEXT_PUBLIC_API_URL || '' 
       });
     }
     return cachedInstance;
   }
   ```

2. **Update hook generation**
   ```typescript
   // In each hook
   const apiSDK = getApiSDK(baseUrl);
   ```

## Implementation Priority

### Phase 1: Critical Fixes (1-2 days)
1. Fix duplicate hook exports (Issue 1)
2. Fix inconsistent return types (Issue 2)

### Phase 2: Quality Improvements (1 day)
3. Standardize file naming (Issue 3)
4. Add comprehensive tests

### Phase 3: Optimization (Optional)
5. Optimize ApiSDK instances (Issue 4)

## Testing Strategy

### Unit Tests
- Test operation deduplication logic
- Test type inference for various schema types
- Test file name sanitization

### Integration Tests
- Generate code from sample OpenAPI specs
- Verify no duplicate exports
- Verify all return types are properly typed
- Compile generated TypeScript code

### E2E Tests
- Generate from real OpenAPI spec
- Use generated code in a sample application
- Verify React Query hooks work correctly

## Success Criteria
1. ✅ No TypeScript compilation errors due to duplicate exports
2. ✅ All methods return properly typed Promises (no `Record<string, any>`)
3. ✅ Generated file names contain no spaces or special characters
4. ✅ Efficient ApiSDK instance management
5. ✅ All existing functionality preserved
6. ✅ Comprehensive test coverage for new changes

## Rollback Plan
- Keep original generator code in a separate branch
- Add feature flags for new behavior if needed
- Maintain backward compatibility where possible