import { OpenAPIV3 } from 'openapi-types';
import { ParsedOperation, OpenAPIParser } from '../utils/openapi-parser';

export interface GeneratedEndpoint {
  className: string;
  content: string;
  operations: ParsedOperation[];
  inlineModels: InlineModel[];
}

export interface InlineModel {
  name: string;
  content: string;
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
  private inlineModels: Map<string, InlineModel> = new Map();
  private inlineTypeCounter = 0;

  constructor(private parser: OpenAPIParser) {}

  generateEndpointClasses(operations: ParsedOperation[], tag: string): GeneratedEndpoint {
    this.inlineModels.clear(); // Clear inline models for each class
    
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
      inlineModels: Array.from(this.inlineModels.values()),
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
    const pathParts: string[] = [];
    
    operation.path.split('/').forEach(part => {
      if (!part) return;
      
      if (part.startsWith('{') && part.endsWith('}')) {
        // Path parameter - add identifier
        const paramName = part.slice(1, -1);
        pathParts.push('By' + this.toPascalCase(paramName));
      } else if (part.startsWith(':')) {
        // Path parameter in :param format  
        const paramName = part.slice(1);
        pathParts.push('By' + this.toPascalCase(paramName));
      } else {
        // Regular path segment
        pathParts.push(this.toPascalCase(part.replace(/[^a-zA-Z0-9]/g, '')));
      }
    });

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

  private getParameterType(schema: any): string {
    if (!schema) return 'any';
    
    switch (schema.type) {
      case 'string':
        return 'string';
      case 'number':
      case 'integer':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'array':
        return 'any[]';
      default:
        return 'any';
    }
  }

  private getResponseSchema(operation: ParsedOperation): string {
    const responses = operation.responses;
    const methodName = this.generateMethodName(operation);
    
    // Try to get 200, 201, or first successful response
    for (const statusCode of ['200', '201', '204']) {
      const response = responses[statusCode] as OpenAPIV3.ResponseObject;
      if (response?.content?.['application/json']?.schema) {
        return this.getSchemaReference(response.content['application/json'].schema, `${this.toPascalCase(methodName)}Response`);
      }
    }

    // Fallback to any successful response
    for (const [statusCode, response] of Object.entries(responses)) {
      if (statusCode.startsWith('2') && typeof response === 'object') {
        const responseObj = response as OpenAPIV3.ResponseObject;
        if (responseObj.content?.['application/json']?.schema) {
          return this.getSchemaReference(responseObj.content['application/json'].schema, `${this.toPascalCase(methodName)}Response`);
        }
      }
    }

    return 'z.unknown()';
  }

  private getRequestBodySchema(operation: ParsedOperation): string | undefined {
    if (!operation.requestBody) return undefined;
    
    const content = operation.requestBody.content;
    if (content?.['application/json']?.schema) {
      const methodName = this.generateMethodName(operation);
      return this.getSchemaReference(content['application/json'].schema, `${this.toPascalCase(methodName)}Request`);
    }
    
    return undefined;
  }

  private getSchemaReference(schema: any, context?: string): string {
    if (schema.$ref) {
      const refName = schema.$ref.split('/').pop();
      return `${refName}Schema`;
    }
    
    // Convert inline schemas to Zod schemas
    return this.convertInlineToZodSchema(schema, context);
  }

  private convertInlineToZodSchema(schema: any, context?: string): string {
    // Check for enum first
    if (schema.enum) {
      return this.handleInlineEnumSchema(schema);
    }

    if (schema.type) {
      switch (schema.type) {
        case 'string':
          return this.handleInlineStringSchema(schema);
        case 'number':
        case 'integer':
          return this.handleInlineNumberSchema(schema);
        case 'boolean':
          return 'z.boolean()';
        case 'array':
          return this.handleInlineArraySchema(schema, context);
        case 'object':
          return this.handleInlineObjectSchema(schema, context);
        case 'date':
          // Handle invalid OpenAPI type "date" as string with date format
          return 'z.string()';
        default:
          return 'z.unknown()';
      }
    }

    // Handle composition schemas
    if (schema.oneOf) {
      return this.handleInlineOneOfSchema(schema, context);
    }
    if (schema.anyOf) {
      return this.handleInlineAnyOfSchema(schema, context);
    }
    if (schema.allOf) {
      return this.handleInlineAllOfSchema(schema, context);
    }
    
    return 'z.unknown()';
  }

  private handleInlineStringSchema(schema: any): string {
    let zodString = 'z.string()';

    if (schema.format) {
      switch (schema.format) {
        case 'email':
          zodString += '.email()';
          break;
        case 'uri':
        case 'url':
          zodString += '.url()';
          break;
        case 'uuid':
          zodString += '.uuid()';
          break;
        case 'date':
        case 'date-time':
          zodString += '.datetime()';
          break;
      }
    }

    if (schema.minLength !== undefined) {
      zodString += `.min(${schema.minLength})`;
    }
    if (schema.maxLength !== undefined) {
      zodString += `.max(${schema.maxLength})`;
    }
    if (schema.pattern) {
      zodString += `.regex(/${schema.pattern}/)`;
    }

    return zodString;
  }

  private handleInlineNumberSchema(schema: any): string {
    const isInteger = schema.type === 'integer';
    let zodNumber = isInteger ? 'z.number().int()' : 'z.number()';

    if (schema.minimum !== undefined) {
      zodNumber += `.min(${schema.minimum})`;
    }
    if (schema.maximum !== undefined) {
      zodNumber += `.max(${schema.maximum})`;
    }

    return zodNumber;
  }

  private handleInlineArraySchema(schema: any, context?: string): string {
    if (!schema.items) {
      return 'z.array(z.unknown())';
    }

    const itemContext = context ? `${context}Item` : undefined;
    const itemSchema = this.getSchemaReference(schema.items, itemContext);
    let zodArray = `z.array(${itemSchema})`;

    if (schema.minItems !== undefined) {
      zodArray += `.min(${schema.minItems})`;
    }
    if (schema.maxItems !== undefined) {
      zodArray += `.max(${schema.maxItems})`;
    }

    return zodArray;
  }

  private handleInlineObjectSchema(schema: any, context?: string): string {
    if (!schema.properties) {
      if (schema.additionalProperties) {
        const additionalSchema = typeof schema.additionalProperties === 'object' 
          ? this.getSchemaReference(schema.additionalProperties, context)
          : 'z.unknown()';
        return `z.record(${additionalSchema})`;
      }
      return 'z.object({})';
    }

    // Generate a TypeScript interface for complex objects
    if (context && Object.keys(schema.properties).length > 2) {
      return this.generateInlineTypeForObject(schema, context);
    }

    const properties: string[] = [];
    const required = schema.required || [];

    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      const isRequired = required.includes(propName);
      const propContext = context ? `${context}${this.toPascalCase(propName)}` : undefined;
      const zodPropSchema = this.getSchemaReference(propSchema, propContext);
      
      const finalSchema = isRequired ? zodPropSchema : `${zodPropSchema}.optional()`;
      properties.push(`  ${propName}: ${finalSchema}`);
    });

