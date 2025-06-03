import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class AttachmentsApi extends ApiClient {
  getAttachments(page?: string, limit?: string): Promise<Record<string, any>> {
    return this.get(
      `/attachments`,
      z.object({
        data: z.array(
          z.object({
            id: z.string().uuid(),
            filename: z.string().min(1),
            contentType: z.string().min(1),
            size: z.number().int().min(0),
            url: z.string().url(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
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

  postAttachments(): Promise<Record<string, any>> {
    return this.post(
      `/attachments`,
      z.object({
        attachment: z.object({
          id: z.string().uuid(),
          filename: z.string().min(1),
          contentType: z.string().min(1),
          size: z.number().int().min(0),
          url: z.string().url(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      })
    );
  }

  getAttachments(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/attachments/${id}`,
      z.object({
        attachment: z.object({
          id: z.string().uuid(),
          filename: z.string().min(1),
          contentType: z.string().min(1),
          size: z.number().int().min(0),
          url: z.string().url(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      })
    );
  }

  patchAttachments(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/attachments/${id}`,
      z.object({
        attachment: z.object({
          id: z.string().uuid(),
          filename: z.string().min(1),
          contentType: z.string().min(1),
          size: z.number().int().min(0),
          url: z.string().url(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          filename: z.string().min(1).optional(),
          description: z.string().optional(),
        }),
      }
    );
  }

  deleteAttachments(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/attachments/${id}`,
      z.object({
        success: z.boolean(),
        message: z.string(),
      })
    );
  }
}
