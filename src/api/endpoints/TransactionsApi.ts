import { ApiClient } from '../ApiClient';
import { z } from 'zod';

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
        data: z.array(
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
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
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
        transaction: z.object({
          id: z.string(),
          accountId: z.string(),
          subscriptionId: z.string(),
          provider: z.string(),
          providerTransactionId: z.string(),
          amount: z.number(),
          currency: z.string(),
          status: z.string(),
          createdAt: z.string(),
        }),
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
