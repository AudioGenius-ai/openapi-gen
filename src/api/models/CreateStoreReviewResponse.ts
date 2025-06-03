import { z } from 'zod';

export const CreateStoreReviewResponseSchema = z.object({
  reviewId: z.string(),
  response: z.string().min(1).max(1000),
});

export type CreateStoreReviewResponse = z.infer<
  typeof CreateStoreReviewResponseSchema
>;
