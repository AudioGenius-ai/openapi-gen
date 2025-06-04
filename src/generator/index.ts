import * as fs from "fs-extra";
import * as path from "path";
import { OpenAPIParser } from "../utils/openapi-parser";
import { SchemaGenerator } from "./schema-generator";
import { EndpointGenerator } from "./endpoint-generator";
import { HooksGenerator } from "./hooks-generator";
import { SdkGenerator } from "./sdk-generator";
import { format } from "prettier";

export interface GeneratorConfig {
  inputPath: string;
  outputDir: string;
  apiClientName?: string;
  baseUrl?: string;
  generateHooks?: boolean;
  prettierConfig?: any;
}

export class CodeGenerator {
  private parser: OpenAPIParser;
  private schemaGenerator: SchemaGenerator;
  private endpointGenerator: EndpointGenerator;
  private hooksGenerator: HooksGenerator;
  private sdkGenerator: SdkGenerator;
  private prettierConfig: any = {};

  constructor() {
    this.parser = new OpenAPIParser();
    this.schemaGenerator = new SchemaGenerator();
    this.endpointGenerator = new EndpointGenerator(this.parser);
    this.hooksGenerator = new HooksGenerator();
    this.sdkGenerator = new SdkGenerator();
  }

  async generate(config: GeneratorConfig): Promise<void> {
    this.prettierConfig = config.prettierConfig || {};
    console.log("🚀 Starting OpenAPI code generation...");

    // Parse OpenAPI spec
    console.log("📖 Parsing OpenAPI specification...");
    const spec = await this.parseSpec(config.inputPath);

    // Add a default tag if there are untagged operations
    if (spec.operations.some(op => !op.tags || op.tags.length === 0)) {
      if (!spec.tags.includes('default')) {
        spec.tags.push('default');
      }
    }
    
    // Create output directories
    await this.createDirectories(config.outputDir);

    // Generate schemas (Zod models)
    console.log("🔨 Generating Zod schemas...");
    await this.generateSchemas(spec.schemas, config.outputDir);

    // Generate API client base
    console.log("🌐 Generating base API client...");
    await this.generateApiClient(config.outputDir);

    // Generate endpoint classes
    console.log("⚡ Generating endpoint classes...");
    await this.generateEndpoints(spec.operations, spec.tags, config.outputDir);

    // Generate SDK wrapper
    console.log("📚 Generating SDK wrapper...");
    await this.generateSdk(spec.tags, config.outputDir);

    // Generate React Query hooks (if enabled)
    if (config.generateHooks !== false) {
      console.log("🪝 Generating React Query hooks...");
      await this.generateHooks(
        spec.operations,
        spec.tags,
        config.outputDir,
        config.baseUrl
      );
    }

    // Generate index files
    console.log("📦 Generating index files...");
    await this.generateIndexFiles(spec.schemas, spec.tags, config);

    console.log("✅ Code generation completed successfully!");
  }

  private async parseSpec(inputPath: string) {
    if (inputPath.startsWith("http")) {
      return await this.parser.parseFromUrl(inputPath);
    } else {
      return await this.parser.parseFromFile(inputPath);
    }
  }

  private async createDirectories(outputDir: string): Promise<void> {
    const dirs = [
      path.join(outputDir, "models"),
      path.join(outputDir, "endpoints"),
      path.join(outputDir, "hooks"),
    ];

    for (const dir of dirs) {
      await fs.ensureDir(dir);
    }
  }

  private async generateSchemas(
    schemas: any[],
    outputDir: string,
  ): Promise<void> {
    const modelsDir = path.join(outputDir, "models");
    const generatedSchemas = this.schemaGenerator.generateSchemas(schemas);

    for (const schema of generatedSchemas) {
      const filePath = path.join(modelsDir, `${schema.name}.ts`);
      const formattedContent = await this.formatCode(schema.content);
      await fs.writeFile(filePath, formattedContent);
    }

    // Generate models index file
    const indexContent = this.schemaGenerator.generateIndexFile(
      generatedSchemas.map((s) => s.name),
    );
    const formattedIndex = await this.formatCode(indexContent);
    await fs.writeFile(path.join(modelsDir, "index.ts"), formattedIndex);
  }

