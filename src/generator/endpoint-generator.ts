import { OpenAPIV3 } from 'openapi-types';
import { ParsedOperation, OpenAPIParser } from '../utils/openapi-parser';

export interface GeneratedEndpoint {
  className: string;
  content: string;
  operations: ParsedOperation[];
}

export interface MethodParameter {
  name: string;
  type: string;
  required: boolean;
  location: 'path' | 'query' | 'header' | 'body';
}

export interface GeneratedMethod {
  name: string;
  parameters: MethodParameter[];
  returnType: string;
  httpMethod: string;
  path: string;
  requestBodySchema?: string;
  responseSchema: string;
}

export class EndpointGenerator {
  constructor(private parser: OpenAPIParser) {}

  generateEndpointClasses(operations: ParsedOperation[], tag: string): GeneratedEndpoint {
    const className = this.parser.generateClassName(tag);
    const tagOperations = operations.filter(op => {
      if (!op.tags || op.tags.length === 0) {
        return tag === 'default';
      }
      return op.tags.includes(tag);
    });
    
    const methods = tagOperations.map(operation => this.generateMethod(operation));
    const imports = this.generateImports(methods);
    
    const content = `${imports}

export class ${className} extends ApiClient {
${methods.map(method => this.generateMethodCode(method)).join('\n\n')}
}
`;

    return {
      className,
      content,
      operations: tagOperations,
    };
  }

  generateMethod(operation: ParsedOperation): GeneratedMethod {
    const methodName = this.generateMethodName(operation);
    const parameters = this.extractParameters(operation);
    const responseSchema = this.getResponseSchema(operation);
    const requestBodySchema = this.getRequestBodySchema(operation);
    
    return {
      name: methodName,
      parameters,
      returnType: this.inferReturnType(responseSchema),
      httpMethod: operation.method,
      path: operation.path,
      requestBodySchema,
      responseSchema,
    };
  }

  private generateMethodName(operation: ParsedOperation): string {
    if (operation.operationId) {
      return this.toCamelCase(operation.operationId);
    }

    // Generate from method and path
    const method = operation.method.toLowerCase();
    const pathParts = operation.path
      .split('/')
      .filter(part => part && !part.startsWith('{') && !part.startsWith(':'))
      .map(part => this.toPascalCase(part.replace(/[^a-zA-Z0-9]/g, '')));

    return method + pathParts.join('');
  }

  private extractParameters(operation: ParsedOperation): MethodParameter[] {
    const parameters: MethodParameter[] = [];
    const seenParams = new Set<string>();

    // Path parameters
    const pathParams = this.extractPathParameters(operation.path);
    pathParams.forEach(param => {
      if (!seenParams.has(param)) {
        parameters.push({
          name: param,
          type: 'string | number',
          required: true,
          location: 'path',
        });
        seenParams.add(param);
      }
    });

    // Query and header parameters from OpenAPI spec
    if (operation.parameters) {
      operation.parameters.forEach(param => {
        const paramName = this.toCamelCase(param.name);
        if (!seenParams.has(paramName)) {
          const parameter: MethodParameter = {
            name: paramName,
            type: this.getParameterType(param.schema),
            required: param.required || false,
            location: param.in as 'query' | 'header',
          };
          parameters.push(parameter);
          seenParams.add(paramName);
        }
      });
    }

    // Request body parameter
    if (operation.requestBody) {
      const bodySchema = this.getRequestBodySchema(operation);
      if (bodySchema) {
        parameters.push({
          name: 'data',
          type: this.inferTypeFromSchema(bodySchema),
          required: operation.requestBody.required || false,
          location: 'body',
        });
      }
    }

    return parameters;
  }

  private extractPathParameters(path: string): string[] {
    // Handle both {param} and :param style parameters
    const bracketMatches = path.match(/\{([^}]+)\}/g);
    const colonMatches = path.match(/:([a-zA-Z_][a-zA-Z0-9_]*)/g);
    
