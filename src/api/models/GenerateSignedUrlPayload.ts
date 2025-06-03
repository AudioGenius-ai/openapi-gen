import { z } from 'zod';

export const GenerateSignedUrlPayloadSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
});

export type GenerateSignedUrlPayload = z.infer<
  typeof GenerateSignedUrlPayloadSchema
>;
