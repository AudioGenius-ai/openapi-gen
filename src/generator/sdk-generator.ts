export class SdkGenerator {
  generateSdk(classNames: string[]): string {
    const imports = classNames
      .map((name) => `import { ${name} } from "./endpoints/${name}";`)
      .join("\n");

    const properties = classNames
      .map((name) => {
        const prop = this.toCamelCase(name); // convert to camelCase
        return `  public ${prop}: ${name};`;
      })
      .join("\n");

    const assignments = classNames
      .map((name) => {
        const prop = this.toCamelCase(name);
        return `    this.${prop} = new ${name}(config);`;
      })
      .join("\n");

    return `${imports}\nimport type { ApiClientConfig } from "./ApiClient";\n\nexport class ApiSDK {\n${properties}\n\n  constructor(config: ApiClientConfig) {\n${assignments}\n  }\n}\n`;
  }

  private toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
