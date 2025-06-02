import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';

export interface ParsedOperation {
  operationId?: string;
  method: string;
  path: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: OpenAPIV3.ParameterObject[];
  requestBody?: OpenAPIV3.RequestBodyObject;
  responses: OpenAPIV3.ResponsesObject;
}

export interface ParsedSchema {
  name: string;
  schema: OpenAPIV3.SchemaObject;
}

export interface ParsedSpec {
  info: OpenAPIV3.InfoObject;
  operations: ParsedOperation[];
  schemas: ParsedSchema[];
  tags: string[];
}

export class OpenAPIParser {
  private spec: OpenAPIV3.Document | null = null;

  async parseFromFile(filePath: string): Promise<ParsedSpec> {
    this.spec = await SwaggerParser.dereference(filePath) as OpenAPIV3.Document;
    return this.extractParsedSpec();
  }

  async parseFromUrl(url: string): Promise<ParsedSpec> {
    this.spec = await SwaggerParser.dereference(url) as OpenAPIV3.Document;
    return this.extractParsedSpec();
  }

  async parseFromObject(spec: OpenAPIV3.Document): Promise<ParsedSpec> {
    this.spec = await SwaggerParser.dereference(spec) as OpenAPIV3.Document;
    return this.extractParsedSpec();
  }

  private extractParsedSpec(): ParsedSpec {
    if (!this.spec) {
      throw new Error('No OpenAPI spec loaded');
    }

    const operations = this.extractOperations();
    const schemas = this.extractSchemas();
    const tags = this.extractTags();

    return {
      info: this.spec.info,
      operations,
      schemas,
      tags,
    };
  }

  private extractOperations(): ParsedOperation[] {
    if (!this.spec?.paths) return [];

    const operations: ParsedOperation[] = [];

    Object.entries(this.spec.paths).forEach(([path, pathItem]) => {
      if (!pathItem) return;

      const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'] as const;

      methods.forEach(method => {
        const operation = pathItem[method] as OpenAPIV3.OperationObject;
        if (!operation) return;

        // Combine path-level and operation-level parameters
        const pathParameters = pathItem.parameters as OpenAPIV3.ParameterObject[] || [];
        const operationParameters = operation.parameters as OpenAPIV3.ParameterObject[] || [];
        const allParameters = [...pathParameters, ...operationParameters];

        operations.push({
          operationId: operation.operationId,
          method: method.toUpperCase(),
          path,
          summary: operation.summary,
          description: operation.description,
          tags: operation.tags,
          parameters: allParameters,
          requestBody: operation.requestBody as OpenAPIV3.RequestBodyObject,
          responses: operation.responses,
        });
      });
    });

    return operations;
  }

  private extractSchemas(): ParsedSchema[] {
    if (!this.spec?.components?.schemas) return [];

    return Object.entries(this.spec.components.schemas).map(([name, schema]) => ({
      name,
      schema: schema as OpenAPIV3.SchemaObject,
    }));
  }

  private extractTags(): string[] {
    const tagsFromSpec = this.spec?.tags?.map(tag => tag.name) || [];
    const tagsFromOperations = this.extractOperations()
      .flatMap(op => op.tags || [])
      .filter((tag, index, array) => array.indexOf(tag) === index);

    return [...new Set([...tagsFromSpec, ...tagsFromOperations])];
  }

  getSchemaByName(name: string): OpenAPIV3.SchemaObject | undefined {
    if (!this.spec?.components?.schemas) return undefined;
    return this.spec.components.schemas[name] as OpenAPIV3.SchemaObject;
  }

  getOperationsByTag(tag: string): ParsedOperation[] {
    return this.extractOperations().filter(op => op.tags?.includes(tag));
  }

  generateOperationId(operation: ParsedOperation): string {
    if (operation.operationId) {
      return operation.operationId;
    }

    // Generate operationId from method and path
    const method = operation.method.toLowerCase();
    const pathParts = operation.path
      .split('/')
      .filter(part => part && !part.startsWith('{') && !part.startsWith(':'))
      .map(part => part.replace(/[^a-zA-Z0-9]/g, ''))
      .filter(part => part)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1));

    return method + pathParts.join('');
  }

  generateClassName(tag: string): string {
    // Convert kebab-case or snake_case to PascalCase
    const pascalCase = tag
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
    
    return pascalCase + 'Api';
  }
}