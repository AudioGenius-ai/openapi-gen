import { z } from 'zod';

export const UpdateTagPayloadSchema = z.object({
  name: z.string().optional(),
});

export type UpdateTagPayload = z.infer<typeof UpdateTagPayloadSchema>;
