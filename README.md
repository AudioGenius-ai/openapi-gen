# OpenAPI Code Generator with Zod and React Query

A powerful TypeScript code generator that creates type-safe API clients from OpenAPI specifications using Zod for runtime validation and React Query for data fetching.

## Features

- 🔥 **Type-safe API clients** generated from OpenAPI specs
- 🛡️ **Runtime validation** with Zod schemas
- ⚡ **React Query hooks** for seamless data fetching
- 📁 **Organized output** with separate modules for models, endpoints, and hooks
- 🎯 **DRY design** with minimal code duplication
- 🔧 **Customizable** with flexible configuration options
- 📖 **Well-documented** generated code

## Installation

```bash
npm install -g openapi-gen
# or with yarn
yarn global add openapi-gen
# or with pnpm
pnpm add -g openapi-gen
```

## Quick Start

### 1. Initialize a new project

```bash
openapi-gen init
```

This creates an example OpenAPI specification and package.json scripts.

### 2. Generate code from your OpenAPI spec

```bash
openapi-gen generate -i openapi.json -o src/api
```

### 3. Install required dependencies

```bash
npm install zod @tanstack/react-query
```

### 4. Use the generated code

```typescript
import { useGetUser, useCreateUser } from './api/hooks';

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useGetUser(userId);
  const createUser = useCreateUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

## CLI Usage

### Generate Command

```bash
openapi-gen generate [options]
```

**Options:**
- `-i, --input <path>` - Path to OpenAPI spec file (JSON/YAML) or URL (required)
- `-o, --output <dir>` - Output directory for generated code (default: "./generated")
- `--no-hooks` - Skip generating React Query hooks
- `--base-url <url>` - Base URL for API calls
- `--client-name <name>` - Name for the API client class (default: "ApiClient")

**Examples:**

```bash
# Generate from local file
openapi-gen gen -i ./api-spec.yaml -o ./src/api

# Generate from URL
openapi-gen gen -i https://api.example.com/openapi.json -o ./src/api

# Generate without React Query hooks
openapi-gen gen -i ./spec.json -o ./src/api --no-hooks

# Generate with custom base URL
openapi-gen gen -i ./spec.json -o ./src/api --base-url https://api.staging.com
```

### Init Command

```bash
openapi-gen init [options]
```

**Options:**
- `-d, --dir <directory>` - Directory to initialize (default: ".")

## Generated Code Structure

The generator creates a well-organized structure:

```
generated/
├── models/           # Zod schemas and TypeScript types
│   ├── User.ts
│   ├── CreateUser.ts
│   └── index.ts
├── endpoints/        # API client classes grouped by tags
│   ├── UsersApi.ts
│   ├── ProductsApi.ts
│   └── index.ts
├── hooks/           # React Query hooks (optional)
│   ├── Users.ts
│   ├── Products.ts
│   ├── queryKeys.ts
│   └── index.ts
├── ApiClient.ts     # Base HTTP client with Zod validation
└── index.ts         # Main exports
```

### Models (Zod Schemas)

Each OpenAPI schema becomes a Zod schema with TypeScript types:

```typescript
// generated/models/User.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'user']),
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
```

### API Client Classes

Endpoint classes extend the base client and provide type-safe methods:

```typescript
// generated/endpoints/UsersApi.ts
import { ApiClient } from '../ApiClient';
import { UserSchema, User, CreateUserSchema, CreateUser } from '../models';

export class UsersApi extends ApiClient {
  getUsers(page?: number, limit?: number): Promise<User[]> {
    return this.get('/users', z.array(UserSchema), {
      queryParams: { page, limit }
    });
  }

  createUser(data: CreateUser): Promise<User> {
    return this.post('/users', UserSchema, {
      body: data,
      bodySchema: CreateUserSchema
    });
  }

  getUserById(id: string): Promise<User> {
    return this.get(`/users/${id}`, UserSchema);
  }
}
```

### React Query Hooks

Ready-to-use hooks for your React components:

```typescript
// generated/hooks/Users.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { UsersApi } from '../endpoints/UsersApi';

const usersApi = new UsersApi(process.env.REACT_APP_API_BASE_URL || '');

export function useGetUsers(page?: number, limit?: number) {
  return useQuery({
    queryKey: ['getUsers', page, limit],
    queryFn: () => usersApi.getUsers(page, limit),
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (variables: { email: string; name: string; role?: string }) => {
      return usersApi.createUser(variables);
    },
  });
}
```

## Configuration

### Base API Client

The generated `ApiClient` provides a robust foundation with:

- **Automatic request/response validation** using Zod schemas
- **Configurable timeouts** and headers
- **Error handling** with meaningful error messages
- **Support for all HTTP methods** (GET, POST, PUT, PATCH, DELETE)

### Environment Variables

For React applications, you can configure the base URL using environment variables:

```env
REACT_APP_API_BASE_URL=https://api.example.com/v1
```

### TypeScript Configuration

Ensure your `tsconfig.json` includes the generated code:

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

## Advanced Usage

### Custom API Client

You can extend the generated API client for custom functionality:

```typescript
import { UsersApi } from './generated';

class CustomUsersApi extends UsersApi {
  constructor(baseUrl: string, authToken: string) {
    super({
      baseUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
  }

  // Add custom methods
  async getCurrentUser(): Promise<User> {
    return this.getUserById('me');
  }
}
```

### Query Key Management

The generator creates query key factories for cache management:

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserKey } from './generated/hooks';

function InvalidateUser({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: useGetUserKey(userId) });
  };

  return <button onClick={handleInvalidate}>Refresh User</button>;
}
```

### Error Handling

The generated client includes comprehensive error handling:

```typescript
try {
  const user = await usersApi.getUserById('123');
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    // Error message includes HTTP status and response details
  }
}
```

### Custom Formatting

When using the generator programmatically, you can provide a custom
Prettier configuration via the `prettierConfig` option of `GeneratorConfig`.
This configuration is merged with the generator's defaults and applied to all
generated files.

```typescript
const generator = new CodeGenerator();

await generator.generate({
  inputPath: 'openapi.json',
  outputDir: './src/api',
  prettierConfig: {
    semi: false,
    singleQuote: false,
  },
});
```

## OpenAPI Support

This generator supports OpenAPI 3.0+ specifications and handles:

- ✅ All primitive types (string, number, boolean, array, object)
- ✅ String formats (email, uri, uuid, date-time, etc.)
- ✅ Enums and string literals
- ✅ Object validation with required/optional properties
- ✅ Array validation with min/max items
- ✅ Number validation with min/max values
- ✅ String validation with length and pattern constraints
- ✅ Union types (oneOf, anyOf)
- ✅ Intersection types (allOf)
- ✅ Reference resolution ($ref)
- ✅ Path parameters
- ✅ Query parameters
- ✅ Request/response headers
- ✅ Request body validation
- ✅ Multiple response types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Related Projects

- [Zod](https://github.com/colinhacks/zod) - TypeScript schema validation
- [TanStack Query](https://tanstack.com/query) - Data fetching library
- [OpenAPI Generator](https://openapi-generator.tech/) - Alternative code generators
- [Orval](https://orval.dev/) - Similar OpenAPI to TypeScript generator
