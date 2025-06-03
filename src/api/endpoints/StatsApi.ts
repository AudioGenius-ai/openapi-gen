import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class StatsApi extends ApiClient {
  getAdminStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/stats`,
      z.object({
        stats: z.object({
          users: z.object({
            total: z.number(),
            activeThisMonth: z.number(),
          }),
          organizations: z.object({
            total: z.number(),
            totalMembers: z.number(),
            avgMembersPerOrg: z.number(),
          }),
          apiKeys: z.object({
            total: z.number(),
            active: z.number(),
          }),
          payments: z.object({
            paymentAccounts: z.number(),
            activeSubscriptions: z.number(),
            revenue: z.object({
              total: z.number(),
              thisMonth: z.number(),
              lastMonth: z.number(),
              growthRate: z.string(),
            }),
          }),
          products: z.object({
            total: z.number(),
            byPlatform: z.record(z.number()),
          }),
          support: z.object({
            totalTickets: z.number(),
            openTickets: z.number(),
            resolvedTickets: z.number(),
            resolutionRate: z.string(),
          }),
          content: z.object({
            totalBlogPosts: z.number(),
            publishedPosts: z.number(),
            draftPosts: z.number(),
          }),
          mobile: z.object({
            totalDevices: z.number(),
            iosDevices: z.number(),
            androidDevices: z.number(),
          }),
          waitlist: z.object({
            total: z.number(),
            verified: z.number(),
            conversionRate: z.string(),
          }),
        }),
      })
    );
  }
}
