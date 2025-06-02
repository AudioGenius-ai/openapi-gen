#!/usr/bin/env node

import { Command } from 'commander';
import { CodeGenerator } from './generator';
import * as path from 'path';
import * as fs from 'fs-extra';

const program = new Command();

program
  .name('openapi-gen')
  .description('Custom OpenAPI Code Generator with Zod and React Query Hooks')
  .version('0.0.1');

program
  .command('generate')
  .alias('gen')
  .description('Generate TypeScript code from OpenAPI specification')
  .option('-i, --input <path>', 'Path to OpenAPI specification file (JSON/YAML) or URL')
  .option('-o, --output <dir>', 'Output directory for generated code', './generated')
  .option('--no-hooks', 'Skip generating React Query hooks')
  .option('--base-url <url>', 'Base URL for API calls (used in generated hooks)')
  .option('--client-name <name>', 'Name for the generated API client class', 'ApiClient')
  .action(async (options) => {
    try {
      if (!options.input) {
        console.error('❌ Error: Input file or URL is required. Use -i or --input option.');
        process.exit(1);
      }

      // Resolve paths
      const inputPath = path.resolve(options.input);
      const outputDir = path.resolve(options.output);

      // Check if input file exists (if it's a local file)
      if (!options.input.startsWith('http') && !await fs.pathExists(inputPath)) {
        console.error(`❌ Error: Input file not found: ${inputPath}`);
        process.exit(1);
      }

      // Create output directory if it doesn't exist
      await fs.ensureDir(outputDir);

      console.log('🎯 Configuration:');
      console.log(`   Input: ${options.input}`);
      console.log(`   Output: ${outputDir}`);
      console.log(`   Generate hooks: ${options.hooks !== false}`);
      if (options.baseUrl) {
        console.log(`   Base URL: ${options.baseUrl}`);
      }
      console.log();

      const generator = new CodeGenerator();
      await generator.generate({
        inputPath: options.input,
        outputDir,
        apiClientName: options.clientName,
        baseUrl: options.baseUrl,
        generateHooks: options.hooks !== false,
      });

      console.log();
      console.log('🎉 Generation completed successfully!');
      console.log(`📁 Generated files are in: ${outputDir}`);
      console.log();
      console.log('📖 Next steps:');
      console.log('1. Install dependencies: npm install zod @tanstack/react-query');
      console.log('2. Import generated types and hooks in your project');
      console.log('3. Configure React Query in your app');
      
    } catch (error) {
      console.error('❌ Generation failed:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new project with example configuration')
  .option('-d, --dir <directory>', 'Directory to initialize', '.')
  .action(async (options) => {
    try {
      const targetDir = path.resolve(options.dir);
      await fs.ensureDir(targetDir);

      // Create example OpenAPI spec
      const exampleSpec = {
        openapi: '3.0.0',
        info: {
          title: 'Example API',
          version: '1.0.0',
          description: 'Example API for testing the code generator'
        },
        servers: [
          {
            url: 'https://api.example.com/v1',
            description: 'Production server'
          }
        ],
        paths: {
          '/users': {
            get: {
              operationId: 'getUsers',
              summary: 'List users',
              tags: ['Users'],
              parameters: [
                {
                  name: 'page',
                  in: 'query',
                  schema: { type: 'integer', default: 1 }
                },
                {
                  name: 'limit',
                  in: 'query', 
                  schema: { type: 'integer', default: 10 }
                }
              ],
              responses: {
                '200': {
                  description: 'List of users',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/User' }
                      }
                    }
                  }
                }
              }
            },
            post: {
              operationId: 'createUser',
              summary: 'Create a new user',
              tags: ['Users'],
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/CreateUser' }
                  }
                }
              },
              responses: {
                '201': {
                  description: 'Created user',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            }
          },
          '/users/{id}': {
            get: {
              operationId: 'getUserById',
              summary: 'Get user by ID',
              tags: ['Users'],
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string' }
                }
              ],
              responses: {
                '200': {
                  description: 'User details',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            }
          }
        },
        components: {
          schemas: {
            User: {
              type: 'object',
              required: ['id', 'email', 'name'],
              properties: {
                id: { type: 'string', format: 'uuid' },
                email: { type: 'string', format: 'email' },
                name: { type: 'string' },
                role: { 
                  type: 'string', 
                  enum: ['admin', 'user'],
                  default: 'user'
                },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            },
            CreateUser: {
              type: 'object',
              required: ['email', 'name'],
              properties: {
                email: { type: 'string', format: 'email' },
                name: { type: 'string' },
                role: { 
                  type: 'string', 
                  enum: ['admin', 'user'],
                  default: 'user'
                }
              }
            }
          }
        }
      };

      const specPath = path.join(targetDir, 'openapi.json');
      await fs.writeJSON(specPath, exampleSpec, { spaces: 2 });

      // Create package.json scripts
      const packagePath = path.join(targetDir, 'package.json');
      let packageJson: any = {};
      
      if (await fs.pathExists(packagePath)) {
        packageJson = await fs.readJSON(packagePath);
      }

      packageJson.scripts = {
        ...packageJson.scripts,
        'generate-api': 'openapi-gen generate -i openapi.json -o src/api',
        'generate-api-dev': 'openapi-gen generate -i openapi.json -o src/api --base-url http://localhost:3000/api'
      };

      await fs.writeJSON(packagePath, packageJson, { spaces: 2 });

      console.log('✅ Project initialized successfully!');
      console.log(`📁 Created files in: ${targetDir}`);
      console.log('📄 Files created:');
      console.log('   - openapi.json (example OpenAPI specification)');
      console.log('   - package.json (updated with generation scripts)');
      console.log();
      console.log('🚀 Next steps:');
      console.log('1. Edit openapi.json with your API specification');
      console.log('2. Run: npm run generate-api');
      console.log('3. Install dependencies: npm install zod @tanstack/react-query');

    } catch (error) {
      console.error('❌ Initialization failed:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

// Handle unrecognized commands
program.on('command:*', () => {
  console.error('❌ Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}

program.parse(process.argv);