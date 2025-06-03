import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminPaymentsTransactionsResponseDataItemType {
  id: string;
  accountId: string;
  subscriptionId: string;
  provider: string;
  providerTransactionId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export const GetAdminPaymentsTransactionsResponseDataItemTypeSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  subscriptionId: z.string(),
  provider: z.string(),
  providerTransactionId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

export interface GetAdminPaymentsTransactionsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsTransactionsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface GetAdminPaymentsTransactionsResponseTransactionType {
  id: string;
  accountId: string;
  subscriptionId: string;
  provider: string;
  providerTransactionId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export const GetAdminPaymentsTransactionsResponseTransactionTypeSchema =
  z.object({
    id: z.string(),
    accountId: z.string(),
    subscriptionId: z.string(),
    provider: z.string(),
    providerTransactionId: z.string(),
    amount: z.number(),
    currency: z.string(),
    status: z.string(),
    createdAt: z.string(),
  });

export class TransactionsApi extends ApiClient {
  getAdminPaymentsTransactions(
    page?: number,
    limit?: number,
    platform?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/transactions`,
      z.object({
        data: z.array(GetAdminPaymentsTransactionsResponseDataItemTypeSchema),
        meta: GetAdminPaymentsTransactionsResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit, platform, status } }
    );
  }

  getAdminPaymentsTransactions(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/transactions/${id}`,
      z.object({
        transaction: GetAdminPaymentsTransactionsResponseTransactionTypeSchema,
      })
    );
  }

  postAdminPaymentsTransactionsRefund(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/transactions/${id}/refund`,
      z.object({
        success: z.boolean(),
      })
    );
  }
}
