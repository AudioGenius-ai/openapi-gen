import { z } from 'zod';

export const ValidateWebhookInputSchema = z.object({
  platform: z.enum(['apple', 'google']),
  payload: z.record(z.unknown()),
  signature: z.string().optional(),
});

export type ValidateWebhookInput = z.infer<typeof ValidateWebhookInputSchema>;
