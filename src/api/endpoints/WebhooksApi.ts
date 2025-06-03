import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class WebhooksApi extends ApiClient {
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
}