    const bracketParams = bracketMatches ? bracketMatches.map(match => match.slice(1, -1)) : [];
    const colonParams = colonMatches ? colonMatches.map(match => match.slice(1)) : [];
    
    return [...bracketParams, ...colonParams];
  }

  private getParameterType(
    schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  ): string {
    if (!schema) return 'unknown';

    const zodSchema = this.getSchemaReference(schema);
    return this.inferTypeFromSchema(zodSchema);
  }

  private getResponseSchema(operation: ParsedOperation): string {
    const responses = operation.responses;
    
    // Try to get 200, 201, or first successful response
    for (const statusCode of ['200', '201', '204']) {
      const response = responses[statusCode] as OpenAPIV3.ResponseObject;
      if (response?.content?.['application/json']?.schema) {
        return this.getSchemaReference(response.content['application/json'].schema);
      }
    }

    // Fallback to any successful response
    for (const [statusCode, response] of Object.entries(responses)) {
      if (statusCode.startsWith('2') && typeof response === 'object') {
        const responseObj = response as OpenAPIV3.ResponseObject;
        if (responseObj.content?.['application/json']?.schema) {
          return this.getSchemaReference(responseObj.content['application/json'].schema);
        }
      }
    }

    return 'z.unknown()';
  }

  private getRequestBodySchema(operation: ParsedOperation): string | undefined {
    if (!operation.requestBody) return undefined;
    
    const content = operation.requestBody.content;
    if (content?.['application/json']?.schema) {
      return this.getSchemaReference(content['application/json'].schema);
    }
    
    return undefined;
  }

  private getSchemaReference(
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  ): string {
    if ('$ref' in schema) {
      const refName = schema.$ref.split('/').pop();
      return `${refName}Schema`;
    }

    // Handle inline schemas based on type
    if ('type' in schema) {
      switch (schema.type) {
        case 'string':
          return 'z.string()';
        case 'number':
        case 'integer':
          return 'z.number()';
        case 'boolean':
          return 'z.boolean()';
        case 'array':
          if (schema.items) {
            const itemSchema = this.getSchemaReference(schema.items);
            return `z.array(${itemSchema})`;
          }
          return 'z.array(z.unknown())';
        case 'object':
          if (schema.properties) {
            const props = Object.entries(schema.properties).map(([key, value]) => {
              const propSchema = this.getSchemaReference(value);
              const isRequired = schema.required?.includes(key);
              const optional = isRequired ? '' : '.optional()';
              return `  ${key}: ${propSchema}${optional}`;
            });
            return `z.object({\n${props.join(',\n')}\n})`;
          }
          if (schema.additionalProperties) {
            const additional = typeof schema.additionalProperties === 'object'
              ? this.getSchemaReference(schema.additionalProperties)
              : 'z.unknown()';
            return `z.record(${additional})`;
          }
          return 'z.object({})';
        default:
          return 'z.unknown()';
      }
    }
    
    return 'z.unknown()';
  }

  private inferReturnType(responseSchema: string): string {
    if (responseSchema === 'z.unknown()') {
      return 'Promise<unknown>';
    }
    
    // Handle built-in Zod schemas - convert to TypeScript types
    if (responseSchema.startsWith('z.')) {
      if (responseSchema === 'z.string()') return 'Promise<string>';
      if (responseSchema === 'z.number()') return 'Promise<number>';
      if (responseSchema === 'z.boolean()') return 'Promise<boolean>';
      if (responseSchema.startsWith('z.array(')) {
        // Extract inner type from z.array(innerType)
        const innerMatch = responseSchema.match(/z\.array\((.+)\)/);
        if (innerMatch) {
          const innerSchema = innerMatch[1];
          const innerType = this.inferReturnType(innerSchema).replace('Promise<', '').replace('>', '');
          return `Promise<${innerType}[]>`;
        }
      }
      return 'Promise<unknown>';
    }
    
    const typeName = responseSchema.replace('Schema', '');
    return `Promise<${typeName}>`;
  }

  private inferTypeFromSchema(schema: string): string {
    if (schema === 'z.unknown()') {
      return 'unknown';
    }
    
    // Handle built-in Zod schemas
    if (schema.startsWith('z.')) {
      if (schema === 'z.string()') return 'string';
      if (schema === 'z.number()') return 'number';
      if (schema === 'z.boolean()') return 'boolean';
      if (schema.startsWith('z.array(')) {
        const innerMatch = schema.match(/z\.array\((.+)\)/);
        if (innerMatch) {
          const innerSchema = innerMatch[1];
          const innerType = this.inferTypeFromSchema(innerSchema);
          return `${innerType}[]`;
        }
      }
      return 'unknown';
    }
    
    return schema.replace('Schema', '');
  }

  private generateMethodCode(method: GeneratedMethod): string {
    const pathParams = method.parameters.filter(p => p.location === 'path');
    const queryParams = method.parameters.filter(p => p.location === 'query');
    const headerParams = method.parameters.filter(p => p.location === 'header');
    const bodyParam = method.parameters.find(p => p.location === 'body');

    // Generate method signature
    const allParams = method.parameters.map(p => {
      const optional = !p.required ? '?' : '';
      return `${p.name}${optional}: ${p.type}`;
    });

    const signature = `  ${method.name}(${allParams.join(', ')}): ${method.returnType}`;

    // Generate method body
    let path = method.path;
    pathParams.forEach(param => {
      // Handle both {param} and :param style parameters
      path = path.replace(`{${param.name}}`, `\${${param.name}}`);
      path = path.replace(`:${param.name}`, `\${${param.name}}`);
    });

    const options: string[] = [];

    // Add query parameters
    if (queryParams.length > 0) {
      const queryObj = queryParams.map(p => `${p.name}`).join(', ');
      options.push(`queryParams: { ${queryObj} }`);
    }

    // Add headers
    if (headerParams.length > 0) {
      const headerObj = headerParams.map(p => `"${p.name}": ${p.name}`).join(', ');
      options.push(`headers: { ${headerObj} }`);
    }

    // Add request body
    if (bodyParam) {
      options.push(`body: ${bodyParam.name}`);
      if (method.requestBodySchema) {
        options.push(`bodySchema: ${method.requestBodySchema}`);
      }
    }

    const optionsStr = options.length > 0 ? `, { ${options.join(', ')} }` : '';
    const httpMethod = method.httpMethod.toLowerCase();

    return `${signature} {
    return this.${httpMethod}(\`${path}\`, ${method.responseSchema}${optionsStr});
  }`;
  }

  private generateImports(methods: GeneratedMethod[]): string {
    const imports = [
      'import { ApiClient } from "../ApiClient";',
      'import { z } from "zod";'
    ];
    const schemas = new Set<string>();

    methods.forEach(method => {
      if (method.responseSchema !== 'z.unknown()' && !method.responseSchema.startsWith('z.')) {
        const schemaName = method.responseSchema;
        const typeName = schemaName.replace('Schema', '');
        schemas.add(schemaName);
        schemas.add(typeName);
      }
      
      if (method.requestBodySchema && !method.requestBodySchema.startsWith('z.')) {
        const schemaName = method.requestBodySchema;
        const typeName = schemaName.replace('Schema', '');
        schemas.add(schemaName);
        schemas.add(typeName);
      }
    });

    if (schemas.size > 0) {
      const sortedSchemas = Array.from(schemas).sort();
      imports.push(`import { ${sortedSchemas.join(', ')} } from "../models";`);
    }

    return imports.join('\n');
  }

  private toCamelCase(str: string): string {
    return str.replace(/[-_]([a-z])/g, (_, char) => char.toUpperCase());
  }

  private toPascalCase(str: string): string {
    return str.charAt(0).toUpperCase() + this.toCamelCase(str).slice(1);
  }

  generateIndexFile(classNames: string[]): string {
    const exports = classNames.map(name => `export * from "./${name}";`);
    return exports.join('\n') + '\n';
  }
}