import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetUsersMeSubscriptionResponseSubscriptionType {
  id: string;
  accountId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerSubscriptionId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string;
  metadata:
    | string
    | number
    | boolean
    | unknown
    | Record<string, unknown>
    | unknown[]
    | unknown;
  createdAt: string;
  updatedAt: string;
}

export const GetUsersMeSubscriptionResponseSubscriptionTypeSchema = z.object({
  id: z.string().uuid(),
  accountId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerSubscriptionId: z.string(),
  status: z.string(),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean(),
  canceledAt: z.string(),
  metadata: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.unknown(),
    z.record(z.unknown()),
    z.array(z.unknown()),
    z.unknown(),
  ]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export class SubscriptionsApi extends ApiClient {
  getUsersMeSubscription(): Promise<Record<string, any>> {
    return this.get(
      `/users/me/subscription`,
      z.object({
        subscription: GetUsersMeSubscriptionResponseSubscriptionTypeSchema,
      })
    );
  }
}
