import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAdminPaymentsAppstoreWebhookValidateRequestType {
  platform: 'apple';
  google;
  payload: Record<string, unknown>;
  signature?: string;
}

export const PostAdminPaymentsAppstoreWebhookValidateRequestTypeSchema =
  z.object({
    platform: z.enum(['apple', 'google']),
    payload: z.record(z.unknown()),
    signature: z.string().optional(),
  });

export interface PostAdminPaymentsAppstoreWebhookValidateResponseType {
  valid: boolean;
  platform: string;
  processedData?: unknown;
  timestamp: string;
}

export const PostAdminPaymentsAppstoreWebhookValidateResponseTypeSchema =
  z.object({
    valid: z.boolean(),
    platform: z.string(),
    processedData: z.unknown().optional(),
    timestamp: z.string(),
  });

export class WebhooksApi extends ApiClient {
  postAdminPaymentsAppstoreWebhookValidate(
    data: PostAdminPaymentsAppstoreWebhookValidateRequestType
  ): Promise<PostAdminPaymentsAppstoreWebhookValidateResponseType> {
    return this.post(
      `/admin/payments/appstore/webhook/validate`,
      PostAdminPaymentsAppstoreWebhookValidateResponseTypeSchema,
      {
        body: data,
        bodySchema: PostAdminPaymentsAppstoreWebhookValidateRequestTypeSchema,
      }
    );
  }
}
