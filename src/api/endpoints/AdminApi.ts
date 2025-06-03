import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class AdminApi extends ApiClient {
  setRole(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/set-role`,
      z.object({
        user: z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            email: z.string().optional(),
            emailVerified: z.boolean().optional(),
            image: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            isAnonymous: z.boolean().optional(),
            role: z.string().optional(),
            banned: z.boolean().optional(),
            banReason: z.string().optional(),
            banExpires: z.string().optional(),
            twoFactorEnabled: z.boolean().optional(),
            onboardingComplete: z.boolean().optional(),
          })
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
          role: z.string(),
        }),
      }
    );
  }

  createUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/create-user`,
      z.object({
        user: z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            email: z.string().optional(),
            emailVerified: z.boolean().optional(),
            image: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            isAnonymous: z.boolean().optional(),
            role: z.string().optional(),
            banned: z.boolean().optional(),
            banReason: z.string().optional(),
            banExpires: z.string().optional(),
            twoFactorEnabled: z.boolean().optional(),
            onboardingComplete: z.boolean().optional(),
          })
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
          role: z.string().optional(),
          data: z.string().optional(),
        }),
      }
    );
  }

  listUsers(
    searchValue?: string,
    searchField?: string,
    searchOperator?: string,
    limit?: string,
    offset?: string,
    sortBy?: string,
    sortDirection?: string,
    filterField?: string,
    filterValue?: string,
    filterOperator?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/auth/admin/list-users`,
      z.object({
        users: z.array(
          z.object({
            id: z.string().optional(),
            name: z.string().optional(),
            email: z.string().optional(),
            emailVerified: z.boolean().optional(),
            image: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            isAnonymous: z.boolean().optional(),
            role: z.string().optional(),
            banned: z.boolean().optional(),
            banReason: z.string().optional(),
            banExpires: z.string().optional(),
            twoFactorEnabled: z.boolean().optional(),
            onboardingComplete: z.boolean().optional(),
          })
        ),
        total: z.number(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }),
      {
        queryParams: {
          searchValue,
          searchField,
          searchOperator,
          limit,
          offset,
          sortBy,
          sortDirection,
          filterField,
          filterValue,
          filterOperator,
        },
      }
    );
  }

  listUserSessions(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/list-user-sessions`,
      z.object({
        sessions: z
          .array(
            z.object({
              id: z.string().optional(),
              expiresAt: z.string().optional(),
              token: z.string().optional(),
              createdAt: z.string().optional(),
              updatedAt: z.string().optional(),
              ipAddress: z.string().optional(),
              userAgent: z.string().optional(),
              userId: z.string().optional(),
              activeOrganizationId: z.string().optional(),
              impersonatedBy: z.string().optional(),
            })
          )
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  unbanUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/unban-user`,
      z.object({
        user: z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            email: z.string().optional(),
            emailVerified: z.boolean().optional(),
            image: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            isAnonymous: z.boolean().optional(),
            role: z.string().optional(),
            banned: z.boolean().optional(),
            banReason: z.string().optional(),
            banExpires: z.string().optional(),
            twoFactorEnabled: z.boolean().optional(),
            onboardingComplete: z.boolean().optional(),
          })
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  banUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/ban-user`,
      z.object({
        user: z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            email: z.string().optional(),
            emailVerified: z.boolean().optional(),
            image: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            isAnonymous: z.boolean().optional(),
            role: z.string().optional(),
            banned: z.boolean().optional(),
            banReason: z.string().optional(),
            banExpires: z.string().optional(),
            twoFactorEnabled: z.boolean().optional(),
            onboardingComplete: z.boolean().optional(),
          })
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
          banReason: z.string().optional(),
          banExpiresIn: z.string().optional(),
        }),
      }
    );
  }

  impersonateUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/impersonate-user`,
      z.object({
        session: z
          .object({
            id: z.string().optional(),
            expiresAt: z.string().optional(),
            token: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            ipAddress: z.string().optional(),
            userAgent: z.string().optional(),
            userId: z.string().optional(),
            activeOrganizationId: z.string().optional(),
            impersonatedBy: z.string().optional(),
          })
          .optional(),
        user: z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            email: z.string().optional(),
            emailVerified: z.boolean().optional(),
            image: z.string().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            isAnonymous: z.boolean().optional(),
            role: z.string().optional(),
            banned: z.boolean().optional(),
            banReason: z.string().optional(),
            banExpires: z.string().optional(),
            twoFactorEnabled: z.boolean().optional(),
            onboardingComplete: z.boolean().optional(),
          })
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  postAuthAdminStopimpersonating(): Promise<unknown> {
    return this.post(`/auth/admin/stop-impersonating`, z.unknown());
  }

  revokeUserSession(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/revoke-user-session`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          sessionToken: z.string(),
        }),
      }
    );
  }

  revokeUserSessions(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/revoke-user-sessions`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  removeUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/remove-user`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  setUserPassword(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/set-user-password`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          newPassword: z.string(),
          userId: z.string(),
        }),
      }
    );
  }

  postAuthAdminHaspermission(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/has-permission`,
      z.object({
        error: z.string().optional(),
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          permission: z.object({}).optional(),
          permissions: z.object({}),
        }),
      }
    );
  }

  postAdminAssetsGenerateuploadurl(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/assets/generate-upload-url`,
      z.object({
        signedUrl: z.string().url(),
        key: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          filename: z.string().min(1),
          contentType: z.string().min(1),
        }),
      }
    );
  }

  postAdminAssets(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/admin/assets`,
      z.object({
        asset: z.object({
          id: z.string().uuid(),
          url: z.string(),
          filename: z.string(),
          alt: z.string(),
          assetType: z.enum(['image', 'video', 'document', 'audio']),
          mimeType: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          key: z.string().min(1),
          filename: z.string().min(1),
          contentType: z.string().min(1),
          fileSize: z.number().int().min(0),
          assetType: z.enum(['image', 'video', 'document', 'audio']),
          altText: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          width: z.number().int().min(0).optional(),
          height: z.number().int().min(0).optional(),
          duration: z.number().int().min(0).optional(),
        }),
      }
    );
  }

  getAdminAssetsList(
    page?: string,
    pageSize?: string,
    search?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/assets/list`,
      z.object({
        assets: z.array(
          z.object({
            id: z.string().uuid(),
            url: z.string(),
            filename: z.string(),
            alt: z.string(),
            assetType: z.enum(['image', 'video', 'document', 'audio']),
            mimeType: z.string(),
          })
        ),
        pagination: z.object({
          currentPage: z.number(),
          totalPages: z.number(),
          pageSize: z.number(),
          totalEntries: z.number(),
        }),
      }),
      { queryParams: { page, pageSize, search } }
    );
  }

  patchAdminAssets(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/assets/${id}`,
      z.object({
        assetId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          alt: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
        }),
      }
    );
  }

  deleteAdminAssets(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/assets/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminWaitlist(
    page?: string,
    pageSize?: string,
    search?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/waitlist`,
      z.object({
        entries: z.array(
          z.object({
            id: z.string().uuid(),
            email: z.string(),
            name: z.string().max(100),
            status: z.enum(['pending', 'approved', 'declined', 'invited']),
            createdAt: z.string(),
            updatedAt: z.string(),
            userId: z.string().uuid(),
            metadata: z.union([
              z.string(),
              z.number(),
              z.boolean(),
              z.unknown(),
              z.record(z.unknown()),
              z.array(z.unknown()),
              z.unknown(),
            ]),
            invitedAt: z.string(),
            responseAt: z.string(),
            referralCode: z.string().max(20),
            referredBy: z.string().uuid(),
            referralCount: z.number().int().min(-2147483648).max(2147483647),
          })
        ),
        pagination: z.object({
          currentPage: z.number(),
          totalPages: z.number(),
          pageSize: z.number(),
          totalEntries: z.number(),
        }),
      }),
      { queryParams: { page, pageSize, search, status } }
    );
  }

  patchAdminWaitlist(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/waitlist/${id}`,
      z.object({
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          intent: z.enum(['approve', 'decline', 'delete']),
        }),
      }
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

  getAdminCustomers(
    limit?: string,
    offset?: string,
    provider?: string,
    userId?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers`,
      z.object({
        customers: z.array(
          z.object({
            id: z.string().uuid(),
            userId: z.string().uuid(),
            provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
            providerCustomerId: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        pagination: z
          .object({
            total: z.number(),
            limit: z.number(),
            offset: z.number(),
          })
          .optional(),
      }),
      { queryParams: { limit, offset, provider, userId } }
    );
  }

  getAdminCustomers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers/${id}`,
      z.object({
        customer: z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
          providerCustomerId: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      })
    );
  }

  patchAdminCustomers(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/customers/${id}`,
      z.object({
        customer: z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
          providerCustomerId: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']).optional(),
          providerCustomerId: z.string().optional(),
        }),
      }
    );
  }

  getAdminCustomersProvider(
    providerCustomerId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers/provider/${providerCustomerId}`,
      z.object({
        customer: z.object({
          id: z.string().uuid(),
          userId: z.string().uuid(),
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
          providerCustomerId: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
      })
    );
  }

  getAdminPaymentsAppstoreAppleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/apple/products`,
      z.object({
        products: z.array(
          z.object({
            id: z.string(),
            appId: z.string(),
            productId: z.string(),
            name: z.string(),
            type: z.string(),
            price: z.number(),
            currency: z.string(),
            isActive: z.boolean(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          })
        ),
      })
    );
  }

  postAdminPaymentsAppstoreAppleProducts(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/apple/products`,
      z.object({
        product: z.object({
          id: z.string(),
          appId: z.string(),
          productId: z.string(),
          name: z.string(),
          type: z.string(),
          price: z.number(),
          currency: z.string(),
          isActive: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          appId: z.string().min(1),
          productId: z.string().min(1),
          name: z.string().min(1),
          type: z.enum([
            'consumable',
            'non_consumable',
            'auto_renewable_subscription',
            'non_renewable_subscription',
          ]),
          price: z.number().min(0),
          currency: z.string().min(3).max(3),
          familyId: z.string().optional(),
          reviewNotes: z.string().optional(),
        }),
      }
    );
  }

  putAdminPaymentsAppstoreAppleProducts(
    productId: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/apple/products/${productId}`,
      z.object({
        product: z.object({
          id: z.string(),
          appId: z.string(),
          productId: z.string(),
          name: z.string(),
          type: z.string(),
          price: z.number(),
          currency: z.string(),
          isActive: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          productId: z.string().min(1).optional(),
          name: z.string().min(1).optional(),
          type: z
            .enum([
              'consumable',
              'non_consumable',
              'auto_renewable_subscription',
              'non_renewable_subscription',
            ])
            .optional(),
          price: z.number().min(0).optional(),
          currency: z.string().min(3).max(3).optional(),
          familyId: z.string().optional(),
          reviewNotes: z.string().optional(),
        }),
      }
    );
  }

  getAdminPaymentsAppstoreGoogleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/google/products`,
      z.object({
        products: z.array(
          z.object({
            id: z.string(),
            packageName: z.string(),
            sku: z.string(),
            name: z.string(),
            type: z.string(),
            status: z.string(),
            price: z.number(),
            currency: z.string(),
            isActive: z.boolean(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          })
        ),
      })
    );
  }

  postAdminPaymentsAppstoreGoogleProducts(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/google/products`,
      z.object({
        product: z.object({
          id: z.string(),
          packageName: z.string(),
          sku: z.string(),
          name: z.string(),
          type: z.string(),
          status: z.string(),
          price: z.number(),
          currency: z.string(),
          isActive: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          packageName: z.string().min(1),
          sku: z.string().min(1),
          name: z.string().min(1),
          type: z.enum(['inapp', 'subs']),
          status: z.enum(['active', 'inactive']),
          price: z.number().min(0),
          currency: z.string().min(3).max(3),
          subscriptionPeriod: z.string().optional(),
          trialPeriod: z.string().optional(),
        }),
      }
    );
  }

  putAdminPaymentsAppstoreGoogleProducts(
    sku: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/google/products/${sku}`,
      z.object({
        product: z.object({
          id: z.string(),
          packageName: z.string(),
          sku: z.string(),
          name: z.string(),
          type: z.string(),
          status: z.string(),
          price: z.number(),
          currency: z.string(),
          isActive: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          sku: z.string().min(1).optional(),
          name: z.string().min(1).optional(),
          type: z.enum(['inapp', 'subs']).optional(),
          status: z.enum(['active', 'inactive']).optional(),
          price: z.number().min(0).optional(),
          currency: z.string().min(3).max(3).optional(),
          subscriptionPeriod: z.string().optional(),
          trialPeriod: z.string().optional(),
        }),
      }
    );
  }

  getAdminPaymentsAppstoreReviews(
    platform?: string,
    appId?: string,
    rating?: number,
    startDate?: string,
    endDate?: string,
    hasResponse?: boolean,
    page?: number,
    limit?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/reviews`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            platform: z.enum(['apple', 'google']),
            appId: z.string(),
            rating: z.number().min(1).max(5),
            title: z.string().optional(),
            content: z.string(),
            reviewerName: z.string().optional(),
            reviewDate: z.string().datetime(),
            version: z.string().optional(),
            language: z.string().optional(),
            territory: z.string().optional(),
            helpful: z.number().optional(),
            developerResponse: z.string().optional(),
            responseDate: z.string().datetime().optional(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      {
        queryParams: {
          platform,
          appId,
          rating,
          startDate,
          endDate,
          hasResponse,
          page,
          limit,
        },
      }
    );
  }

  postAdminPaymentsAppstoreReviewsRespond(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/reviews/respond`,
      z.object({
        success: z.boolean(),
        reviewId: z.string(),
        response: z.string(),
        responseDate: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          reviewId: z.string(),
          response: z.string().min(1).max(1000),
        }),
      }
    );
  }

  postAdminPaymentsAppstoreSync(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/sync`,
      z.object({
        platform: z.string(),
        appId: z.string(),
        synced: z.number(),
        created: z.number(),
        updated: z.number(),
        errors: z.array(z.string()),
        lastSyncAt: z.string().datetime(),
      }),
      {
        body: data,
        bodySchema: z.object({
          platform: z.enum(['apple', 'google']),
          appId: z.string().min(1),
          force: z.boolean().optional(),
        }),
      }
    );
  }

  postAdminPaymentsAppstoreWebhookValidate(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/webhook/validate`,
      z.object({
        valid: z.boolean(),
        platform: z.string(),
        processedData: z.unknown().optional(),
        timestamp: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          platform: z.enum(['apple', 'google']),
          payload: z.record(z.unknown()),
          signature: z.string().optional(),
        }),
      }
    );
  }

  getAdminPaymentsProducts(
    page?: number,
    limit?: number,
    search?: string,
    type?: string,
    platform?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().optional(),
            type: z.enum(['one-time', 'subscription']),
            prices: z.array(
              z.object({
                unitAmount: z.number().int().min(0),
                currency: z.string().min(3).max(3),
                recurringInterval: z
                  .enum(['day', 'week', 'month', 'year'])
                  .optional(),
                recurringIntervalCount: z.number().int().min(0).optional(),
                id: z.string().optional(),
                isDefault: z.boolean().optional(),
                trialPeriodDays: z.number().int().min(0).optional(),
              })
            ),
            features: z.array(z.string()).optional(),
            platforms: z.object({
              paymentProvider: z
                .object({
                  id: z.string(),
                  status: z.enum(['active', 'inactive']),
                })
                .and(z.object({}))
                .optional(),
              apple: z
                .object({
                  id: z.string(),
                  status: z.enum(['active', 'inactive']),
                })
                .and(
                  z.object({
                    appId: z.string(),
                  })
                )
                .optional(),
              google: z
                .object({
                  id: z.string(),
                  status: z.enum(['active', 'inactive']),
                })
                .and(
                  z.object({
                    sku: z.string(),
                    packageName: z.string(),
                  })
                )
                .optional(),
            }),
            metadata: z.record(z.unknown()).optional(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, search, type, platform } }
    );
  }

  postAdminPaymentsProducts(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/products`,
      z.object({
        result: z.object({
          success: z.boolean(),
          platforms: z.object({
            paymentProvider: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            apple: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            google: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
          }),
          errors: z.array(z.string()),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          type: z.enum(['one-time', 'subscription']),
          prices: z
            .array(
              z.object({
                unitAmount: z.number().int().min(0),
                currency: z.string().min(3).max(3),
                recurringInterval: z
                  .enum(['day', 'week', 'month', 'year'])
                  .optional(),
                recurringIntervalCount: z.number().int().min(0).optional(),
                id: z.string().optional(),
                isDefault: z.boolean().optional(),
                trialPeriodDays: z.number().int().min(0).optional(),
              })
            )
            .min(1),
          features: z.array(z.string()).optional(),
          platforms: z.object({
            enableAppStores: z.boolean(),
            enablePaymentProvider: z.boolean(),
            appleAppId: z.string().optional(),
            googlePackageName: z.string().optional(),
          }),
        }),
      }
    );
  }

  getAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}`,
      z.object({
        product: z.object({
          id: z.string(),
          name: z.string(),
          description: z.string().optional(),
          type: z.enum(['one-time', 'subscription']),
          prices: z.array(
            z.object({
              unitAmount: z.number().int().min(0),
              currency: z.string().min(3).max(3),
              recurringInterval: z
                .enum(['day', 'week', 'month', 'year'])
                .optional(),
              recurringIntervalCount: z.number().int().min(0).optional(),
              id: z.string().optional(),
              isDefault: z.boolean().optional(),
              trialPeriodDays: z.number().int().min(0).optional(),
            })
          ),
          features: z.array(z.string()).optional(),
          platforms: z.object({
            paymentProvider: z
              .object({
                id: z.string(),
                status: z.enum(['active', 'inactive']),
              })
              .and(z.object({}))
              .optional(),
            apple: z
              .object({
                id: z.string(),
                status: z.enum(['active', 'inactive']),
              })
              .and(
                z.object({
                  appId: z.string(),
                })
              )
              .optional(),
            google: z
              .object({
                id: z.string(),
                status: z.enum(['active', 'inactive']),
              })
              .and(
                z.object({
                  sku: z.string(),
                  packageName: z.string(),
                })
              )
              .optional(),
          }),
          metadata: z.record(z.unknown()).optional(),
        }),
      })
    );
  }

  putAdminPaymentsProducts(
    productId: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/products/${productId}`,
      z.object({
        result: z.object({
          success: z.boolean(),
          platforms: z.object({
            paymentProvider: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            apple: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            google: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
          }),
          errors: z.array(z.string()),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(1).optional(),
          description: z.string().optional(),
          type: z.enum(['one-time', 'subscription']).optional(),
          prices: z
            .array(
              z.object({
                unitAmount: z.number().int().min(0),
                currency: z.string().min(3).max(3),
                recurringInterval: z
                  .enum(['day', 'week', 'month', 'year'])
                  .optional(),
                recurringIntervalCount: z.number().int().min(0).optional(),
                id: z.string().optional(),
                isDefault: z.boolean().optional(),
                trialPeriodDays: z.number().int().min(0).optional(),
              })
            )
            .optional(),
          features: z.array(z.string()).optional(),
          platforms: z
            .object({
              enableAppStores: z.boolean(),
              enablePaymentProvider: z.boolean(),
              appleAppId: z.string().optional(),
              googlePackageName: z.string().optional(),
            })
            .optional(),
        }),
      }
    );
  }

  deleteAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.delete(
      `/admin/payments/products/${productId}`,
      z.object({
        result: z.object({
          success: z.boolean(),
          platforms: z.object({
            paymentProvider: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            apple: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
            google: z
              .object({
                success: z.boolean(),
                error: z.string().optional(),
                id: z.string().optional(),
              })
              .optional(),
          }),
          errors: z.array(z.string()),
        }),
      })
    );
  }

  postAdminPaymentsProductsSync(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/products/sync`,
      z.object({
        success: z.boolean(),
        synced: z.number(),
        errors: z.array(z.string()),
        message: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          platforms: z
            .object({
              enableAppStores: z.boolean(),
              enablePaymentProvider: z.boolean(),
              appleAppId: z.string().optional(),
              googlePackageName: z.string().optional(),
            })
            .and(z.unknown()),
        }),
      }
    );
  }

  getAdminPaymentsProductsPlatforms(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}/platforms`,
      z.object({
        productId: z.string(),
        platforms: z.object({
          paymentProvider: z
            .object({
              id: z.string(),
              status: z.enum(['active', 'inactive']),
            })
            .optional(),
          apple: z
            .object({
              id: z.string(),
              appId: z.string(),
              status: z.enum(['active', 'inactive']),
            })
            .optional(),
          google: z
            .object({
              sku: z.string(),
              packageName: z.string(),
              status: z.enum(['active', 'inactive']),
            })
            .optional(),
        }),
      })
    );
  }

  getAdminPaymentsProductsStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/stats`,
      z.object({
        stats: z.object({
          total: z.number(),
          byType: z.object({
            oneTime: z.number(),
            subscription: z.number(),
          }),
          byPlatform: z.object({
            paymentProvider: z.number(),
            apple: z.number(),
            google: z.number(),
          }),
          multiPlatform: z.number(),
        }),
      })
    );
  }

  getAdminPaymentsCustomers(
    page?: number,
    limit?: number,
    search?: string,
    platform?: string,
    sortBy?: string,
    sortOrder?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            userId: z.string(),
            email: z.string(),
            name: z.string(),
            platforms: z.object({
              stripe: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
              polarsh: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
              apple: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
              google: z
                .object({
                  customerId: z.string(),
                  status: z.string().optional(),
                  createdAt: z.string().optional(),
                  metadata: z.record(z.unknown()).optional(),
                })
                .optional(),
            }),
            totalRevenue: z.number(),
            totalTransactions: z.number(),
            activeSubscriptions: z.number(),
            createdAt: z.string(),
            lastTransactionAt: z.string(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, search, platform, sortBy, sortOrder } }
    );
  }

  getAdminPaymentsCustomersStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/stats`,
      z.object({
        stats: z.object({
          totalCustomers: z.number(),
          totalRevenue: z.number(),
          averageRevenue: z.number(),
          platformBreakdown: z.object({
            stripe: z.number(),
            polarsh: z.number(),
            apple: z.number(),
            google: z.number(),
          }),
          revenueByPlatform: z.object({
            stripe: z.number(),
            polarsh: z.number(),
            apple: z.number(),
            google: z.number(),
          }),
        }),
      })
    );
  }

  getAdminPaymentsCustomers(
    customerId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}`,
      z.object({
        customer: z.object({
          id: z.string(),
          userId: z.string(),
          email: z.string(),
          name: z.string(),
          platforms: z.object({
            stripe: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
            polarsh: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
            apple: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
            google: z
              .object({
                customerId: z.string(),
                status: z.string().optional(),
                createdAt: z.string().optional(),
                metadata: z.record(z.unknown()).optional(),
              })
              .optional(),
          }),
          totalRevenue: z.number(),
          totalTransactions: z.number(),
          activeSubscriptions: z.number(),
          createdAt: z.string(),
          lastTransactionAt: z.string(),
          recentTransactions: z.array(
            z.object({
              id: z.string(),
              platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
              amount: z.number(),
              currency: z.string(),
              status: z.string(),
              productName: z.string(),
              createdAt: z.string(),
            })
          ),
          subscriptions: z.array(
            z.object({
              id: z.string(),
              platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
              productName: z.string(),
              status: z.string(),
              amount: z.number(),
              currency: z.string(),
              interval: z.string(),
              currentPeriodEnd: z.string(),
            })
          ),
        }),
      })
    );
  }

  getAdminPaymentsCustomersTransactions(
    customerId: string | number,
    page?: number,
    limit?: number,
    platform?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}/transactions`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            platform: z.string(),
            amount: z.number(),
            currency: z.string(),
            status: z.string(),
            productName: z.string(),
            createdAt: z.string(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, platform, status } }
    );
  }

  getAdminPaymentsCustomersSubscriptions(
    customerId: string | number,
    status?: string,
    platform?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}/subscriptions`,
      z.object({
        subscriptions: z.array(
          z.object({
            id: z.string(),
            platform: z.string(),
            productName: z.string(),
            status: z.string(),
            amount: z.number(),
            currency: z.string(),
            interval: z.string(),
            currentPeriodEnd: z.string(),
          })
        ),
      }),
      { queryParams: { status, platform } }
    );
  }

  getAdminPaymentsTransactions(
    page?: number,
    limit?: number,
    platform?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/transactions`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            accountId: z.string(),
            subscriptionId: z.string(),
            provider: z.string(),
            providerTransactionId: z.string(),
            amount: z.number(),
            currency: z.string(),
            status: z.string(),
            createdAt: z.string(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      { queryParams: { page, limit, platform, status } }
    );
  }

  getAdminPaymentsTransactions(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/transactions/${id}`,
      z.object({
        transaction: z.object({
          id: z.string(),
          accountId: z.string(),
          subscriptionId: z.string(),
          provider: z.string(),
          providerTransactionId: z.string(),
          amount: z.number(),
          currency: z.string(),
          status: z.string(),
          createdAt: z.string(),
        }),
      })
    );
  }

  postAdminPaymentsTransactionsRefund(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/transactions/${id}/refund`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/products`,
      z.object({
        products: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
          })
        ),
      })
    );
  }

  getAdminProducts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/products/${id}`,
      z.object({
        product: z.object({
          id: z.string().uuid(),
          name: z.string(),
          description: z.string(),
          prices: z
            .array(
              z.object({
                id: z.string().uuid(),
                platformProductId: z.string().uuid(),
                platformPriceId: z.string(),
                unitAmount: z.number().int().min(-2147483648).max(2147483647),
                currency: z.string().max(3),
                billingPeriod: z.string(),
                recurringInterval: z.string(),
                recurringIntervalCount: z
                  .number()
                  .int()
                  .min(-2147483648)
                  .max(2147483647),
                trialPeriodDays: z
                  .number()
                  .int()
                  .min(-2147483648)
                  .max(2147483647),
                isDefault: z.boolean(),
                active: z.boolean(),
                metadata: z.record(z.unknown()).optional(),
                createdAt: z.string(),
                updatedAt: z.string(),
              })
            )
            .optional(),
        }),
      })
    );
  }

  getAdminSubscriptions(
    customerId?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/subscriptions`,
      z.object({
        subscriptions: z.array(
          z.object({
            id: z.string(),
            providerSubscriptionId: z.string(),
            accountId: z.string(),
            status: z.string(),
            periodStart: z.string(),
            periodEnd: z.string(),
          })
        ),
      }),
      { queryParams: { customerId, status } }
    );
  }

  getAdminUsers(): Promise<Record<string, any>> {
    return this.get(
      `/admin/users`,
      z.object({
        users: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string().max(100),
            email: z.string(),
            username: z.string().max(100),
            role: z.enum(['admin', 'user', 'support']).optional(),
            banned: z.boolean(),
            banReason: z.string(),
            banExpires: z.string(),
            onboardingComplete: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
            locale: z.string(),
          })
        ),
      })
    );
  }

  getAdminUsers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/users/${id}`,
      z.object({
        user: z.object({
          id: z.string().uuid(),
          name: z.string().max(100),
          email: z.string(),
          username: z.string().max(100),
          role: z.enum(['admin', 'user', 'support']).optional(),
          banned: z.boolean(),
          banReason: z.string(),
          banExpires: z.string(),
          onboardingComplete: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          locale: z.string(),
        }),
      })
    );
  }

  patchAdminUsers(
    id: string | number,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/users/${id}`,
      z.object({
        user: z.object({
          id: z.string().uuid(),
          name: z.string().max(100),
          email: z.string(),
          username: z.string().max(100),
          role: z.enum(['admin', 'user', 'support']).optional(),
          banned: z.boolean(),
          banReason: z.string(),
          banExpires: z.string(),
          onboardingComplete: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          locale: z.string(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
          username: z.string().optional(),
          role: z.enum(['admin', 'user', 'support']).optional(),
          banned: z.boolean().optional(),
          banReason: z.string().optional(),
          banExpires: z.string().datetime().optional(),
          onboardingComplete: z.boolean().optional(),
          locale: z.string().optional(),
        }),
      }
    );
  }

  deleteAdminUsers(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/users/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/stats`,
      z.object({
        stats: z.object({
          users: z.object({
            total: z.number(),
            activeThisMonth: z.number(),
          }),
          organizations: z.object({
            total: z.number(),
            totalMembers: z.number(),
            avgMembersPerOrg: z.number(),
          }),
          apiKeys: z.object({
            total: z.number(),
            active: z.number(),
          }),
          payments: z.object({
            paymentAccounts: z.number(),
            activeSubscriptions: z.number(),
            revenue: z.object({
              total: z.number(),
              thisMonth: z.number(),
              lastMonth: z.number(),
              growthRate: z.string(),
            }),
          }),
          products: z.object({
            total: z.number(),
            byPlatform: z.record(z.number()),
          }),
          support: z.object({
            totalTickets: z.number(),
            openTickets: z.number(),
            resolvedTickets: z.number(),
            resolutionRate: z.string(),
          }),
          content: z.object({
            totalBlogPosts: z.number(),
            publishedPosts: z.number(),
            draftPosts: z.number(),
          }),
          mobile: z.object({
            totalDevices: z.number(),
            iosDevices: z.number(),
            androidDevices: z.number(),
          }),
          waitlist: z.object({
            total: z.number(),
            verified: z.number(),
            conversionRate: z.string(),
          }),
        }),
      })
    );
  }
}
