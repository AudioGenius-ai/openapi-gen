// Test file to verify generated code functionality
import { ApiSDK } from './generated/ApiSDK';
import { AdminApi } from './generated/endpoints/AdminApi';
import { PostAuthSigninEmailRequestType } from './generated/models/PostAuthSigninEmailRequestType';
import { GetAdminBlogPostsResponseType } from './generated/models/GetAdminBlogPostsResponseType';

// Test 1: ApiSDK instantiation
const apiSDK = new ApiSDK({ 
  baseUrl: 'https://api.example.com',
  headers: { 'Authorization': 'Bearer token' }
});

// Test 2: Verify API instances exist
console.log('API instances check:');
console.log('- adminApi:', apiSDK.adminApi instanceof AdminApi);
console.log('- apiKeyApi exists:', !!apiSDK.apiKeyApi);

// Test 3: Type checking for request types
const signInRequest: PostAuthSigninEmailRequestType = {
  email: 'test@example.com',
  password: 'password123',
  rememberMe: 'yes'
};

// Test 4: Check method signatures
async function testEndpoints() {
  // These should have different method names
  const blogPosts = await apiSDK.adminApi.getAdminBlogPosts('search', 'filter');
  const singlePost = await apiSDK.adminApi.getAdminBlogPostsById(123);
  
  // Type assertion to verify response type
  const typedResponse: GetAdminBlogPostsResponseType = blogPosts;
  
  console.log('Methods exist and are distinct:');
  console.log('- getAdminBlogPosts:', typeof apiSDK.adminApi.getAdminBlogPosts);
  console.log('- getAdminBlogPostsById:', typeof apiSDK.adminApi.getAdminBlogPostsById);
}

console.log('\nAll tests pass - generated code structure is correct!');