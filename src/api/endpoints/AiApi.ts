import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAiChatRequestMessagesItemType {
  role: 'user';
  assistant;
  system;
  tool;
  content: string;
  toolCallId?: string;
  toolName?: string;
}

export const PostAiChatRequestMessagesItemTypeSchema = z.object({
  role: z.enum(['user', 'assistant', 'system', 'tool']),
  content: z.string(),
  toolCallId: z.string().optional(),
  toolName: z.string().optional(),
});

export interface PostAiCompletionRequestType {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export const PostAiCompletionRequestTypeSchema = z.object({
  prompt: z.string(),
  model: z.string().optional(),
  temperature: z.number().optional(),
  maxTokens: z.number().optional(),
});

export interface PostAiCompletionResponseUsageType {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export const PostAiCompletionResponseUsageTypeSchema = z.object({
  promptTokens: z.number(),
  completionTokens: z.number(),
  totalTokens: z.number(),
});

export class AiApi extends ApiClient {
  postAiChat(data?: Record<string, any>): Promise<unknown> {
    return this.post(`/ai/chat`, z.unknown(), {
      body: data,
      bodySchema: z.object({
        messages: z.array(PostAiChatRequestMessagesItemTypeSchema),
      }),
    });
  }

  postAiCompletion(
    data?: PostAiCompletionRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/ai/completion`,
      z.object({
        completion: z.string(),
        usage: PostAiCompletionResponseUsageTypeSchema.optional(),
      }),
      { body: data, bodySchema: PostAiCompletionRequestTypeSchema }
    );
  }
}
