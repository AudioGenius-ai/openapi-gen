import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface GetAdminPaymentsAppstoreReviewsResponseDataItemType {
  id: string;
  platform: 'apple';
  google;
  appId: string;
  rating: number;
  title?: string;
  content: string;
  reviewerName?: string;
  reviewDate: string;
  version?: string;
  language?: string;
  territory?: string;
  helpful?: number;
  developerResponse?: string;
  responseDate?: string;
}

export const GetAdminPaymentsAppstoreReviewsResponseDataItemTypeSchema =
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
  });

export interface GetAdminPaymentsAppstoreReviewsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsAppstoreReviewsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface PostAdminPaymentsAppstoreReviewsRespondResponseType {
  success: boolean;
  reviewId: string;
  response: string;
  responseDate: string;
}

export const PostAdminPaymentsAppstoreReviewsRespondResponseTypeSchema =
  z.object({
    success: z.boolean(),
    reviewId: z.string(),
    response: z.string(),
    responseDate: z.string(),
  });

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
          GetAdminPaymentsAppstoreReviewsResponseDataItemTypeSchema
        ),
        meta: GetAdminPaymentsAppstoreReviewsResponseMetaTypeSchema,
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
  ): Promise<PostAdminPaymentsAppstoreReviewsRespondResponseType> {
    return this.post(
      `/admin/payments/appstore/reviews/respond`,
      PostAdminPaymentsAppstoreReviewsRespondResponseTypeSchema,
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
