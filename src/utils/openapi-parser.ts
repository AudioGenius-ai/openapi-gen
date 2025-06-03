import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

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
  servers?: OpenAPIV3.ServerObject[];
  security?: OpenAPIV3.SecurityRequirementObject[];
  callbacks?: Record<string, OpenAPIV3.CallbackObject>;
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
  version: string;
  servers?: OpenAPIV3.ServerObject[];
  securitySchemes?: Record<string, OpenAPIV3.SecuritySchemeObject>;
  globalSecurity?: OpenAPIV3.SecurityRequirementObject[];
  webhooks?: Record<string, OpenAPIV3.PathItemObject>;
}

export class OpenAPIParser {
  private spec: OpenAPIV3.Document | OpenAPIV3_1.Document | null = null;
  private version = '';

  async parseFromFile(filePath: string): Promise<ParsedSpec> {
    const doc = await SwaggerParser.dereference(filePath) as any;
    this.processSpec(doc);
    return this.extractParsedSpec();
  }

  async parseFromUrl(url: string): Promise<ParsedSpec> {
    const doc = await SwaggerParser.dereference(url) as any;
    this.processSpec(doc);
    return this.extractParsedSpec();
  }

  async parseFromObject(spec: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document): Promise<ParsedSpec> {
    const doc = await SwaggerParser.dereference(spec as any) as any;
    this.processSpec(doc);
    return this.extractParsedSpec();
  }

  private processSpec(doc: any) {
    if ('swagger' in doc && doc.swagger.startsWith('2')) {
      this.version = '2';
      this.spec = this.convertV2ToV3(doc as OpenAPIV2.Document);
    } else if ('openapi' in doc) {
      this.version = doc.openapi.startsWith('3.1') ? '3.1' : '3';
      this.spec = doc as OpenAPIV3.Document | OpenAPIV3_1.Document;
    } else {
      throw new Error('Unsupported OpenAPI version');
    }
  }

  // Minimal v2 -> v3 conversion to support basic features
  private convertV2ToV3(doc: OpenAPIV2.Document): OpenAPIV3.Document {
    const servers: OpenAPIV3.ServerObject[] = [];
    if (doc.host) {
      const schemes = doc.schemes && doc.schemes.length > 0 ? doc.schemes : ['http'];
      schemes.forEach((scheme) => {
        servers.push({ url: `${scheme}://${doc.host}${doc.basePath || ''}` });
      });
    } else if (doc.basePath) {
      servers.push({ url: doc.basePath });
    }

    const components: OpenAPIV3.ComponentsObject = {};
    if (doc.definitions) {
      components.schemas = doc.definitions as unknown as Record<string, OpenAPIV3.SchemaObject>;
    }
    if (doc.securityDefinitions) {
      components.securitySchemes = doc.securityDefinitions as unknown as Record<string, OpenAPIV3.SecuritySchemeObject>;
    }

    const converted: OpenAPIV3.Document = {
      openapi: '3.0.0',
      info: doc.info,
      paths: doc.paths as unknown as OpenAPIV3.PathsObject,
      servers,
      components,
      security: doc.security as any,
      tags: doc.tags as any,
    };

    return converted;
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
      version: this.version,
      servers: this.spec.servers,
      securitySchemes: this.spec.components?.securitySchemes as Record<string, OpenAPIV3.SecuritySchemeObject>,
      globalSecurity: this.spec.security as OpenAPIV3.SecurityRequirementObject[] | undefined,
      webhooks: (this.spec as any).webhooks,
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
          servers: operation.servers || this.spec?.servers,
          security: operation.security || (this.spec as any).security,
          callbacks: operation.callbacks as any,
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