import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetBlogPostsResponseDataItemAuthorType {
  id: string;
  name: string;
  image?: string;
}

export const GetBlogPostsResponseDataItemAuthorTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().optional(),
});

export interface GetBlogPostsResponseDataItemCategoriesItemType {
  id: string;
  name: string;
  slug: string;
}

export const GetBlogPostsResponseDataItemCategoriesItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface GetBlogPostsResponseDataItemTagsItemType {
  id: string;
  name: string;
  slug: string;
}

export const GetBlogPostsResponseDataItemTagsItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface GetBlogPostsResponseDataItemType {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedAt?: string;
  featuredImageUrl?: string;
  author?: GetBlogPostsResponseDataItemAuthorType;
  categories?: GetBlogPostsResponseDataItemCategoriesItemType[];
  tags?: GetBlogPostsResponseDataItemTagsItemType[];
}

export const GetBlogPostsResponseDataItemTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  publishedAt: z.string().optional(),
  featuredImageUrl: z.string().url().optional(),
  author: GetBlogPostsResponseDataItemAuthorTypeSchema.optional(),
  categories: z
    .array(GetBlogPostsResponseDataItemCategoriesItemTypeSchema)
    .optional(),
  tags: z.array(GetBlogPostsResponseDataItemTagsItemTypeSchema).optional(),
});

export interface GetBlogPostsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetBlogPostsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface GetBlogPostsResponsePostAuthorType {
  id: string;
  name: string;
  image?: string;
}

export const GetBlogPostsResponsePostAuthorTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().optional(),
});

export interface GetBlogPostsResponsePostCategoriesItemType {
  id: string;
  name: string;
  slug: string;
}

export const GetBlogPostsResponsePostCategoriesItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface GetBlogPostsResponsePostTagsItemType {
  id: string;
  name: string;
  slug: string;
}

export const GetBlogPostsResponsePostTagsItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface GetBlogPostsResponsePostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedAt?: string;
  featuredImageUrl?: string;
  author?: GetBlogPostsResponsePostAuthorType;
  categories?: GetBlogPostsResponsePostCategoriesItemType[];
  tags?: GetBlogPostsResponsePostTagsItemType[];
}

export const GetBlogPostsResponsePostTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  publishedAt: z.string().optional(),
  featuredImageUrl: z.string().url().optional(),
  author: GetBlogPostsResponsePostAuthorTypeSchema.optional(),
  categories: z
    .array(GetBlogPostsResponsePostCategoriesItemTypeSchema)
    .optional(),
  tags: z.array(GetBlogPostsResponsePostTagsItemTypeSchema).optional(),
});

export interface GetAdminBlogPostsResponsePostsItemType {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft';
  review;
  published;
  archived;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName?: string;
  authorImage?: string;
}

export const GetAdminBlogPostsResponsePostsItemTypeSchema = z.object({
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
});

export interface GetAdminBlogPostsResponsePaginationType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminBlogPostsResponsePaginationTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface GetAdminBlogPostsResponseCategoriesItemType {
  id: string;
  name: string;
  slug: string;
}

export const GetAdminBlogPostsResponseCategoriesItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface GetAdminBlogPostsResponseType {
  posts: GetAdminBlogPostsResponsePostsItemType[];
  pagination: GetAdminBlogPostsResponsePaginationType;
  categories: GetAdminBlogPostsResponseCategoriesItemType[];
}

export const GetAdminBlogPostsResponseTypeSchema = z.object({
  posts: z.array(GetAdminBlogPostsResponsePostsItemTypeSchema),
  pagination: GetAdminBlogPostsResponsePaginationTypeSchema,
  categories: z.array(GetAdminBlogPostsResponseCategoriesItemTypeSchema),
});

export interface PostAdminBlogPostsRequestType {
  title: string;
  content: string;
  featuredImageId?: string;
  excerpt?: string;
}

export const PostAdminBlogPostsRequestTypeSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  featuredImageId: z.string().uuid().optional(),
  excerpt: z.string().max(300).optional(),
});

export interface GetAdminBlogPostsResponsePostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft';
  review;
  published;
  archived;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName?: string;
  authorImage?: string;
}

export const GetAdminBlogPostsResponsePostTypeSchema = z.object({
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
});

export interface PatchAdminBlogPostsRequestType {
  title?: string;
  content?: string;
  status?: 'draft';
  review;
  published;
  archived;
  featuredImageId?: string;
  excerpt?: string;
  categoryIds?: string[];
  tagIds?: string[];
}

export const PatchAdminBlogPostsRequestTypeSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  status: z.enum(['draft', 'review', 'published', 'archived']).optional(),
  featuredImageId: z.string().uuid().optional(),
  excerpt: z.string().max(300).optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export interface PostAdminBlogPostsAutosaveRequestType {
  postId?: string;
  title: string;
  content?: string;
}

export const PostAdminBlogPostsAutosaveRequestTypeSchema = z.object({
  postId: z.string().optional(),
  title: z.string(),
  content: z.string().optional(),
});

export interface PostAdminBlogPostsAutosaveResponseType {
  success: boolean;
  postId?: string;
  savedAt?: string;
}

export const PostAdminBlogPostsAutosaveResponseTypeSchema = z.object({
  success: z.boolean(),
  postId: z.string().optional(),
  savedAt: z.string().optional(),
});

export interface GetAdminBlogCategoriesResponseCategoriesItemType {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string;
  createdAt: string;
  postCount: number;
}

export const GetAdminBlogCategoriesResponseCategoriesItemTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  parentId: z.string().uuid(),
  createdAt: z.string().datetime(),
  postCount: z.number(),
});

export interface GetAdminBlogCategoriesResponsePaginationType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminBlogCategoriesResponsePaginationTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface PostAdminBlogCategoriesRequestType {
  name: string;
  description?: string;
  parentId?: string;
}

export const PostAdminBlogCategoriesRequestTypeSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export interface PatchAdminBlogCategoriesRequestType {
  name?: string;
  description?: string;
  parentId?: string;
}

export const PatchAdminBlogCategoriesRequestTypeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export interface GetAdminBlogTagsResponseTagsItemType {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  postCount: number;
}

export const GetAdminBlogTagsResponseTagsItemTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string().datetime(),
  postCount: z.number(),
});

export interface GetAdminBlogTagsResponsePaginationType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminBlogTagsResponsePaginationTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export class BlogApi extends ApiClient {
  getBlogPosts(page?: number, limit?: number): Promise<Record<string, any>> {
    return this.get(
      `/blog/posts`,
      z.object({
        data: z.array(GetBlogPostsResponseDataItemTypeSchema),
        meta: GetBlogPostsResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit } }
    );
  }

  getBlogPosts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/blog/posts/${id}`,
      z.object({
        post: GetBlogPostsResponsePostTypeSchema,
      })
    );
  }

  getAdminBlogPosts(
    search?: string,
    filter?: string,
    category?: string,
    sort?: string,
    page?: number
  ): Promise<GetAdminBlogPostsResponseType> {
    return this.get(`/admin/blog/posts`, GetAdminBlogPostsResponseTypeSchema, {
      queryParams: { search, filter, category, sort, page },
    });
  }

  postAdminBlogPosts(
    data?: PostAdminBlogPostsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/posts`,
      z.object({
        postId: z.string(),
      }),
      { body: data, bodySchema: PostAdminBlogPostsRequestTypeSchema }
    );
  }

  getAdminBlogPosts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/posts/${id}`,
      z.object({
        post: GetAdminBlogPostsResponsePostTypeSchema,
      })
    );
  }

  patchAdminBlogPosts(
    id: string | number,
    data?: PatchAdminBlogPostsRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/posts/${id}`,
      z.object({
        postId: z.string(),
      }),
      { body: data, bodySchema: PatchAdminBlogPostsRequestTypeSchema }
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
    data?: PostAdminBlogPostsAutosaveRequestType
  ): Promise<PostAdminBlogPostsAutosaveResponseType> {
    return this.post(
      `/admin/blog/posts/autosave`,
      PostAdminBlogPostsAutosaveResponseTypeSchema,
      { body: data, bodySchema: PostAdminBlogPostsAutosaveRequestTypeSchema }
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
          GetAdminBlogCategoriesResponseCategoriesItemTypeSchema
        ),
        pagination: GetAdminBlogCategoriesResponsePaginationTypeSchema,
      }),
      { queryParams: { search, page } }
    );
  }

  postAdminBlogCategories(
    data?: PostAdminBlogCategoriesRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/categories`,
      z.object({
        categoryId: z.string(),
      }),
      { body: data, bodySchema: PostAdminBlogCategoriesRequestTypeSchema }
    );
  }

  patchAdminBlogCategories(
    id: string | number,
    data?: PatchAdminBlogCategoriesRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/categories/${id}`,
      z.object({
        categoryId: z.string(),
      }),
      { body: data, bodySchema: PatchAdminBlogCategoriesRequestTypeSchema }
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
        tags: z.array(GetAdminBlogTagsResponseTagsItemTypeSchema),
        pagination: GetAdminBlogTagsResponsePaginationTypeSchema,
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
