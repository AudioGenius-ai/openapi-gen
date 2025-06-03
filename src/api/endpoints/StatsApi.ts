import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminStatsResponseStatsOrganizationsType {
  total: number;
  totalMembers: number;
  avgMembersPerOrg: number;
}

export const GetAdminStatsResponseStatsOrganizationsTypeSchema = z.object({
  total: z.number(),
  totalMembers: z.number(),
  avgMembersPerOrg: z.number(),
});

export interface GetAdminStatsResponseStatsPaymentsRevenueType {
  total: number;
  thisMonth: number;
  lastMonth: number;
  growthRate: string;
}

export const GetAdminStatsResponseStatsPaymentsRevenueTypeSchema = z.object({
  total: z.number(),
  thisMonth: z.number(),
  lastMonth: z.number(),
  growthRate: z.string(),
});

export interface GetAdminStatsResponseStatsPaymentsType {
  paymentAccounts: number;
  activeSubscriptions: number;
  revenue: GetAdminStatsResponseStatsPaymentsRevenueType;
}

export const GetAdminStatsResponseStatsPaymentsTypeSchema = z.object({
  paymentAccounts: z.number(),
  activeSubscriptions: z.number(),
  revenue: GetAdminStatsResponseStatsPaymentsRevenueTypeSchema,
});

export interface GetAdminStatsResponseStatsSupportType {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  resolutionRate: string;
}

export const GetAdminStatsResponseStatsSupportTypeSchema = z.object({
  totalTickets: z.number(),
  openTickets: z.number(),
  resolvedTickets: z.number(),
  resolutionRate: z.string(),
});

export interface GetAdminStatsResponseStatsContentType {
  totalBlogPosts: number;
  publishedPosts: number;
  draftPosts: number;
}

export const GetAdminStatsResponseStatsContentTypeSchema = z.object({
  totalBlogPosts: z.number(),
  publishedPosts: z.number(),
  draftPosts: z.number(),
});

export interface GetAdminStatsResponseStatsMobileType {
  totalDevices: number;
  iosDevices: number;
  androidDevices: number;
}

export const GetAdminStatsResponseStatsMobileTypeSchema = z.object({
  totalDevices: z.number(),
  iosDevices: z.number(),
  androidDevices: z.number(),
});

export interface GetAdminStatsResponseStatsWaitlistType {
  total: number;
  verified: number;
  conversionRate: string;
}

export const GetAdminStatsResponseStatsWaitlistTypeSchema = z.object({
  total: z.number(),
  verified: z.number(),
  conversionRate: z.string(),
});

export interface GetAdminStatsResponseStatsType {
  users: Record<string, any>;
  organizations: GetAdminStatsResponseStatsOrganizationsType;
  apiKeys: Record<string, any>;
  payments: GetAdminStatsResponseStatsPaymentsType;
  products: Record<string, any>;
  support: GetAdminStatsResponseStatsSupportType;
  content: GetAdminStatsResponseStatsContentType;
  mobile: GetAdminStatsResponseStatsMobileType;
  waitlist: GetAdminStatsResponseStatsWaitlistType;
}

export const GetAdminStatsResponseStatsTypeSchema = z.object({
  users: z.object({
    total: z.number(),
    activeThisMonth: z.number(),
  }),
  organizations: GetAdminStatsResponseStatsOrganizationsTypeSchema,
  apiKeys: z.object({
    total: z.number(),
    active: z.number(),
  }),
  payments: GetAdminStatsResponseStatsPaymentsTypeSchema,
  products: z.object({
    total: z.number(),
    byPlatform: z.record(z.number()),
  }),
  support: GetAdminStatsResponseStatsSupportTypeSchema,
  content: GetAdminStatsResponseStatsContentTypeSchema,
  mobile: GetAdminStatsResponseStatsMobileTypeSchema,
  waitlist: GetAdminStatsResponseStatsWaitlistTypeSchema,
});

export class StatsApi extends ApiClient {
  getAdminStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/stats`,
      z.object({
        stats: GetAdminStatsResponseStatsTypeSchema,
      })
    );
  }
}
