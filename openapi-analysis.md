# OpenAPI Specification Analysis

## Key Findings

### 1. Multiple Tags Pattern
- **59 operations** have multiple tags
- Example: `/admin/payments/customers/stats` has tags: `["Admin", "Payments", "Customers", "Analytics"]`
- This is causing the duplicate hooks issue

### 2. Inline Schema Pattern
The OpenAPI spec extensively uses inline object schemas instead of `$ref` references:

```json
{
  "responses": {
    "200": {
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              // Inline object definition
            }
          }
        }
      }
    }
  }
}
```

This is why we're getting `Promise<Record<string, any>>` return types.

### 3. Component Schemas
- Only 41 component schemas defined
- Most responses use inline schemas instead of referencing components
- This is a design choice in the OpenAPI spec, not a generator bug

### 4. Enum Values
The spec uses proper string enums:
```json
"enum": ["draft", "review", "published", "archived"]
```

And boolean literals:
```json
"enum": [false]
```

## Root Cause Analysis

### Issue 1: Duplicate Hooks
**Root Cause**: The OpenAPI spec intentionally uses multiple tags for organizational purposes. Operations like payment stats are logically part of Admin, Payments, Customers, AND Analytics domains.

**Impact**: Current generator creates the same hook in 4 different files.

### Issue 2: Inline Return Types
**Root Cause**: The OpenAPI spec defines most response schemas inline rather than as reusable components. This is valid OpenAPI but makes type generation harder.

**Impact**: Generator defaults to `Record<string, any>` for inline objects because it doesn't generate separate types for them.

## Revised Solution Approach

### For Duplicate Hooks
Instead of fighting the multi-tag design, we should:
1. **Primary Tag Strategy**: Use the first tag as the primary location
2. **Smart Re-exports**: Generate re-exports in other tag files
3. **Operation ID Priority**: Use operationId when available for deduplication

### For Inline Types
We need to:
1. **Generate Types for All Inline Schemas**: Create proper TypeScript types for every inline object
2. **Track Response Types**: Map inline schemas to generated type names
3. **Improve Type Inference**: Better handling of nested inline objects

### Example Fix for Inline Types

Current generated code:
```typescript
getBlogPosts(): Promise<Record<string, any>> {
  return this.get('/blog/posts', z.object({
    data: z.array(...),
    meta: ...
  }));
}
```

Should be:
```typescript
getBlogPosts(): Promise<GetBlogPostsResponse> {
  return this.get('/blog/posts', GetBlogPostsResponseSchema);
}
```

Where `GetBlogPostsResponse` is generated from the inline schema.

## Recommendations

1. **Respect the OpenAPI Design**: Don't try to "fix" the multi-tag pattern - it's intentional
2. **Enhance Type Generation**: Focus on properly handling inline schemas
3. **Smart Deduplication**: Use operation context (path + method) for deduplication when operationId is missing
4. **Consider OpenAPI Version**: The spec uses 3.1.1 which has some differences from 3.0.x