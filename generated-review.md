# Generated Code Review

## Overall Assessment
The generator is working well with most issues resolved, but there are still some areas that need attention.

## ✅ Working Correctly

1. **Zod Schema Generation**: All models have proper Zod schemas with TypeScript type inference
2. **Import Structure**: Imports are correctly generated with proper paths
3. **Enum Handling**: String enums use proper `z.enum()` syntax
4. **Method Naming**: Path parameters create unique method names (e.g., `getAdminBlogPosts` vs `getAdminBlogPostsById`)
5. **ApiSDK Instantiation**: Uses correct object syntax `new ApiSDK({ baseUrl: ... })`
6. **API Instance Naming**: Correct names like `apiKeyApi` instead of `keyApiApi`
7. **Model Imports**: Post-processing adds missing schema imports

## ⚠️ Issues Found

### 1. Duplicate Hook Exports (Major)
Operations with multiple tags generate the same hook in multiple files:
- Example: `useGetAdminPaymentsCustomersStats` appears in Admin.ts, Analytics.ts, Customers.ts, and Payments.ts
- This causes TypeScript compilation errors due to ambiguous exports

### 2. Inconsistent Return Types
Some endpoints return `Promise<Record<string, any>>` instead of properly typed responses:
- `getBlogPosts()` returns `Promise<Record<string, any>>`
- `getAdminBlogPosts()` correctly returns `Promise<GetAdminBlogPostsResponseType>`
- This happens when responses have inline schemas vs referenced schemas

### 3. File Naming with Spaces
Some hook files have spaces in names:
- `Organization Invitations.ts`
- `Ticket Messages.ts`
- While functional, this isn't ideal practice

### 4. Multiple ApiSDK Instances
Each hook file creates its own ApiSDK instance, which is inefficient

## Examples of Type Issues

```typescript
// ❌ Incorrect - generic return type
getBlogPostsById(id: string | number): Promise<Record<string, any>> {
  return this.get(
    `/blog/posts/${id}`,
    z.object({
      post: GetBlogPostsByIdResponsePostTypeSchema,
    })
  );
}

// ✅ Correct - properly typed return
getAdminBlogPosts(...): Promise<GetAdminBlogPostsResponseType> {
  return this.get(`/admin/blog/posts`, GetAdminBlogPostsResponseTypeSchema, {
    queryParams: { search, filter, category, sort, page },
  });
}
```

## Recommendations

1. **Fix Duplicate Hooks**: Either deduplicate operations across tags or only generate each hook once based on operationId
2. **Fix Return Types**: Ensure all methods return properly typed Promises, not `Record<string, any>`
3. **Standardize File Names**: Replace spaces with hyphens in generated file names
4. **Optimize Hook Instances**: Consider a shared ApiSDK instance or dependency injection pattern