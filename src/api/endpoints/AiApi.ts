import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class AiApi extends ApiClient {
  postAiChat(data?: Record<string, any>): Promise<unknown> {
    return this.post(`/ai/chat`, z.unknown(), {
      body: data,
      bodySchema: z.object({
        messages: z.array(
          z.object({
            role: z.enum(['user', 'assistant', 'system', 'tool']),
            content: z.string(),
            toolCallId: z.string().optional(),
            toolName: z.string().optional(),
          })
        ),
      }),
    });
  }

  postAiCompletion(data?: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/ai/completion`,
      z.object({
        completion: z.string(),
        usage: z
          .object({
            promptTokens: z.number(),
            completionTokens: z.number(),
            totalTokens: z.number(),
          })
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          prompt: z.string(),
          model: z.string().optional(),
          temperature: z.number().optional(),
          maxTokens: z.number().optional(),
        }),
      }
    );
  }
}
