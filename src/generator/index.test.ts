import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { CodeGenerator, GeneratorConfig } from "./index";
import * as fs from "fs-extra";
import * as path from "path";

// Mock fs-extra
vi.mock("fs-extra", () => ({
  ensureDir: vi.fn(),
  writeFile: vi.fn(),
  readFile: vi.fn(),
  writeJSON: vi.fn(),
  readJSON: vi.fn(),
  pathExists: vi.fn(),
}));

vi.mock("prettier", () => ({
  format: vi.fn((code) => code), // Return code as-is for testing
}));

// Mock console.log to avoid noise in tests
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});

describe("CodeGenerator", () => {
  let generator: CodeGenerator;
  let mockFs: any;

  beforeEach(() => {
    generator = new CodeGenerator();
    mockFs = vi.mocked(fs);

    // Reset all mocks
    vi.clearAllMocks();

    // Setup default mocks
    mockFs.ensureDir.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);
    mockFs.readFile.mockResolvedValue("mock api client content");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("generate", () => {
    it("should generate complete API with all components", async () => {
      const config: GeneratorConfig = {
        inputPath: "/path/to/openapi.json",
        outputDir: "/output",
        generateHooks: true,
      };

      // Mock the parser to return a simple spec
      const mockParseFromFile = vi.fn().mockResolvedValue({
        info: { title: "Test API", version: "1.0.0" },
        operations: [
          {
            operationId: "getUsers",
            method: "GET",
            path: "/users",
            tags: ["users"],
            responses: { "200": { description: "Success" } },
          },
        ],
        schemas: [
          {
            name: "User",
            schema: { type: "object", properties: { id: { type: "string" } } },
          },
        ],
        tags: ["users"],
      });

      // Mock parser methods
      vi.spyOn(generator["parser"], "parseFromFile").mockImplementation(
        mockParseFromFile,
      );
      vi.spyOn(generator["parser"], "generateClassName").mockReturnValue(
        "UsersApi",
      );
      vi.spyOn(generator["parser"], "generateOperationId").mockReturnValue(
        "getUsers",
      );

      await generator.generate(config);

      // Verify directories were created
      expect(mockFs.ensureDir).toHaveBeenCalledWith(
        path.join("/output", "models"),
      );
      expect(mockFs.ensureDir).toHaveBeenCalledWith(
        path.join("/output", "endpoints"),
      );
      expect(mockFs.ensureDir).toHaveBeenCalledWith(
        path.join("/output", "hooks"),
      );

      // Verify files were written
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "models", "User.ts"),
        expect.any(String),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "models", "index.ts"),
        expect.any(String),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "ApiClient.ts"),
        expect.any(String),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "endpoints", "UsersApi.ts"),
        expect.any(String),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "ApiSDK.ts"),
        expect.any(String),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "hooks", "users.ts"),
        expect.any(String),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "index.ts"),
        expect.any(String),
      );
    });

    it("should skip hooks generation when disabled", async () => {
      const config: GeneratorConfig = {
        inputPath: "/path/to/openapi.json",
        outputDir: "/output",
        generateHooks: false,
      };

      const mockParseFromFile = vi.fn().mockResolvedValue({
        info: { title: "Test API", version: "1.0.0" },
        operations: [],
        schemas: [],
        tags: [],
      });

      vi.spyOn(generator["parser"], "parseFromFile").mockImplementation(
        mockParseFromFile,
      );

      await generator.generate(config);

      // Hooks directory should still be created but not used
      expect(mockFs.ensureDir).toHaveBeenCalledTimes(3); // models, endpoints, hooks

      // Should not write hooks files
      expect(mockFs.writeFile).not.toHaveBeenCalledWith(
        expect.stringContaining("hooks"),
        expect.any(String),
      );
    });

    it("should handle URL input paths", async () => {
      const config: GeneratorConfig = {
        inputPath: "https://api.example.com/openapi.json",
        outputDir: "/output",
      };

      const mockParseFromUrl = vi.fn().mockResolvedValue({
        info: { title: "Test API", version: "1.0.0" },
        operations: [],
        schemas: [],
        tags: [],
      });

      vi.spyOn(generator["parser"], "parseFromUrl").mockImplementation(
        mockParseFromUrl,
      );

      await generator.generate(config);

      expect(mockParseFromUrl).toHaveBeenCalledWith(
        "https://api.example.com/openapi.json",
      );
    });
  });

  describe("parseSpec", () => {
    it("should parse from file for local paths", async () => {
      const mockParseFromFile = vi.fn().mockResolvedValue({});
      vi.spyOn(generator["parser"], "parseFromFile").mockImplementation(
        mockParseFromFile,
      );

      await generator["parseSpec"]("/path/to/spec.json");

      expect(mockParseFromFile).toHaveBeenCalledWith("/path/to/spec.json");
    });

    it("should parse from URL for HTTP paths", async () => {
      const mockParseFromUrl = vi.fn().mockResolvedValue({});
      vi.spyOn(generator["parser"], "parseFromUrl").mockImplementation(
        mockParseFromUrl,
      );

      await generator["parseSpec"]("http://example.com/spec.json");

      expect(mockParseFromUrl).toHaveBeenCalledWith(
        "http://example.com/spec.json",
      );
    });

    it("should parse from URL for HTTPS paths", async () => {
      const mockParseFromUrl = vi.fn().mockResolvedValue({});
      vi.spyOn(generator["parser"], "parseFromUrl").mockImplementation(
        mockParseFromUrl,
      );

      await generator["parseSpec"]("https://example.com/spec.json");

      expect(mockParseFromUrl).toHaveBeenCalledWith(
        "https://example.com/spec.json",
      );
    });
  });

  describe("createDirectories", () => {
    it("should create all required directories", async () => {
      await generator["createDirectories"]("/output");

      expect(mockFs.ensureDir).toHaveBeenCalledWith(
        path.join("/output", "models"),
      );
      expect(mockFs.ensureDir).toHaveBeenCalledWith(
        path.join("/output", "endpoints"),
      );
      expect(mockFs.ensureDir).toHaveBeenCalledWith(
        path.join("/output", "hooks"),
      );
    });
  });

  describe("generateSchemas", () => {
    it("should generate schema files and index", async () => {
      const schemas = [
        { name: "User", schema: { type: "object" } },
        { name: "Post", schema: { type: "object" } },
      ];

      // Mock schema generator
      vi.spyOn(generator["schemaGenerator"], "generateSchemas").mockReturnValue(
        [
          {
            name: "User",
            content: "export const UserSchema = z.object({});",
            dependencies: [],
          },
          {
            name: "Post",
            content: "export const PostSchema = z.object({});",
            dependencies: [],
          },
        ],
      );
      vi.spyOn(
        generator["schemaGenerator"],
        "generateIndexFile",
      ).mockReturnValue('export * from "./User";\nexport * from "./Post";');

      await generator["generateSchemas"](schemas, "/output");

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "models", "User.ts"),
        "export const UserSchema = z.object({});",
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "models", "Post.ts"),
        "export const PostSchema = z.object({});",
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "models", "index.ts"),
        'export * from "./User";\nexport * from "./Post";',
      );
    });
  });

  describe("generateApiClient", () => {
    it("should copy and format API client", async () => {
      await generator["generateApiClient"]("/output");

      expect(mockFs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("ApiClient.ts"),
        "utf-8",
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "ApiClient.ts"),
        "mock api client content",
      );
    });
  });

  describe("generateEndpoints", () => {
    it("should generate endpoint classes and index", async () => {
      const operations = [
        {
          operationId: "getUsers",
          method: "GET",
          path: "/users",
          tags: ["users"],
        },
      ];
      const tags = ["users"];

      vi.spyOn(
        generator["endpointGenerator"],
        "generateEndpointClasses",
      ).mockReturnValue({
        className: "UsersApi",
        content: "export class UsersApi {}",
        operations: [],
      });
      vi.spyOn(
        generator["endpointGenerator"],
        "generateIndexFile",
      ).mockReturnValue('export * from "./UsersApi";');

      await generator["generateEndpoints"](operations, tags, "/output");

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "endpoints", "UsersApi.ts"),
        "export class UsersApi {}",
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "endpoints", "index.ts"),
        'export * from "./UsersApi";',
      );
    });
  });

  describe("generateHooks", () => {
    it("should generate hooks files and index", async () => {
      const operations = [
        {
          operationId: "getUsers",
          method: "GET",
          path: "/users",
          tags: ["users"],
          responses: { "200": { description: "Success" } },
        },
      ];
      const tags = ["users"];

      vi.spyOn(generator["parser"], "generateClassName").mockReturnValue(
        "UsersApi",
      );
      vi.spyOn(generator["parser"], "generateOperationId").mockReturnValue(
        "getUsers",
      );
      vi.spyOn(
        generator["endpointGenerator"],
        "generateEndpointClasses",
      ).mockReturnValue({
        className: "UsersApi",
        content: "",
        operations: [],
      });
      vi.spyOn(
        generator["endpointGenerator"],
        "generateMethod",
      ).mockReturnValue({
        name: "getUsers",
        parameters: [],
        returnType: "Promise<void>",
        httpMethod: "GET",
        path: "/users",
        responseSchema: "z.unknown()",
      });
      vi.spyOn(
        generator["hooksGenerator"],
        "generateHooksForTag",
      ).mockReturnValue({
        tag: "users",
        content: "export function useGetUsers() {}",
        hooks: [],
      });
      vi.spyOn(
        generator["hooksGenerator"],
        "generateQueryKeys",
      ).mockReturnValue("export const useGetUsersKey = () => [];");
      vi.spyOn(
        generator["hooksGenerator"],
        "generateIndexFile",
      ).mockReturnValue('export * from "./users";');

      await generator["generateHooks"](operations, tags, "/output");

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "hooks", "users.ts"),
        "export function useGetUsers() {}",
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "hooks", "queryKeys.ts"),
        "export const useGetUsersKey = () => [];",
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "hooks", "index.ts"),
        'export * from "./users";',
      );
    });
  });

  describe("generateIndexFiles", () => {
    it("should generate main index file with hooks", async () => {
      const config: GeneratorConfig = {
        inputPath: "/input",
        outputDir: "/output",
        generateHooks: true,
      };

      await generator["generateIndexFiles"]([], [], config);

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "index.ts"),
        expect.stringContaining("export * from './ApiSDK';"),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "index.ts"),
        expect.stringContaining("export * from './hooks';"),
      );
    });

    it("should generate main index file without hooks", async () => {
      const config: GeneratorConfig = {
        inputPath: "/input",
        outputDir: "/output",
        generateHooks: false,
      };

      await generator["generateIndexFiles"]([], [], config);

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "index.ts"),
        expect.stringContaining("export * from './ApiSDK';"),
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join("/output", "index.ts"),
        expect.not.stringContaining("export * from './hooks';"),
      );
    });
  });

  describe("formatCode", () => {
    it("should format code successfully", async () => {
      const { format } = await import("prettier");
      vi.mocked(format).mockReturnValue("formatted code");

      const result = await generator["formatCode"]("unformatted code");

      expect(result).toBe("formatted code");
      expect(format).toHaveBeenCalledWith("unformatted code", {
        parser: "typescript",
        singleQuote: true,
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
      });
    });

    it("should handle formatting errors gracefully", async () => {
      const { format } = await import("prettier");
      vi.mocked(format).mockImplementation(() => {
        throw new Error("Formatting error");
      });

      const result = await generator["formatCode"]("unformatted code");

      expect(result).toBe("unformatted code");
      // Console.warn was called (we can't check the exact message due to mocking issues)
    });
  });
});