  private async generateApiClient(outputDir: string): Promise<void> {
    // Copy the base ApiClient to the output directory
    const apiClientPath = path.join(__dirname, "../../src/ApiClient.ts");
    const outputPath = path.join(outputDir, "ApiClient.ts");

    const content = await fs.readFile(apiClientPath, "utf-8");
    const formattedContent = await this.formatCode(content);
    await fs.writeFile(outputPath, formattedContent);
  }

  private async generateEndpoints(
    operations: any[],
    tags: string[],
    outputDir: string,
  ): Promise<void> {
    const endpointsDir = path.join(outputDir, "endpoints");
    const modelsDir = path.join(outputDir, "models");
    const generatedClasses: string[] = [];
    const allInlineModels: any[] = [];

    for (const tag of tags) {
      const endpoint = this.endpointGenerator.generateEndpointClasses(
        operations,
        tag,
      );
      const filePath = path.join(endpointsDir, `${endpoint.className}.ts`);
      const formattedContent = await this.formatCode(endpoint.content);
      await fs.writeFile(filePath, formattedContent);
      generatedClasses.push(endpoint.className);

      // Generate inline model files
      for (const model of endpoint.inlineModels) {
        const modelFilePath = path.join(modelsDir, `${model.name}.ts`);
        const formattedModelContent = await this.formatCode(model.content);
        await fs.writeFile(modelFilePath, formattedModelContent);
        allInlineModels.push(model);
      }
    }

    // Generate endpoints index file
    const indexContent =
      this.endpointGenerator.generateIndexFile(generatedClasses);
    const formattedIndex = await this.formatCode(indexContent);
    await fs.writeFile(path.join(endpointsDir, "index.ts"), formattedIndex);

    // Update models index to include inline models
    if (allInlineModels.length > 0) {
      await this.updateModelsIndex(modelsDir, allInlineModels);
    }

    // Post-process model files to fix missing schema imports
    await this.fixModelImports(modelsDir);
  }

  private async updateModelsIndex(modelsDir: string, inlineModels: any[]): Promise<void> {
    const indexPath = path.join(modelsDir, "index.ts");
    let indexContent = "";
    
    try {
      indexContent = await fs.readFile(indexPath, "utf-8");
    } catch (error) {
      // File doesn't exist yet, start with empty content
    }

    // Add exports for inline models
    const inlineModelExports = inlineModels.map(model => `export * from "./${model.name}";`);
    const newExports = inlineModelExports.join("\n");
    
    if (indexContent) {
      indexContent += "\n" + newExports + "\n";
    } else {
      indexContent = newExports + "\n";
    }

    const formattedIndex = await this.formatCode(indexContent);
    await fs.writeFile(indexPath, formattedIndex);
  }

