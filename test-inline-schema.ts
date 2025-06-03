import { EndpointGenerator } from './src/generator/endpoint-generator';
import { HooksGenerator } from './src/generator/hooks-generator';
import { OpenAPIParser } from './src/utils/openapi-parser';

// Test case showing the issue with inline object schemas
const testOperation = {
  operationId: 'testInlineObject',
  method: 'GET',
  path: '/test',
  responses: {
    '200': {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' }
            },
            required: ['id', 'name']
          }
        }
      }
    }
  }
};

const parser = new OpenAPIParser();
const endpointGenerator = new EndpointGenerator(parser);
const hooksGenerator = new HooksGenerator();

// Generate the method
const method = endpointGenerator.generateMethod(testOperation);
console.log('Generated method:', JSON.stringify(method, null, 2));

// Generate the hook
const hooks = hooksGenerator.generateHooksForTag(
  [testOperation],
  'test',
  'TestApi',
  [method]
);

console.log('\nGenerated hook content:');
console.log(hooks.content);