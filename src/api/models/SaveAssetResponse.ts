import { z } from 'zod';

export const SaveAssetResponseSchema = z.object({
  asset: z.object({
    id: z.string().uuid(),
    url: z.string(),
    filename: z.string(),
    alt: z.string(),
    assetType: z.enum(['image', 'video', 'document', 'audio']),
    mimeType: z.string(),
  }),
});

export type SaveAssetResponse = z.infer<typeof SaveAssetResponseSchema>;
