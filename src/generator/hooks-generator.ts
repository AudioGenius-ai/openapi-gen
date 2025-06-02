import { ParsedOperation } from "../utils/openapi-parser";
import { GeneratedMethod } from "./endpoint-generator";

export interface GeneratedHook {
  name: string;
  content: string;
  operation: ParsedOperation;
  hookType: "query" | "mutation";
}

export interface GeneratedHooksFile {
  tag: string;
  content: string;
  hooks: GeneratedHook[];
}

export class HooksGenerator {
  generateHooksForTag(
    operations: ParsedOperation[],
    tag: string,
    className: string,
    methods: GeneratedMethod[],
    baseUrl?: string
  ): GeneratedHooksFile {
    const hooks = operations.map((operation, index) =>
      this.generateHook(operation, className, methods[index]),
    );

    const imports = this.generateImports(className, hooks);
    const hookContents = hooks.map((hook) => hook.content).join("\n\n");

    const baseUrlArg =
      baseUrl !== undefined
        ? JSON.stringify(baseUrl)
        : "process.env.REACT_APP_API_BASE_URL || ''";

    const content = `${imports}

const apiSDK = new ApiSDK(${baseUrlArg});

${hookContents}
`;

    return {
      tag,
      content,
      hooks,
    };
  }

  private generateHook(
    operation: ParsedOperation,
    className: string,
    method: GeneratedMethod,
  ): GeneratedHook {
    const isQuery = this.isQueryOperation(operation.method);
    const hookName = this.generateHookName(operation, isQuery);

    const content = isQuery
      ? this.generateQueryHook(operation, method, className)
      : this.generateMutationHook(operation, method, className);

    return {
      name: hookName,
      content,
      operation,
      hookType: isQuery ? "query" : "mutation",
    };
  }

