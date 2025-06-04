// Test React hooks functionality
import React from 'react';
import { useGetAdminBlogPosts, usePostAdminBlogPosts } from './generated/hooks/Admin';
import { usePostAuthApikeyCreate } from './generated/hooks/Api-key';
import type { PostAdminBlogPostsRequestType } from './generated/models';

function TestComponent() {
  // Test 1: Query hook with proper types
  const { data: blogPosts, isLoading } = useGetAdminBlogPosts({
    search: 'test',
    page: 1
  });

  // Test 2: Mutation hook with proper types
  const createPostMutation = usePostAdminBlogPosts({
    onSuccess: (data) => {
      console.log('Post created:', data);
    }
  });

  // Test 3: API key hook - verifies correct API instance naming
  const createApiKeyMutation = usePostAuthApikeyCreate({
    onSuccess: (response) => {
      console.log('API key created:', response);
    }
  });

  const handleCreatePost = () => {
    const newPost: PostAdminBlogPostsRequestType = {
      title: 'Test Post',
      content: 'This is test content for the blog post',
      excerpt: 'A brief excerpt'
    };
    
    createPostMutation.mutate({ data: newPost });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogPosts?.posts?.map((post, idx) => (
        <div key={idx}>{post.title}</div>
      ))}
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
}

export default TestComponent;