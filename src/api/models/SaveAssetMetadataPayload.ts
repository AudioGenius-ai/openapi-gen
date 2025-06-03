import { z } from 'zod';

export const SaveAssetMetadataPayloadSchema = z.object({
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
});

export type SaveAssetMetadataPayload = z.infer<
  typeof SaveAssetMetadataPayloadSchema
>;
