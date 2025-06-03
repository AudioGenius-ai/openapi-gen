import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class ReviewsApi extends ApiClient {
  getAdminPaymentsAppstoreReviews(
    platform?: string,
    appId?: string,
    rating?: number,
    startDate?: string,
    endDate?: string,
    hasResponse?: boolean,
    page?: number,
    limit?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/reviews`,
      z.object({
        data: z.array(
          z.object({
            id: z.string(),
            platform: z.enum(['apple', 'google']),
            appId: z.string(),
            rating: z.number().min(1).max(5),
            title: z.string().optional(),
            content: z.string(),
            reviewerName: z.string().optional(),
            reviewDate: z.string().datetime(),
            version: z.string().optional(),
            language: z.string().optional(),
            territory: z.string().optional(),
            helpful: z.number().optional(),
            developerResponse: z.string().optional(),
            responseDate: z.string().datetime().optional(),
          })
        ),
        meta: z.object({
          total: z.number(),
          pages: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      }),
      {
        queryParams: {
          platform,
          appId,
          rating,
          startDate,
          endDate,
          hasResponse,
          page,
          limit,
        },
      }
    );
  }

  postAdminPaymentsAppstoreReviewsRespond(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/reviews/respond`,
      z.object({
        success: z.boolean(),
        reviewId: z.string(),
        response: z.string(),
        responseDate: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          reviewId: z.string(),
          response: z.string().min(1).max(1000),
        }),
      }
    );
  }
}
