import { z } from 'zod';

export const UpdateCategoryPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export type UpdateCategoryPayload = z.infer<typeof UpdateCategoryPayloadSchema>;
