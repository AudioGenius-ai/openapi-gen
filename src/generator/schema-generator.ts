import { OpenAPIV3 } from 'openapi-types';
import { ParsedSchema } from '../utils/openapi-parser';

export interface GeneratedSchema {
  name: string;
  content: string;
  dependencies: string[];
}

export class SchemaGenerator {
  private processedSchemas = new Set<string>();

  generateSchemas(schemas: ParsedSchema[]): GeneratedSchema[] {
    this.processedSchemas.clear();
    return schemas.map(schema => this.generateSchema(schema));
  }

  private generateSchema(parsedSchema: ParsedSchema): GeneratedSchema {
    const { name, schema } = parsedSchema;
    const dependencies: string[] = [];
    
    const zodSchema = this.convertToZodSchema(schema, dependencies);
    
    const imports = this.generateImports(dependencies);
    const content = `${imports}

export const ${name}Schema = ${zodSchema};

export type ${name} = z.infer<typeof ${name}Schema>;
`;

    return {
      name,
      content,
      dependencies,
    };
  }

  private convertToZodSchema(schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject, dependencies: string[]): string {
    if ('$ref' in schema) {
      const refName = this.extractRefName(schema.$ref);
      if (!dependencies.includes(refName)) {
        dependencies.push(refName);
      }
      return `${refName}Schema`;
    }

    // Check for enum first, before type-specific handling
    if (schema.enum) {
      return this.handleEnumSchema(schema);
    }

    // Handle special case for invalid "date" type first
    if ((schema as any).type === 'date') {
      // Handle invalid OpenAPI type "date" as string with date format
      return 'z.string()';
    }

    switch (schema.type) {
      case 'string':
        return this.handleStringSchema(schema);
      case 'number':
      case 'integer':
        return this.handleNumberSchema(schema);
      case 'boolean':
        return 'z.boolean()';
      case 'array':
        return this.handleArraySchema(schema as OpenAPIV3.ArraySchemaObject, dependencies);
      case 'object':
        return this.handleObjectSchema(schema, dependencies);
      default:
        if (schema.oneOf) {
          return this.handleOneOfSchema(schema, dependencies);
        }
        if (schema.anyOf) {
          return this.handleAnyOfSchema(schema, dependencies);
        }
        if (schema.allOf) {
          return this.handleAllOfSchema(schema, dependencies);
        }
        // Default to unknown for unsupported types
        return 'z.unknown()';
    }
  }

  private handleStringSchema(schema: OpenAPIV3.SchemaObject): string {
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

  private handleNumberSchema(schema: OpenAPIV3.SchemaObject): string {
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

  private handleArraySchema(schema: OpenAPIV3.ArraySchemaObject, dependencies: string[]): string {
    if (!schema.items) {
      return 'z.array(z.unknown())';
    }

    const itemSchema = this.convertToZodSchema(schema.items, dependencies);
    let zodArray = `z.array(${itemSchema})`;

    if (schema.minItems !== undefined) {
      zodArray += `.min(${schema.minItems})`;
    }
    if (schema.maxItems !== undefined) {
      zodArray += `.max(${schema.maxItems})`;
    }

    return zodArray;
  }

  private handleObjectSchema(schema: OpenAPIV3.SchemaObject, dependencies: string[]): string {
    if (!schema.properties) {
      if (schema.additionalProperties) {
        const additionalSchema = typeof schema.additionalProperties === 'object' 
          ? this.convertToZodSchema(schema.additionalProperties as OpenAPIV3.SchemaObject, dependencies)
          : 'z.unknown()';
        return `z.record(${additionalSchema})`;
      }
      return 'z.object({})';
    }

    const properties: string[] = [];
    const required = schema.required || [];

    Object.entries(schema.properties).forEach(([propName, propSchema]) => {
      const isRequired = required.includes(propName);
      const zodPropSchema = this.convertToZodSchema(propSchema, dependencies);
      
      const finalSchema = isRequired ? zodPropSchema : `${zodPropSchema}.optional()`;
      properties.push(`  ${propName}: ${finalSchema}`);
    });

    let objectSchema = `z.object({\n${properties.join(',\n')}\n})`;

    if (schema.additionalProperties === false) {
      objectSchema += '.strict()';
    }

    return objectSchema;
  }

  private handleEnumSchema(schema: OpenAPIV3.SchemaObject): string {
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

  private handleOneOfSchema(schema: OpenAPIV3.SchemaObject, dependencies: string[]): string {
    if (!schema.oneOf || schema.oneOf.length === 0) {
      return 'z.unknown()';
    }

    const unionSchemas = schema.oneOf.map(subSchema => 
      this.convertToZodSchema(subSchema, dependencies)
    );

    return `z.union([${unionSchemas.join(', ')}])`;
  }

  private handleAnyOfSchema(schema: OpenAPIV3.SchemaObject, dependencies: string[]): string {
    // For anyOf, we use union as well (similar to oneOf)
    if (!schema.anyOf || schema.anyOf.length === 0) {
      return 'z.unknown()';
    }

    const unionSchemas = schema.anyOf.map(subSchema => 
      this.convertToZodSchema(subSchema, dependencies)
    );

    return `z.union([${unionSchemas.join(', ')}])`;
  }

  private handleAllOfSchema(schema: OpenAPIV3.SchemaObject, dependencies: string[]): string {
    if (!schema.allOf || schema.allOf.length === 0) {
      return 'z.unknown()';
    }

    // For allOf, we merge the objects using intersection
    const intersectionSchemas = schema.allOf.map(subSchema => 
      this.convertToZodSchema(subSchema, dependencies)
    );

    if (intersectionSchemas.length === 1) {
      return intersectionSchemas[0];
    }

    return intersectionSchemas.reduce((acc, curr) => `${acc}.and(${curr})`);
  }

  private extractRefName(ref: string): string {
    return ref.split('/').pop() || 'Unknown';
  }

  private generateImports(dependencies: string[]): string {
    const imports = ['import { z } from "zod";'];
    
    if (dependencies.length > 0) {
      dependencies.forEach(dep => {
        imports.push(`import { ${dep}Schema } from "./${dep}";`);
      });
    }

    return imports.join('\n');
  }

  generateIndexFile(schemaNames: string[]): string {
    const exports = schemaNames.map(name => `export * from "./${name}";`);
    return exports.join('\n') + '\n';
  }
}