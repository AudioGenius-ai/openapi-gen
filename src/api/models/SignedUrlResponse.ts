import { z } from 'zod';

export const SignedUrlResponseSchema = z.object({
  signedUrl: z.string().url(),
  key: z.string(),
});

export type SignedUrlResponse = z.infer<typeof SignedUrlResponseSchema>;
