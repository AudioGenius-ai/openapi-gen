import { z } from 'zod';

export const StoreReviewSchema = z.object({
  id: z.string(),
  platform: z.enum(['apple', 'google']),
  appId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string(),
  reviewerName: z.string().optional(),
  reviewDate: z.string().datetime(),
  version: z.string().optional(),
  language: z.string().optional(),
  territory: z.string().optional(),
  helpful: z.number().optional(),
  developerResponse: z.string().optional(),
  responseDate: z.string().datetime().optional(),
});

export type StoreReview = z.infer<typeof StoreReviewSchema>;
