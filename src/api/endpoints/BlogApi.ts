import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class BlogApi extends ApiClient {
  getBlogPosts(page?: number, limit?: number): Promise<Record<string, any>> {
    return this.get(
      `/blog/posts`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            slug: z.string(),
            content: z.string(),
            excerpt: z.string().optional(),
            publishedAt: z.string().optional(),
            featuredImageUrl: z.string().url().optional(),
            author: z
              .object({
                id: z.string(),
                name: z.string(),
                image: z.string().optional(),
              })
              .optional(),
            categories: z
              .array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  slug: z.string(),
                })
              )
              .optional(),
            tags: z
              .array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  slug: z.string(),
                })
              )
              .optional(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit } }
    );
  }

  getBlogPosts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/blog/posts/${id}`,
      z.object({
        post: z.object({
          id: z.string(),
          title: z.string(),
          slug: z.string(),
          content: z.string(),
          excerpt: z.string().optional(),
          publishedAt: z.string().optional(),
          featuredImageUrl: z.string().url().optional(),
          author: z
            .object({
              id: z.string(),
              name: z.string(),
              image: z.string().optional(),
            })
            .optional(),
          categories: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
                slug: z.string(),
              })
            )
            .optional(),
          tags: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
                slug: z.string(),
              })
            )
            .optional(),
        }),
      })
    );
  }

  getAdminBlogPosts(
    search?: string,
    filter?: string,
    category?: string,
    sort?: string,
    page?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/posts`,
      z.object({
        posts: z.array(
          z.object({
            id: z.string().uuid(),
            title: z.string(),
            slug: z.string(),
            content: z.string(),
            status: z.enum(['draft', 'review', 'published', 'archived']),
            createdAt: z.string(),
            updatedAt: z.string(),
            authorId: z.string().uuid(),
            authorName: z.string().optional(),
            authorImage: z.string().optional(),
          })
        ),
        pagination: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
        categories: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            slug: z.string(),
          })
        ),
      }),
      { queryParams: { search, filter, category, sort, page } }
    );
  }

  postAdminBlogPosts(data?: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/posts`,
      z.object({
        postId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          title: z.string().min(3),
          content: z.string().min(10),
          featuredImageId: z.string().uuid().optional(),
          excerpt: z.string().max(300).optional(),
        }),
      }
    );
  }

  getAdminBlogPosts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/posts/${id}`,
      z.object({
        post: z.object({
          id: z.string().uuid(),
          title: z.string(),
          slug: z.string(),
          content: z.string(),
          status: z.enum(['draft', 'review', 'published', 'archived']),
          createdAt: z.string(),
          updatedAt: z.string(),
          authorId: z.string().uuid(),
          authorName: z.string().optional(),
          authorImage: z.string().optional(),
        }),
      })
    );
  }

  patchAdminBlogPosts(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/posts/${id}`,
      z.object({
        postId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          title: z.string().min(3).optional(),
          content: z.string().min(10).optional(),
          status: z
            .enum(['draft', 'review', 'published', 'archived'])
            .optional(),
          featuredImageId: z.string().uuid().optional(),
          excerpt: z.string().max(300).optional(),
          categoryIds: z.array(z.string()).optional(),
          tagIds: z.array(z.string()).optional(),
        }),
      }
    );
  }

  deleteAdminBlogPosts(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/blog/posts/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postAdminBlogPostsAutosave(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/posts/autosave`,
      z.object({
        success: z.boolean(),
        postId: z.string().optional(),
        savedAt: z.string().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          postId: z.string().optional(),
          title: z.string(),
          content: z.string().optional(),
        }),
      }
    );
  }

  getAdminBlogCategories(
    search?: string,
    page?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/categories`,
      z.object({
        categories: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            slug: z.string(),
            description: z.string(),
            parentId: z.string().uuid(),
            createdAt: z.string().datetime(),
            postCount: z.number(),
          })
        ),
        pagination: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { search, page } }
    );
  }

  postAdminBlogCategories(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/categories`,
      z.object({
        categoryId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(2),
          description: z.string().optional(),
          parentId: z.string().uuid().optional(),
        }),
      }
    );
  }

  patchAdminBlogCategories(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/categories/${id}`,
      z.object({
        categoryId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().optional(),
          description: z.string().optional(),
          parentId: z.string().uuid().optional(),
        }),
      }
    );
  }

  deleteAdminBlogCategories(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/blog/categories/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminBlogTags(
    search?: string,
    page?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/tags`,
      z.object({
        tags: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            slug: z.string(),
            createdAt: z.string().datetime(),
            postCount: z.number(),
          })
        ),
        pagination: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { search, page } }
    );
  }

  postAdminBlogTags(data?: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/tags`,
      z.object({
        tagId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(2),
        }),
      }
    );
  }

  patchAdminBlogTags(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/tags/${id}`,
      z.object({
        tagId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().optional(),
        }),
      }
    );
  }

  deleteAdminBlogTags(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/blog/tags/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }
}
