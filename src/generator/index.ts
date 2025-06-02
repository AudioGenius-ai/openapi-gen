import * as fs from 'fs-extra';
import * as path from 'path';
import { OpenAPIParser } from '../utils/openapi-parser';
import { SchemaGenerator } from './schema-generator';
import { EndpointGenerator } from './endpoint-generator';
import { HooksGenerator } from './hooks-generator';
import { format } from 'prettier';

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

  constructor() {
    this.parser = new OpenAPIParser();
    this.schemaGenerator = new SchemaGenerator();
    this.endpointGenerator = new EndpointGenerator(this.parser);
    this.hooksGenerator = new HooksGenerator();
  }

  async generate(config: GeneratorConfig): Promise<void> {
    console.log('🚀 Starting OpenAPI code generation...');
    
    // Parse OpenAPI spec
    console.log('📖 Parsing OpenAPI specification...');
    const spec = await this.parseSpec(config.inputPath);
    
    // Create output directories
    await this.createDirectories(config.outputDir);
    
    // Generate schemas (Zod models)
    console.log('🔨 Generating Zod schemas...');
    await this.generateSchemas(spec.schemas, config.outputDir);
    
    // Generate API client base
    console.log('🌐 Generating base API client...');
    await this.generateApiClient(config.outputDir);
    
    // Generate endpoint classes
    console.log('⚡ Generating endpoint classes...');
    await this.generateEndpoints(spec.operations, spec.tags, config.outputDir);
    
    // Generate React Query hooks (if enabled)
    if (config.generateHooks !== false) {
      console.log('🪝 Generating React Query hooks...');
      await this.generateHooks(spec.operations, spec.tags, config.outputDir);
    }
    
    // Generate index files
    console.log('📦 Generating index files...');
    await this.generateIndexFiles(spec.schemas, spec.tags, config);
    
    console.log('✅ Code generation completed successfully!');
  }

  private async parseSpec(inputPath: string) {
    if (inputPath.startsWith('http')) {
      return await this.parser.parseFromUrl(inputPath);
    } else {
      return await this.parser.parseFromFile(inputPath);
    }
  }

  private async createDirectories(outputDir: string): Promise<void> {
    const dirs = [
      path.join(outputDir, 'models'),
      path.join(outputDir, 'endpoints'),
      path.join(outputDir, 'hooks'),
    ];

    for (const dir of dirs) {
      await fs.ensureDir(dir);
    }
  }

  private async generateSchemas(schemas: any[], outputDir: string): Promise<void> {
    const modelsDir = path.join(outputDir, 'models');
    const generatedSchemas = this.schemaGenerator.generateSchemas(schemas);

    for (const schema of generatedSchemas) {
      const filePath = path.join(modelsDir, `${schema.name}.ts`);
      const formattedContent = await this.formatCode(schema.content);
      await fs.writeFile(filePath, formattedContent);
    }

    // Generate models index file
    const indexContent = this.schemaGenerator.generateIndexFile(
      generatedSchemas.map(s => s.name)
    );
    const formattedIndex = await this.formatCode(indexContent);
    await fs.writeFile(path.join(modelsDir, 'index.ts'), formattedIndex);
  }

  private async generateApiClient(outputDir: string): Promise<void> {
    // Copy the base ApiClient to the output directory
    const apiClientPath = path.join(__dirname, '../../src/ApiClient.ts');
    const outputPath = path.join(outputDir, 'ApiClient.ts');
    
    const content = await fs.readFile(apiClientPath, 'utf-8');
    const formattedContent = await this.formatCode(content);
    await fs.writeFile(outputPath, formattedContent);
  }

  private async generateEndpoints(
    operations: any[], 
    tags: string[], 
    outputDir: string
  ): Promise<void> {
    const endpointsDir = path.join(outputDir, 'endpoints');
    const generatedClasses: string[] = [];

    for (const tag of tags) {
      const endpoint = this.endpointGenerator.generateEndpointClasses(operations, tag);
      const filePath = path.join(endpointsDir, `${endpoint.className}.ts`);
      const formattedContent = await this.formatCode(endpoint.content);
      await fs.writeFile(filePath, formattedContent);
      generatedClasses.push(endpoint.className);
    }

    // Generate endpoints index file
    const indexContent = this.endpointGenerator.generateIndexFile(generatedClasses);
    const formattedIndex = await this.formatCode(indexContent);
    await fs.writeFile(path.join(endpointsDir, 'index.ts'), formattedIndex);
  }

  private async generateHooks(
    operations: any[], 
    tags: string[], 
    outputDir: string
  ): Promise<void> {
    const hooksDir = path.join(outputDir, 'hooks');

    for (const tag of tags) {
      const tagOperations = operations.filter(op => op.tags?.includes(tag) || !op.tags?.length);
      const className = this.parser.generateClassName(tag);
      
      // Generate the actual endpoint methods info
      const endpoint = this.endpointGenerator.generateEndpointClasses(operations, tag);
      
      // Use the endpoint generator to create the actual methods
      const methods = tagOperations.map(operation => {
        return this.endpointGenerator.generateMethod(operation);
      });

      const hooksFile = this.hooksGenerator.generateHooksForTag(
        tagOperations, 
        tag, 
        className,
        methods
      );

      const filePath = path.join(hooksDir, `${tag}.ts`);
      const formattedContent = await this.formatCode(hooksFile.content);
      await fs.writeFile(filePath, formattedContent);
    }

    // Generate query keys file
    const queryKeysContent = this.hooksGenerator.generateQueryKeys(operations);
    const formattedQueryKeys = await this.formatCode(queryKeysContent);
    await fs.writeFile(path.join(hooksDir, 'queryKeys.ts'), formattedQueryKeys);

    // Generate hooks index file
    const indexContent = this.hooksGenerator.generateIndexFile(tags);
    const formattedIndex = await this.formatCode(indexContent);
    await fs.writeFile(path.join(hooksDir, 'index.ts'), formattedIndex);
  }

  private async generateIndexFiles(
    schemas: any[], 
    tags: string[], 
    config: GeneratorConfig
  ): Promise<void> {
    const mainIndexContent = `// Generated API Client
export * from './ApiClient';
export * from './models';
export * from './endpoints';
${config.generateHooks !== false ? "export * from './hooks';" : ''}
`;

    const formattedMainIndex = await this.formatCode(mainIndexContent);
    await fs.writeFile(path.join(config.outputDir, 'index.ts'), formattedMainIndex);
  }

  private async formatCode(code: string): Promise<string> {
    try {
      return format(code, {
        parser: 'typescript',
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
      });
    } catch (error) {
      console.warn('⚠️  Failed to format code, using unformatted version');
      return code;
    }
  }
}