    let objectSchema = `z.object({\n${properties.join(',\n')}\n})`;

    if (schema.additionalProperties === false) {
      objectSchema += '.strict()';
    }

    return objectSchema;
  }

  private generateInlineTypeForObject(schema: any, context: string): string {
    const typeName = `${context}Type`;
    
    // Check if we already generated this type
    if (this.inlineModels.has(typeName)) {
      return `${typeName}Schema`;
    }

    const properties: string[] = [];
    const tsProperties: string[] = [];
    const required = schema.required || [];

    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      const isRequired = required.includes(propName);
      const propContext = `${context}${this.toPascalCase(propName)}`;
      const zodPropSchema = this.getSchemaReference(propSchema, propContext);
      
      // Generate Zod schema property
      const finalSchema = isRequired ? zodPropSchema : `${zodPropSchema}.optional()`;
      properties.push(`  ${propName}: ${finalSchema}`);
      
      // Generate TypeScript interface property
      const tsType = this.zodSchemaToTsType(zodPropSchema);
      const optional = isRequired ? '' : '?';
      tsProperties.push(`  ${propName}${optional}: ${tsType};`);
    });

    let objectSchema = `z.object({\n${properties.join(',\n')}\n})`;
    if (schema.additionalProperties === false) {
      objectSchema += '.strict()';
    }

    // Generate model file content
    const dependencies = this.extractDependenciesFromProperties(schema.properties, context);
    const imports = this.generateModelImports(dependencies);
    
    const modelContent = `${imports}

export const ${typeName}Schema = ${objectSchema};

export type ${typeName} = z.infer<typeof ${typeName}Schema>;
`;

    // Store the inline model
    this.inlineModels.set(typeName, {
      name: typeName,
      content: modelContent
    });

    return `${typeName}Schema`;
  }

  private extractDependenciesFromProperties(properties: any, context: string): string[] {
    const dependencies: string[] = [];
    
    Object.entries(properties).forEach(([propName, propSchema]) => {
      // Check if this property references other inline types
      const propContext = `${context}${this.toPascalCase(propName)}`;
      if (this.inlineModels.has(`${propContext}Type`)) {
        dependencies.push(`${propContext}Type`);
      }
    });
    
    return dependencies;
  }

  private generateModelImports(dependencies: string[]): string {
    const imports = ['import { z } from "zod";'];
    
    if (dependencies.length > 0) {
      dependencies.forEach(dep => {
        imports.push(`import { ${dep}Schema } from "./${dep}";`);
      });
    }

    return imports.join('\n');
  }

  private handleInlineEnumSchema(schema: any): string {
    if (!schema.enum || schema.enum.length === 0) {
      return 'z.unknown()';
    }

    // Check if all enum values are strings (required for z.enum)
    const allStrings = schema.enum.every((value: any) => typeof value === 'string');
    
    if (allStrings) {
      const enumValues = schema.enum.map((value: string) => `"${value}"`).join(', ');
      return `z.enum([${enumValues}])`;
    } else {
      // Handle mixed types or non-string enums using z.union with z.literal
      const literalValues = schema.enum.map((value: any) => {
        if (typeof value === 'string') {
          return `z.literal("${value}")`;
        } else if (typeof value === 'boolean') {
          return `z.literal(${value})`;
        } else if (typeof value === 'number') {
          return `z.literal(${value})`;
        } else if (value === null) {
          return 'z.literal(null)';
        } else {
          return `z.literal(${JSON.stringify(value)})`;
        }
      }).join(', ');
      
      if (schema.enum.length === 1) {
        return literalValues;
      } else {
        return `z.union([${literalValues}])`;
      }
    }
  }

  private handleInlineOneOfSchema(schema: any, context?: string): string {
    if (!schema.oneOf || schema.oneOf.length === 0) {
      return 'z.unknown()';
    }

    const unionSchemas = schema.oneOf.map((subSchema: any, index: number) => 
      this.getSchemaReference(subSchema, context ? `${context}Option${index + 1}` : undefined)
    );

    return `z.union([${unionSchemas.join(', ')}])`;
  }

  private handleInlineAnyOfSchema(schema: any, context?: string): string {
    if (!schema.anyOf || schema.anyOf.length === 0) {
      return 'z.unknown()';
    }

    const unionSchemas = schema.anyOf.map((subSchema: any, index: number) => 
      this.getSchemaReference(subSchema, context ? `${context}Option${index + 1}` : undefined)
    );

    return `z.union([${unionSchemas.join(', ')}])`;
  }

  private handleInlineAllOfSchema(schema: any, context?: string): string {
    if (!schema.allOf || schema.allOf.length === 0) {
      return 'z.unknown()';
    }

    const intersectionSchemas = schema.allOf.map((subSchema: any, index: number) => 
      this.getSchemaReference(subSchema, context ? `${context}Intersection${index + 1}` : undefined)
    );

    if (intersectionSchemas.length === 1) {
      return intersectionSchemas[0];
    }

    return intersectionSchemas.reduce((acc: string, curr: string) => `${acc}.and(${curr})`);
  }

  private inferReturnType(responseSchema: string): string {
    if (responseSchema === 'z.unknown()') {
      return 'Promise<unknown>';
    }
    
    // Handle schemas that reference models
    if (!responseSchema.startsWith('z.')) {
      const typeName = responseSchema.replace('Schema', '');
      return `Promise<${typeName}>`;
    }
    
    // For inline Zod schemas, convert to TypeScript type
    const tsType = this.zodSchemaToTsType(responseSchema);
    return `Promise<${tsType}>`;
  }
  
  private zodSchemaToTsType(zodSchema: string): string {
    // Check for inline type references first
    if (zodSchema.endsWith('Schema')) {
      const typeName = zodSchema.replace('Schema', '');
      // Check if this is an inline type we generated
      if (this.inlineModels.has(typeName)) {
        return typeName;
      }
      return typeName;
    }
    
    // Basic type mappings
    if (zodSchema === 'z.string()' || zodSchema.startsWith('z.string().')) return 'string';
    if (zodSchema === 'z.number()' || zodSchema.startsWith('z.number().')) return 'number';
    if (zodSchema === 'z.boolean()' || zodSchema.startsWith('z.boolean()')) return 'boolean';
    if (zodSchema === 'z.unknown()') return 'unknown';
    if (zodSchema === 'z.any()') return 'any';
    if (zodSchema === 'z.null()') return 'null';
    if (zodSchema === 'z.undefined()') return 'undefined';
    if (zodSchema === 'z.void()') return 'void';
    
    // Array types
    if (zodSchema.startsWith('z.array(')) {
      const innerMatch = zodSchema.match(/z\.array\((.+)\)(?:\.|$)/);
      if (innerMatch) {
        const innerType = this.zodSchemaToTsType(innerMatch[1]);
        return `${innerType}[]`;
      }
    }
    
    // Record types
    if (zodSchema.startsWith('z.record(')) {
      const innerMatch = zodSchema.match(/z\.record\((.+)\)/);
      if (innerMatch) {
        const valueType = this.zodSchemaToTsType(innerMatch[1]);
        return `Record<string, ${valueType}>`;
      }
    }
    
    // Enum types
    if (zodSchema.startsWith('z.enum(')) {
      const enumMatch = zodSchema.match(/z\.enum\(\[(.+)\]\)/);
      if (enumMatch) {
        return enumMatch[1].replace(/"/g, "'");
      }
    }
    
    // Union types
    if (zodSchema.startsWith('z.union(')) {
      const unionMatch = zodSchema.match(/z\.union\(\[(.+)\]\)/);
      if (unionMatch) {
        const types = this.parseUnionTypes(unionMatch[1]);
        return types.map(t => this.zodSchemaToTsType(t)).join(' | ');
      }
    }
    
    // Object types - for inline objects, we'll use a generic type
    if (zodSchema.startsWith('z.object(')) {
      // For complex inline objects, we'll use Record type as a simplification
      // In a real implementation, you might want to parse the object structure
      return 'Record<string, any>';
    }
    
    // Default fallback
    return 'unknown';
  }
  
  private parseUnionTypes(unionContent: string): string[] {
    // Simple parser for union types - handles basic cases
    const types: string[] = [];
    let current = '';
    let depth = 0;
    
    for (const char of unionContent) {
      if (char === '(' || char === '[' || char === '{') depth++;
      if (char === ')' || char === ']' || char === '}') depth--;
      if (char === ',' && depth === 0) {
        types.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    if (current.trim()) {
      types.push(current.trim());
    }
    
    return types;
  }

  private inferTypeFromSchema(schema: string): string {
    if (!schema.startsWith('z.')) {
      return schema.replace('Schema', '');
    }
    
    // Use the same logic as inferReturnType but without the Promise wrapper
    return this.zodSchemaToTsType(schema);
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
      // Add response schema imports
      if (method.responseSchema !== 'z.unknown()' && !method.responseSchema.startsWith('z.')) {
        const schemaName = method.responseSchema;
        const typeName = schemaName.replace('Schema', '');
        schemas.add(schemaName);
        schemas.add(typeName);
      }
      
      // Add request body schema imports
      if (method.requestBodySchema && !method.requestBodySchema.startsWith('z.')) {
        const schemaName = method.requestBodySchema;
        const typeName = schemaName.replace('Schema', '');
        schemas.add(schemaName);
        schemas.add(typeName);
      }
    });

    // Add inline model imports
    this.inlineModels.forEach((model) => {
      schemas.add(`${model.name}Schema`);
      schemas.add(model.name);
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