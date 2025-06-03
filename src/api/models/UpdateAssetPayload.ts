import { z } from 'zod';

export const UpdateAssetPayloadSchema = z.object({
  alt: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateAssetPayload = z.infer<typeof UpdateAssetPayloadSchema>;
