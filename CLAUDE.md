# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `pnpm build` - Compile TypeScript to dist/
- `pnpm dev` - Run CLI in development mode
- `pnpm generate` - Alias for dev command
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run ESLint on src files
- `pnpm format` - Format code with Prettier

### Testing
- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:coverage` - Run tests with coverage report

### CLI Usage
- `pnpm generate-api` - Generate API code from openapi.json to src/api
- `pnpm generate-api-dev` - Generate with localhost base URL
- `openapi-gen generate -i <spec> -o <output>` - Generate code from OpenAPI spec
- `openapi-gen init` - Initialize project with example configuration

## Code Architecture

### Core Generator Pipeline
The code generation follows a multi-stage pipeline orchestrated by `CodeGenerator`:

1. **OpenAPIParser** (`src/utils/openapi-parser.ts`) - Parses and validates OpenAPI specs from files/URLs, extracts operations, schemas, and tags
2. **SchemaGenerator** (`src/generator/schema-generator.ts`) - Converts OpenAPI schemas to Zod validation schemas with TypeScript types
3. **EndpointGenerator** (`src/generator/endpoint-generator.ts`) - Creates API client classes grouped by tags, extending the base ApiClient
4. **HooksGenerator** (`src/generator/hooks-generator.ts`) - Generates React Query hooks for data fetching with query key management
5. **ApiClient** (`src/ApiClient.ts`) - Base HTTP client with Zod validation, timeout handling, and error management

### Generated Code Structure
Output is organized into modules:
- `models/` - Zod schemas and TypeScript types from OpenAPI components
- `endpoints/` - API client classes grouped by OpenAPI tags  
- `hooks/` - React Query hooks with query keys and mutations
- `ApiClient.ts` - Base client copied to output directory
- `index.ts` - Main exports barrel file

### Key Design Patterns
- **Validation-First**: All requests/responses validated with Zod schemas
- **Tag-Based Grouping**: Operations grouped by OpenAPI tags into separate classes
- **Type Safety**: Full TypeScript types inferred from Zod schemas
- **Extensible Base**: ApiClient can be extended for custom auth/headers
- **React Query Integration**: Hooks follow TanStack Query patterns with proper cache keys

### CLI Architecture
- `src/cli.ts` - Commander.js CLI with generate and init commands
- `src/index.ts` - Library exports for programmatic usage
- Supports both file paths and URLs for OpenAPI specs
- Configurable output directories and base URLs
- Optional React Query hooks generation

### Testing Strategy
The project uses Vitest with test files co-located as `*.test.ts`. Test the generators by:
- Parsing sample OpenAPI specs
- Validating generated code structure
- Checking Zod schema generation
- Verifying endpoint class creation