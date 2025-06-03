import { z } from 'zod';

export const ChatStreamSchema = z.string();

export type ChatStream = z.infer<typeof ChatStreamSchema>;
