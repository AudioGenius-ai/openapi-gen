import { z } from 'zod';

export const BlogAssetResponseSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  filename: z.string(),
  alt: z.string(),
  assetType: z.enum(['image', 'video', 'document', 'audio']),
  mimeType: z.string(),
});

export type BlogAssetResponse = z.infer<typeof BlogAssetResponseSchema>;