  private isQueryOperation(method: string): boolean {
    return ["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());
  }

  private generateHookName(
    operation: ParsedOperation,
    isQuery: boolean,
  ): string {
    const prefix = isQuery ? "use" : "use";

    if (operation.operationId) {
      return prefix + this.toPascalCase(operation.operationId);
    }

    const method = operation.method.toLowerCase();
    const pathParts = operation.path
      .split("/")
      .filter((part) => part && !part.startsWith("{") && !part.startsWith(":"))
      .map((part) => this.toPascalCase(part.replace(/[^a-zA-Z0-9]/g, "")));

    return prefix + this.toPascalCase(method) + pathParts.join("");
  }

  private generateQueryHook(
    operation: ParsedOperation,
    method: GeneratedMethod,
    className: string,
  ): string {
    const hookName = this.generateHookName(operation, true);
    const methodName = method.name;
    const baseName = className.replace("Api", "");
    const apiInstance = "apiSDK." + this.toCamelCase(baseName) + "Api";

    // Separate required and optional parameters
    const requiredParams = method.parameters.filter((p) => p.required);
    const optionalParams = method.parameters.filter((p) => !p.required);

    // Generate function parameters
    const functionParams: string[] = [];

    // Add required parameters
    requiredParams.forEach((param) => {
      functionParams.push(`${param.name}: ${param.type}`);
    });

    // Add optional parameters as an options object
    if (optionalParams.length > 0) {
      const optionalParamsType = optionalParams
        .map((p) => `${p.name}?: ${p.type}`)
        .join("; ");
      functionParams.push(`options?: { ${optionalParamsType} }`);
    }

    // Add React Query options
    const returnType = method.returnType
      .replace("Promise<", "")
      .replace(">", "");
    functionParams.push(
      `queryOptions?: Omit<UseQueryOptions<${returnType}, Error>, "queryKey" | "queryFn">`,
    );

    // Generate query key - include all parameters that affect the query
    const allParams = [
      ...requiredParams.map((p) => p.name),
      ...optionalParams.map((p) => `options?.${p.name}`),
    ];
    const queryKey =
      allParams.length > 0
        ? `[${JSON.stringify(methodName)}, ${allParams.join(", ")}]`
        : `[${JSON.stringify(methodName)}]`;

    // Generate function call parameters
    const callParams = method.parameters
      .map((p) => {
        if (p.required) {
          return p.name;
        } else {
          return `options?.${p.name}`;
        }
      })
      .join(", ");

    // Handle queries with no parameters
    if (method.parameters.length === 0) {
      return `export function ${hookName}(
  queryOptions?: Omit<UseQueryOptions<${returnType}, Error>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: [${JSON.stringify(methodName)}],
    queryFn: () => ${apiInstance}.${methodName}(),
    ...queryOptions
  });
}`;
    }

    // Generate enabled condition for required parameters
    const enabledCondition =
      requiredParams.length > 0
        ? `enabled: ${requiredParams.map((p) => `${p.name} != null`).join(" && ")}, ...queryOptions`
        : "...queryOptions";

    return `export function ${hookName}(${functionParams.join(", ")}) {
  return useQuery({
    queryKey: ${queryKey},
    queryFn: () => ${apiInstance}.${methodName}(${callParams}),
    ${enabledCondition}
  });
}`;
  }

  private generateMutationHook(
    operation: ParsedOperation,
    method: GeneratedMethod,
    className: string,
  ): string {
    const hookName = this.generateHookName(operation, false);
    const methodName = method.name;
    const baseName = className.replace("Api", "");
    const apiInstance = "apiSDK." + this.toCamelCase(baseName) + "Api";

    // For mutations, we typically pass all parameters as a single object
    const parameterTypes = method.parameters.map((p) => {
      const optional = !p.required ? "?" : "";
      return `${p.name}${optional}: ${p.type}`;
    });

    const variablesType =
      parameterTypes.length > 0 ? `{ ${parameterTypes.join("; ")} }` : "void";

    const returnType = method.returnType
      .replace("Promise<", "")
      .replace(">", "");

    // Handle the case where there are no parameters
    if (parameterTypes.length === 0) {
      return `export function ${hookName}(
  mutationOptions?: Omit<UseMutationOptions<${returnType}, Error, void>, "mutationFn">
) {
  return useMutation({
    mutationFn: () => ${apiInstance}.${methodName}(),
    ...mutationOptions
  });
}`;
    }

    return `export function ${hookName}(
  mutationOptions?: Omit<UseMutationOptions<${returnType}, Error, ${variablesType}>, "mutationFn">
) {
  return useMutation({
    mutationFn: (variables: ${variablesType}) => {
      ${this.generateMutationCall(method, apiInstance)}
    },
    ...mutationOptions
  });
}`;
  }

  private generateMutationCall(
    method: GeneratedMethod,
    apiInstance: string,
  ): string {
    if (method.parameters.length === 0) {
      return `return ${apiInstance}.${method.name}();`;
    }

    // Handle destructuring for cleaner code
    const paramNames = method.parameters.map((p) => {
      if (p.required) {
        return `variables.${p.name}`;
      } else {
        return `variables.${p.name}`;
      }
    });

    return `return ${apiInstance}.${method.name}(${paramNames.join(", ")});`;
  }

  private generateImports(_className: string, hooks: GeneratedHook[]): string {
    const imports = [
      'import { useQuery, useMutation } from "@tanstack/react-query";',
      'import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";',
      'import { ApiSDK } from "../ApiSDK";',
    ];

    // Collect all types used in hooks (excluding primitive types)
    const types = new Set<string>();
    hooks.forEach((hook) => {
      // Extract types from the hook content
      const returnTypeMatches = hook.content.match(/UseQueryOptions<([^,>]+)/g);
      if (returnTypeMatches) {
        returnTypeMatches.forEach((match) => {
          const type = match.replace("UseQueryOptions<", "");
          // Only import non-primitive types and exclude 'unknown', 'Error'
          if (
            type &&
            ![
              "unknown",
              "string",
              "number",
              "boolean",
              "void",
              "Error",
              "any",
            ].includes(type) &&
            !type.includes("[]") &&
            !type.startsWith("z.")
          ) {
            types.add(type);
          }
        });
      }
    });

    if (types.size > 0) {
      const sortedTypes = Array.from(types).sort();
      imports.push(
        `import type { ${sortedTypes.join(", ")} } from "../models";`,
      );
    }

    return imports.join("\n");
  }

  private toCamelCase(str: string): string {
    // Convert PascalCase to camelCase by lowercasing first letter, then handle kebab/snake case
    const pascalToCamel = str.charAt(0).toLowerCase() + str.slice(1);
    return pascalToCamel.replace(/[-_]([a-z])/g, (_, char) =>
      char.toUpperCase(),
    );
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/[-_]([a-z])/g, (_, char) => char.toUpperCase())
      .replace(/^[a-z]/, (char) => char.toUpperCase());
  }

  generateQueryKeys(operations: ParsedOperation[]): string {
    const queryOperations = operations.filter((op) =>
      this.isQueryOperation(op.method),
    );

    const keyFunctions = queryOperations.map((operation) => {
      const hookName = this.generateHookName(operation, true);
      const methodName =
        operation.operationId ||
        `${operation.method.toLowerCase()}${operation.path}`;

      // Extract path parameters
      const pathParams = (operation.path.match(/\{([^}]+)\}/g) || []).map(
        (match) => match.slice(1, -1),
      );

      if (pathParams.length > 0) {
        const params = pathParams
          .map((param) => `${param}: string | number`)
          .join(", ");
        return `export const ${hookName}Key = (${params}) => [${JSON.stringify(methodName)}, ${pathParams.join(", ")}] as const;`;
      } else {
        return `export const ${hookName}Key = () => [${JSON.stringify(methodName)}] as const;`;
      }
    });

    return `// Query key factory functions
${keyFunctions.join("\n\n")}
`;
  }

  generateIndexFile(tags: string[]): string {
    const exports = tags.map((tag) => `export * from "./${tag}";`);
    exports.push('export * from "./queryKeys";');
    return exports.join("\n") + "\n";
  }
}