  private async fixModelImports(modelsDir: string): Promise<void> {
    // Get all model files
    const files = await fs.readdir(modelsDir);
    const modelFiles = files.filter(file => file.endsWith('.ts') && file !== 'index.ts');
    
    // Create a map of all available schemas
    const availableSchemas = new Set<string>();
    for (const file of modelFiles) {
      const fileName = file.replace('.ts', '');
      availableSchemas.add(`${fileName}Schema`);
    }

    // Process each model file
    for (const file of modelFiles) {
      const filePath = path.join(modelsDir, file);
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Find schema references that are not imported
      const schemaReferences = new Set<string>();
      const schemaPattern = /([A-Z][A-Za-z0-9]*Schema)\b/g;
      let match;
      
      while ((match = schemaPattern.exec(content)) !== null) {
        const schemaName = match[1];
        if (availableSchemas.has(schemaName)) {
          const typeName = schemaName.replace('Schema', '');
          // Don't import self-references
          if (typeName !== file.replace('.ts', '')) {
            schemaReferences.add(typeName);
          }
        }
      }

      // Add missing imports
      if (schemaReferences.size > 0) {
        const existingImports = content.match(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];/g) || [];
        const existingImportedTypes = new Set<string>();
        
        existingImports.forEach(importStatement => {
          const matches = importStatement.match(/{\s*([^}]+)\s*}/);
          if (matches) {
            const imports = matches[1].split(',').map(imp => imp.trim());
            imports.forEach(imp => existingImportedTypes.add(imp));
          }
        });

        const missingImports: string[] = [];
        schemaReferences.forEach(typeName => {
          const schemaName = `${typeName}Schema`;
          if (!existingImportedTypes.has(schemaName)) {
            missingImports.push(`import { ${schemaName} } from './${typeName}';`);
          }
        });

        if (missingImports.length > 0) {
          // Find the last import statement
          const importLines = content.split('\n');
          let lastImportIndex = -1;
          
          for (let i = 0; i < importLines.length; i++) {
            if (importLines[i].trim().startsWith('import ')) {
              lastImportIndex = i;
            }
          }

          // Insert new imports after the last existing import
          if (lastImportIndex >= 0) {
            importLines.splice(lastImportIndex + 1, 0, ...missingImports);
            content = importLines.join('\n');
          } else {
            // No existing imports, add at the beginning
            content = missingImports.join('\n') + '\n' + content;
          }

          const formattedContent = await this.formatCode(content);
          await fs.writeFile(filePath, formattedContent);
        }
      }
    }
  }

  private async generateSdk(tags: string[], outputDir: string): Promise<void> {
    const classNames = tags.map((tag) => this.parser.generateClassName(tag));
    const sdkContent = this.sdkGenerator.generateSdk(classNames);
    const formatted = await this.formatCode(sdkContent);
    await fs.writeFile(path.join(outputDir, "ApiSDK.ts"), formatted);
  }

  private async generateHooks(
    operations: any[],
    tags: string[],
    outputDir: string,
    baseUrl?: string
  ): Promise<void> {
    const hooksDir = path.join(outputDir, "hooks");

    for (const tag of tags) {
      const tagOperations = operations.filter(op => {
        if (!op.tags || op.tags.length === 0) {
          return tag === 'default';
        }
        return op.tags.includes(tag);
      });
      const className = this.parser.generateClassName(tag);

      // Generate the actual endpoint methods info
      const endpoint = this.endpointGenerator.generateEndpointClasses(
        operations,
        tag,
      );

      // Use the endpoint generator to create the actual methods
      const methods = tagOperations.map((operation) => {
        return this.endpointGenerator.generateMethod(operation);
      });

      const hooksFile = this.hooksGenerator.generateHooksForTag(
        tagOperations,
        tag,
        className,
        methods,
        baseUrl
      );

      const filePath = path.join(hooksDir, `${tag}.ts`);
      const formattedContent = await this.formatCode(hooksFile.content);
      await fs.writeFile(filePath, formattedContent);
    }

    // Generate query keys file
    const queryKeysContent = this.hooksGenerator.generateQueryKeys(operations);
    const formattedQueryKeys = await this.formatCode(queryKeysContent);
    await fs.writeFile(path.join(hooksDir, "queryKeys.ts"), formattedQueryKeys);

    // Generate hooks index file
    const indexContent = this.hooksGenerator.generateIndexFile(tags);
    const formattedIndex = await this.formatCode(indexContent);
    await fs.writeFile(path.join(hooksDir, "index.ts"), formattedIndex);
  }

  private async generateIndexFiles(
    schemas: any[],
    tags: string[],
    config: GeneratorConfig,
  ): Promise<void> {
    const mainIndexContent = `// Generated API Client
export * from './ApiClient';
export * from './models';
export * from './endpoints';
export * from './ApiSDK';
${config.generateHooks !== false ? "export * from './hooks';" : ""}
`;

    const formattedMainIndex = await this.formatCode(mainIndexContent);
    await fs.writeFile(
      path.join(config.outputDir, "index.ts"),
      formattedMainIndex,
    );
  }

  private async formatCode(code: string): Promise<string> {
    try {
      return format(code, {
        parser: "typescript",
        singleQuote: true,
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        ...this.prettierConfig,
      });
    } catch (error) {
      console.warn("⚠️  Failed to format code, using unformatted version");
      return code;
    }
  }
}