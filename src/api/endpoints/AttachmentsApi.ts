import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAttachmentsResponseDataItemType {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAttachmentsResponseDataItemTypeSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().int().min(0),
  url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface GetAttachmentsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAttachmentsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface PostAttachmentsResponseAttachmentType {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export const PostAttachmentsResponseAttachmentTypeSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().int().min(0),
  url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface GetAttachmentsResponseAttachmentType {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAttachmentsResponseAttachmentTypeSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().int().min(0),
  url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface PatchAttachmentsResponseAttachmentType {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export const PatchAttachmentsResponseAttachmentTypeSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().int().min(0),
  url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export class AttachmentsApi extends ApiClient {
  getAttachments(page?: string, limit?: string): Promise<Record<string, any>> {
    return this.get(
      `/attachments`,
      z.object({
        data: z.array(GetAttachmentsResponseDataItemTypeSchema),
        meta: GetAttachmentsResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit } }
    );
  }

  postAttachments(): Promise<Record<string, any>> {
    return this.post(
      `/attachments`,
      z.object({
        attachment: PostAttachmentsResponseAttachmentTypeSchema,
      })
    );
  }

  getAttachments(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/attachments/${id}`,
      z.object({
        attachment: GetAttachmentsResponseAttachmentTypeSchema,
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
        attachment: PatchAttachmentsResponseAttachmentTypeSchema,
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
