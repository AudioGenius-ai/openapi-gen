import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface SetRoleResponseUserType {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  isAnonymous?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  twoFactorEnabled?: boolean;
  onboardingComplete?: boolean;
}

export const SetRoleResponseUserTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export interface CreateUserRequestType {
  email: string;
  password: string;
  name: string;
  role?: string;
  data?: string;
}

export const CreateUserRequestTypeSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string().optional(),
  data: z.string().optional(),
});

export interface CreateUserResponseUserType {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  isAnonymous?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  twoFactorEnabled?: boolean;
  onboardingComplete?: boolean;
}

export const CreateUserResponseUserTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export interface ListUsersResponseUsersItemType {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  isAnonymous?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  twoFactorEnabled?: boolean;
  onboardingComplete?: boolean;
}

export const ListUsersResponseUsersItemTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export interface ListUsersResponseType {
  users: ListUsersResponseUsersItemType[];
  total: number;
  limit?: number;
  offset?: number;
}

export const ListUsersResponseTypeSchema = z.object({
  users: z.array(ListUsersResponseUsersItemTypeSchema),
  total: z.number(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export interface ListUserSessionsResponseSessionsItemType {
  id?: string;
  expiresAt?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
  activeOrganizationId?: string;
  impersonatedBy?: string;
}

export const ListUserSessionsResponseSessionsItemTypeSchema = z.object({
  id: z.string().optional(),
  expiresAt: z.string().optional(),
  token: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  userId: z.string().optional(),
  activeOrganizationId: z.string().optional(),
  impersonatedBy: z.string().optional(),
});

export interface UnbanUserResponseUserType {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  isAnonymous?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  twoFactorEnabled?: boolean;
  onboardingComplete?: boolean;
}

export const UnbanUserResponseUserTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export interface BanUserRequestType {
  userId: string;
  banReason?: string;
  banExpiresIn?: string;
}

export const BanUserRequestTypeSchema = z.object({
  userId: z.string(),
  banReason: z.string().optional(),
  banExpiresIn: z.string().optional(),
});

export interface BanUserResponseUserType {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  isAnonymous?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  twoFactorEnabled?: boolean;
  onboardingComplete?: boolean;
}

export const BanUserResponseUserTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export interface ImpersonateUserResponseSessionType {
  id?: string;
  expiresAt?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
  activeOrganizationId?: string;
  impersonatedBy?: string;
}

export const ImpersonateUserResponseSessionTypeSchema = z.object({
  id: z.string().optional(),
  expiresAt: z.string().optional(),
  token: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  userId: z.string().optional(),
  activeOrganizationId: z.string().optional(),
  impersonatedBy: z.string().optional(),
});

export interface ImpersonateUserResponseUserType {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  isAnonymous?: boolean;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  twoFactorEnabled?: boolean;
  onboardingComplete?: boolean;
}

export const ImpersonateUserResponseUserTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isAnonymous: z.boolean().optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
});

export interface PostAdminAssetsRequestType {
  key: string;
  filename: string;
  contentType: string;
  fileSize: number;
  assetType: 'image';
  video;
  document;
  audio;
  altText?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  duration?: number;
}

export const PostAdminAssetsRequestTypeSchema = z.object({
  key: z.string().min(1),
  filename: z.string().min(1),
  contentType: z.string().min(1),
  fileSize: z.number().int().min(0),
  assetType: z.enum(['image', 'video', 'document', 'audio']),
  altText: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  width: z.number().int().min(0).optional(),
  height: z.number().int().min(0).optional(),
  duration: z.number().int().min(0).optional(),
});

export interface PostAdminAssetsResponseAssetType {
  id: string;
  url: string;
  filename: string;
  alt: string;
  assetType: 'image';
  video;
  document;
  audio;
  mimeType: string;
}

export const PostAdminAssetsResponseAssetTypeSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  filename: z.string(),
  alt: z.string(),
  assetType: z.enum(['image', 'video', 'document', 'audio']),
  mimeType: z.string(),
});

export interface GetAdminAssetsListResponseAssetsItemType {
  id: string;
  url: string;
  filename: string;
  alt: string;
  assetType: 'image';
  video;
  document;
  audio;
  mimeType: string;
}

export const GetAdminAssetsListResponseAssetsItemTypeSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  filename: z.string(),
  alt: z.string(),
  assetType: z.enum(['image', 'video', 'document', 'audio']),
  mimeType: z.string(),
});

export interface GetAdminAssetsListResponsePaginationType {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalEntries: number;
}

export const GetAdminAssetsListResponsePaginationTypeSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  pageSize: z.number(),
  totalEntries: z.number(),
});

export interface PatchAdminAssetsRequestType {
  alt?: string;
  title?: string;
  description?: string;
}

export const PatchAdminAssetsRequestTypeSchema = z.object({
  alt: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export interface GetAdminWaitlistResponseEntriesItemType {
  id: string;
  email: string;
  name: string;
  status: 'pending';
  approved;
  declined;
  invited;
  createdAt: string;
  updatedAt: string;
  userId: string;
  metadata:
    | string
    | number
    | boolean
    | unknown
    | Record<string, unknown>
    | unknown[]
    | unknown;
  invitedAt: string;
  responseAt: string;
  referralCode: string;
  referredBy: string;
  referralCount: number;
}

export const GetAdminWaitlistResponseEntriesItemTypeSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().max(100),
  status: z.enum(['pending', 'approved', 'declined', 'invited']),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string().uuid(),
  metadata: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.unknown(),
    z.record(z.unknown()),
    z.array(z.unknown()),
    z.unknown(),
  ]),
  invitedAt: z.string(),
  responseAt: z.string(),
  referralCode: z.string().max(20),
  referredBy: z.string().uuid(),
  referralCount: z.number().int().min(-2147483648).max(2147483647),
});

export interface GetAdminWaitlistResponsePaginationType {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalEntries: number;
}

export const GetAdminWaitlistResponsePaginationTypeSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  pageSize: z.number(),
  totalEntries: z.number(),
});

export interface GetAdminBlogPostsResponsePostsItemType {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft';
  review;
  published;
  archived;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName?: string;
  authorImage?: string;
}

export const GetAdminBlogPostsResponsePostsItemTypeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  status: z.enum(['draft', 'review', 'published', 'archived']),
  createdAt: z.string(),
  updatedAt: z.string(),
  authorId: z.string().uuid(),
  authorName: z.string().optional(),
  authorImage: z.string().optional(),
});

export interface GetAdminBlogPostsResponsePaginationType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminBlogPostsResponsePaginationTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface GetAdminBlogPostsResponseCategoriesItemType {
  id: string;
  name: string;
  slug: string;
}

export const GetAdminBlogPostsResponseCategoriesItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface GetAdminBlogPostsResponseType {
  posts: GetAdminBlogPostsResponsePostsItemType[];
  pagination: GetAdminBlogPostsResponsePaginationType;
  categories: GetAdminBlogPostsResponseCategoriesItemType[];
}

export const GetAdminBlogPostsResponseTypeSchema = z.object({
  posts: z.array(GetAdminBlogPostsResponsePostsItemTypeSchema),
  pagination: GetAdminBlogPostsResponsePaginationTypeSchema,
  categories: z.array(GetAdminBlogPostsResponseCategoriesItemTypeSchema),
});

export interface PostAdminBlogPostsRequestType {
  title: string;
  content: string;
  featuredImageId?: string;
  excerpt?: string;
}

export const PostAdminBlogPostsRequestTypeSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  featuredImageId: z.string().uuid().optional(),
  excerpt: z.string().max(300).optional(),
});

export interface GetAdminBlogPostsResponsePostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft';
  review;
  published;
  archived;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName?: string;
  authorImage?: string;
}

export const GetAdminBlogPostsResponsePostTypeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  status: z.enum(['draft', 'review', 'published', 'archived']),
  createdAt: z.string(),
  updatedAt: z.string(),
  authorId: z.string().uuid(),
  authorName: z.string().optional(),
  authorImage: z.string().optional(),
});

export interface PatchAdminBlogPostsRequestType {
  title?: string;
  content?: string;
  status?: 'draft';
  review;
  published;
  archived;
  featuredImageId?: string;
  excerpt?: string;
  categoryIds?: string[];
  tagIds?: string[];
}

export const PatchAdminBlogPostsRequestTypeSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  status: z.enum(['draft', 'review', 'published', 'archived']).optional(),
  featuredImageId: z.string().uuid().optional(),
  excerpt: z.string().max(300).optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export interface PostAdminBlogPostsAutosaveRequestType {
  postId?: string;
  title: string;
  content?: string;
}

export const PostAdminBlogPostsAutosaveRequestTypeSchema = z.object({
  postId: z.string().optional(),
  title: z.string(),
  content: z.string().optional(),
});

export interface PostAdminBlogPostsAutosaveResponseType {
  success: boolean;
  postId?: string;
  savedAt?: string;
}

export const PostAdminBlogPostsAutosaveResponseTypeSchema = z.object({
  success: z.boolean(),
  postId: z.string().optional(),
  savedAt: z.string().optional(),
});

export interface GetAdminBlogCategoriesResponseCategoriesItemType {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string;
  createdAt: string;
  postCount: number;
}

export const GetAdminBlogCategoriesResponseCategoriesItemTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  parentId: z.string().uuid(),
  createdAt: z.string().datetime(),
  postCount: z.number(),
});

export interface GetAdminBlogCategoriesResponsePaginationType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminBlogCategoriesResponsePaginationTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface PostAdminBlogCategoriesRequestType {
  name: string;
  description?: string;
  parentId?: string;
}

export const PostAdminBlogCategoriesRequestTypeSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export interface PatchAdminBlogCategoriesRequestType {
  name?: string;
  description?: string;
  parentId?: string;
}

export const PatchAdminBlogCategoriesRequestTypeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
});

export interface GetAdminBlogTagsResponseTagsItemType {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  postCount: number;
}

export const GetAdminBlogTagsResponseTagsItemTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string().datetime(),
  postCount: z.number(),
});

export interface GetAdminBlogTagsResponsePaginationType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminBlogTagsResponsePaginationTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface GetAdminCustomersResponseCustomersItemType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminCustomersResponseCustomersItemTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface GetAdminCustomersResponsePaginationType {
  total: number;
  limit: number;
  offset: number;
}

export const GetAdminCustomersResponsePaginationTypeSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
});

export interface GetAdminCustomersResponseCustomerType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminCustomersResponseCustomerTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface PatchAdminCustomersResponseCustomerType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const PatchAdminCustomersResponseCustomerTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface GetAdminCustomersProviderResponseCustomerType {
  id: string;
  userId: string;
  provider: 'stripe';
  polarsh;
  apple;
  google;
  providerCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminCustomersProviderResponseCustomerTypeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum(['stripe', 'polarsh', 'apple', 'google']),
  providerCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface GetAdminPaymentsAppstoreAppleProductsResponseProductsItemType {
  id: string;
  appId: string;
  productId: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminPaymentsAppstoreAppleProductsResponseProductsItemTypeSchema =
  z.object({
    id: z.string(),
    appId: z.string(),
    productId: z.string(),
    name: z.string(),
    type: z.string(),
    price: z.number(),
    currency: z.string(),
    isActive: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

export interface PostAdminPaymentsAppstoreAppleProductsRequestType {
  appId: string;
  productId: string;
  name: string;
  type: 'consumable';
  non_consumable;
  auto_renewable_subscription;
  non_renewable_subscription;
  price: number;
  currency: string;
  familyId?: string;
  reviewNotes?: string;
}

export const PostAdminPaymentsAppstoreAppleProductsRequestTypeSchema = z.object(
  {
    appId: z.string().min(1),
    productId: z.string().min(1),
    name: z.string().min(1),
    type: z.enum([
      'consumable',
      'non_consumable',
      'auto_renewable_subscription',
      'non_renewable_subscription',
    ]),
    price: z.number().min(0),
    currency: z.string().min(3).max(3),
    familyId: z.string().optional(),
    reviewNotes: z.string().optional(),
  }
);

export interface PostAdminPaymentsAppstoreAppleProductsResponseProductType {
  id: string;
  appId: string;
  productId: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema =
  z.object({
    id: z.string(),
    appId: z.string(),
    productId: z.string(),
    name: z.string(),
    type: z.string(),
    price: z.number(),
    currency: z.string(),
    isActive: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

export interface PutAdminPaymentsAppstoreAppleProductsRequestType {
  productId?: string;
  name?: string;
  type?: 'consumable';
  non_consumable;
  auto_renewable_subscription;
  non_renewable_subscription;
  price?: number;
  currency?: string;
  familyId?: string;
  reviewNotes?: string;
}

export const PutAdminPaymentsAppstoreAppleProductsRequestTypeSchema = z.object({
  productId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  type: z
    .enum([
      'consumable',
      'non_consumable',
      'auto_renewable_subscription',
      'non_renewable_subscription',
    ])
    .optional(),
  price: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  familyId: z.string().optional(),
  reviewNotes: z.string().optional(),
});

export interface PutAdminPaymentsAppstoreAppleProductsResponseProductType {
  id: string;
  appId: string;
  productId: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PutAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema =
  z.object({
    id: z.string(),
    appId: z.string(),
    productId: z.string(),
    name: z.string(),
    type: z.string(),
    price: z.number(),
    currency: z.string(),
    isActive: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

export interface GetAdminPaymentsAppstoreGoogleProductsResponseProductsItemType {
  id: string;
  packageName: string;
  sku: string;
  name: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminPaymentsAppstoreGoogleProductsResponseProductsItemTypeSchema =
  z.object({
    id: z.string(),
    packageName: z.string(),
    sku: z.string(),
    name: z.string(),
    type: z.string(),
    status: z.string(),
    price: z.number(),
    currency: z.string(),
    isActive: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

export interface PostAdminPaymentsAppstoreGoogleProductsRequestType {
  packageName: string;
  sku: string;
  name: string;
  type: 'inapp';
  subs;
  status: 'active';
  inactive;
  price: number;
  currency: string;
  subscriptionPeriod?: string;
  trialPeriod?: string;
}

export const PostAdminPaymentsAppstoreGoogleProductsRequestTypeSchema =
  z.object({
    packageName: z.string().min(1),
    sku: z.string().min(1),
    name: z.string().min(1),
    type: z.enum(['inapp', 'subs']),
    status: z.enum(['active', 'inactive']),
    price: z.number().min(0),
    currency: z.string().min(3).max(3),
    subscriptionPeriod: z.string().optional(),
    trialPeriod: z.string().optional(),
  });

export interface PostAdminPaymentsAppstoreGoogleProductsResponseProductType {
  id: string;
  packageName: string;
  sku: string;
  name: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema =
  z.object({
    id: z.string(),
    packageName: z.string(),
    sku: z.string(),
    name: z.string(),
    type: z.string(),
    status: z.string(),
    price: z.number(),
    currency: z.string(),
    isActive: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

export interface PutAdminPaymentsAppstoreGoogleProductsRequestType {
  sku?: string;
  name?: string;
  type?: 'inapp';
  subs;
  status?: 'active';
  inactive;
  price?: number;
  currency?: string;
  subscriptionPeriod?: string;
  trialPeriod?: string;
}

export const PutAdminPaymentsAppstoreGoogleProductsRequestTypeSchema = z.object(
  {
    sku: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    type: z.enum(['inapp', 'subs']).optional(),
    status: z.enum(['active', 'inactive']).optional(),
    price: z.number().min(0).optional(),
    currency: z.string().min(3).max(3).optional(),
    subscriptionPeriod: z.string().optional(),
    trialPeriod: z.string().optional(),
  }
);

export interface PutAdminPaymentsAppstoreGoogleProductsResponseProductType {
  id: string;
  packageName: string;
  sku: string;
  name: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PutAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema =
  z.object({
    id: z.string(),
    packageName: z.string(),
    sku: z.string(),
    name: z.string(),
    type: z.string(),
    status: z.string(),
    price: z.number(),
    currency: z.string(),
    isActive: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

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

export interface PostAdminPaymentsAppstoreSyncRequestType {
  platform: 'apple';
  google;
  appId: string;
  force?: boolean;
}

export const PostAdminPaymentsAppstoreSyncRequestTypeSchema = z.object({
  platform: z.enum(['apple', 'google']),
  appId: z.string().min(1),
  force: z.boolean().optional(),
});

export interface PostAdminPaymentsAppstoreSyncResponseType {
  platform: string;
  appId: string;
  synced: number;
  created: number;
  updated: number;
  errors: string[];
  lastSyncAt: string;
}

export const PostAdminPaymentsAppstoreSyncResponseTypeSchema = z.object({
  platform: z.string(),
  appId: z.string(),
  synced: z.number(),
  created: z.number(),
  updated: z.number(),
  errors: z.array(z.string()),
  lastSyncAt: z.string().datetime(),
});

export interface PostAdminPaymentsAppstoreWebhookValidateRequestType {
  platform: 'apple';
  google;
  payload: Record<string, unknown>;
  signature?: string;
}

export const PostAdminPaymentsAppstoreWebhookValidateRequestTypeSchema =
  z.object({
    platform: z.enum(['apple', 'google']),
    payload: z.record(z.unknown()),
    signature: z.string().optional(),
  });

export interface PostAdminPaymentsAppstoreWebhookValidateResponseType {
  valid: boolean;
  platform: string;
  processedData?: unknown;
  timestamp: string;
}

export const PostAdminPaymentsAppstoreWebhookValidateResponseTypeSchema =
  z.object({
    valid: z.boolean(),
    platform: z.string(),
    processedData: z.unknown().optional(),
    timestamp: z.string(),
  });

export interface GetAdminPaymentsProductsResponseDataItemPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const GetAdminPaymentsProductsResponseDataItemPricesItemTypeSchema =
  z.object({
    unitAmount: z.number().int().min(0),
    currency: z.string().min(3).max(3),
    recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
    recurringIntervalCount: z.number().int().min(0).optional(),
    id: z.string().optional(),
    isDefault: z.boolean().optional(),
    trialPeriodDays: z.number().int().min(0).optional(),
  });

export interface GetAdminPaymentsProductsResponseDataItemPlatformsType {
  paymentProvider?: Record<string, any>;
  apple?: Record<string, any>;
  google?: Record<string, any>;
}

export const GetAdminPaymentsProductsResponseDataItemPlatformsTypeSchema =
  z.object({
    paymentProvider: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .and(z.object({}))
      .optional(),
    apple: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .and(
        z.object({
          appId: z.string(),
        })
      )
      .optional(),
    google: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .and(
        z.object({
          sku: z.string(),
          packageName: z.string(),
        })
      )
      .optional(),
  });

export interface GetAdminPaymentsProductsResponseDataItemType {
  id: string;
  name: string;
  description?: string;
  type: 'one-time';
  subscription;
  prices: GetAdminPaymentsProductsResponseDataItemPricesItemType[];
  features?: string[];
  platforms: GetAdminPaymentsProductsResponseDataItemPlatformsType;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsProductsResponseDataItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']),
  prices: z.array(GetAdminPaymentsProductsResponseDataItemPricesItemTypeSchema),
  features: z.array(z.string()).optional(),
  platforms: GetAdminPaymentsProductsResponseDataItemPlatformsTypeSchema,
  metadata: z.record(z.unknown()).optional(),
});

export interface GetAdminPaymentsProductsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsProductsResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface PostAdminPaymentsProductsRequestPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const PostAdminPaymentsProductsRequestPricesItemTypeSchema = z.object({
  unitAmount: z.number().int().min(0),
  currency: z.string().min(3).max(3),
  recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
  recurringIntervalCount: z.number().int().min(0).optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  trialPeriodDays: z.number().int().min(0).optional(),
});

export interface PostAdminPaymentsProductsRequestPlatformsType {
  enableAppStores: boolean;
  enablePaymentProvider: boolean;
  appleAppId?: string;
  googlePackageName?: string;
}

export const PostAdminPaymentsProductsRequestPlatformsTypeSchema = z.object({
  enableAppStores: z.boolean(),
  enablePaymentProvider: z.boolean(),
  appleAppId: z.string().optional(),
  googlePackageName: z.string().optional(),
});

export interface PostAdminPaymentsProductsRequestType {
  name: string;
  description?: string;
  type: 'one-time';
  subscription;
  prices: unknown[];
  features?: string[];
  platforms: PostAdminPaymentsProductsRequestPlatformsType;
}

export const PostAdminPaymentsProductsRequestTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']),
  prices: z.array(PostAdminPaymentsProductsRequestPricesItemTypeSchema).min(1),
  features: z.array(z.string()).optional(),
  platforms: PostAdminPaymentsProductsRequestPlatformsTypeSchema,
});

export interface PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PostAdminPaymentsProductsResponseResultPlatformsAppleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PostAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PostAdminPaymentsProductsResponseResultPlatformsGoogleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PostAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PostAdminPaymentsProductsResponseResultPlatformsType {
  paymentProvider?: PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderType;
  apple?: PostAdminPaymentsProductsResponseResultPlatformsAppleType;
  google?: PostAdminPaymentsProductsResponseResultPlatformsGoogleType;
}

export const PostAdminPaymentsProductsResponseResultPlatformsTypeSchema =
  z.object({
    paymentProvider:
      PostAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema.optional(),
    apple:
      PostAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema.optional(),
    google:
      PostAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema.optional(),
  });

export interface PostAdminPaymentsProductsResponseResultType {
  success: boolean;
  platforms: PostAdminPaymentsProductsResponseResultPlatformsType;
  errors: string[];
}

export const PostAdminPaymentsProductsResponseResultTypeSchema = z.object({
  success: z.boolean(),
  platforms: PostAdminPaymentsProductsResponseResultPlatformsTypeSchema,
  errors: z.array(z.string()),
});

export interface GetAdminPaymentsProductsResponseProductPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const GetAdminPaymentsProductsResponseProductPricesItemTypeSchema =
  z.object({
    unitAmount: z.number().int().min(0),
    currency: z.string().min(3).max(3),
    recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
    recurringIntervalCount: z.number().int().min(0).optional(),
    id: z.string().optional(),
    isDefault: z.boolean().optional(),
    trialPeriodDays: z.number().int().min(0).optional(),
  });

export interface GetAdminPaymentsProductsResponseProductPlatformsType {
  paymentProvider?: Record<string, any>;
  apple?: Record<string, any>;
  google?: Record<string, any>;
}

export const GetAdminPaymentsProductsResponseProductPlatformsTypeSchema =
  z.object({
    paymentProvider: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .and(z.object({}))
      .optional(),
    apple: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .and(
        z.object({
          appId: z.string(),
        })
      )
      .optional(),
    google: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .and(
        z.object({
          sku: z.string(),
          packageName: z.string(),
        })
      )
      .optional(),
  });

export interface GetAdminPaymentsProductsResponseProductType {
  id: string;
  name: string;
  description?: string;
  type: 'one-time';
  subscription;
  prices: GetAdminPaymentsProductsResponseProductPricesItemType[];
  features?: string[];
  platforms: GetAdminPaymentsProductsResponseProductPlatformsType;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsProductsResponseProductTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']),
  prices: z.array(GetAdminPaymentsProductsResponseProductPricesItemTypeSchema),
  features: z.array(z.string()).optional(),
  platforms: GetAdminPaymentsProductsResponseProductPlatformsTypeSchema,
  metadata: z.record(z.unknown()).optional(),
});

export interface PutAdminPaymentsProductsRequestPricesItemType {
  unitAmount: number;
  currency: string;
  recurringInterval?: 'day';
  week;
  month;
  year;
  recurringIntervalCount?: number;
  id?: string;
  isDefault?: boolean;
  trialPeriodDays?: number;
}

export const PutAdminPaymentsProductsRequestPricesItemTypeSchema = z.object({
  unitAmount: z.number().int().min(0),
  currency: z.string().min(3).max(3),
  recurringInterval: z.enum(['day', 'week', 'month', 'year']).optional(),
  recurringIntervalCount: z.number().int().min(0).optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  trialPeriodDays: z.number().int().min(0).optional(),
});

export interface PutAdminPaymentsProductsRequestPlatformsType {
  enableAppStores: boolean;
  enablePaymentProvider: boolean;
  appleAppId?: string;
  googlePackageName?: string;
}

export const PutAdminPaymentsProductsRequestPlatformsTypeSchema = z.object({
  enableAppStores: z.boolean(),
  enablePaymentProvider: z.boolean(),
  appleAppId: z.string().optional(),
  googlePackageName: z.string().optional(),
});

export interface PutAdminPaymentsProductsRequestType {
  name?: string;
  description?: string;
  type?: 'one-time';
  subscription;
  prices?: PutAdminPaymentsProductsRequestPricesItemType[];
  features?: string[];
  platforms?: PutAdminPaymentsProductsRequestPlatformsType;
}

export const PutAdminPaymentsProductsRequestTypeSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'subscription']).optional(),
  prices: z
    .array(PutAdminPaymentsProductsRequestPricesItemTypeSchema)
    .optional(),
  features: z.array(z.string()).optional(),
  platforms: PutAdminPaymentsProductsRequestPlatformsTypeSchema.optional(),
});

export interface PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PutAdminPaymentsProductsResponseResultPlatformsAppleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PutAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PutAdminPaymentsProductsResponseResultPlatformsGoogleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const PutAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface PutAdminPaymentsProductsResponseResultPlatformsType {
  paymentProvider?: PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderType;
  apple?: PutAdminPaymentsProductsResponseResultPlatformsAppleType;
  google?: PutAdminPaymentsProductsResponseResultPlatformsGoogleType;
}

export const PutAdminPaymentsProductsResponseResultPlatformsTypeSchema =
  z.object({
    paymentProvider:
      PutAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema.optional(),
    apple:
      PutAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema.optional(),
    google:
      PutAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema.optional(),
  });

export interface PutAdminPaymentsProductsResponseResultType {
  success: boolean;
  platforms: PutAdminPaymentsProductsResponseResultPlatformsType;
  errors: string[];
}

export const PutAdminPaymentsProductsResponseResultTypeSchema = z.object({
  success: z.boolean(),
  platforms: PutAdminPaymentsProductsResponseResultPlatformsTypeSchema,
  errors: z.array(z.string()),
});

export interface DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderType {
  success: boolean;
  error?: string;
  id?: string;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultPlatformsAppleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultPlatformsGoogleType {
  success: boolean;
  error?: string;
  id?: string;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema =
  z.object({
    success: z.boolean(),
    error: z.string().optional(),
    id: z.string().optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultPlatformsType {
  paymentProvider?: DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderType;
  apple?: DeleteAdminPaymentsProductsResponseResultPlatformsAppleType;
  google?: DeleteAdminPaymentsProductsResponseResultPlatformsGoogleType;
}

export const DeleteAdminPaymentsProductsResponseResultPlatformsTypeSchema =
  z.object({
    paymentProvider:
      DeleteAdminPaymentsProductsResponseResultPlatformsPaymentProviderTypeSchema.optional(),
    apple:
      DeleteAdminPaymentsProductsResponseResultPlatformsAppleTypeSchema.optional(),
    google:
      DeleteAdminPaymentsProductsResponseResultPlatformsGoogleTypeSchema.optional(),
  });

export interface DeleteAdminPaymentsProductsResponseResultType {
  success: boolean;
  platforms: DeleteAdminPaymentsProductsResponseResultPlatformsType;
  errors: string[];
}

export const DeleteAdminPaymentsProductsResponseResultTypeSchema = z.object({
  success: z.boolean(),
  platforms: DeleteAdminPaymentsProductsResponseResultPlatformsTypeSchema,
  errors: z.array(z.string()),
});

export interface PostAdminPaymentsProductsSyncRequestPlatformsIntersection1Type {
  enableAppStores: boolean;
  enablePaymentProvider: boolean;
  appleAppId?: string;
  googlePackageName?: string;
}

export const PostAdminPaymentsProductsSyncRequestPlatformsIntersection1TypeSchema =
  z.object({
    enableAppStores: z.boolean(),
    enablePaymentProvider: z.boolean(),
    appleAppId: z.string().optional(),
    googlePackageName: z.string().optional(),
  });

export interface PostAdminPaymentsProductsSyncResponseType {
  success: boolean;
  synced: number;
  errors: string[];
  message: string;
}

export const PostAdminPaymentsProductsSyncResponseTypeSchema = z.object({
  success: z.boolean(),
  synced: z.number(),
  errors: z.array(z.string()),
  message: z.string(),
});

export interface GetAdminPaymentsProductsPlatformsResponsePlatformsAppleType {
  id: string;
  appId: string;
  status: 'active';
  inactive;
}

export const GetAdminPaymentsProductsPlatformsResponsePlatformsAppleTypeSchema =
  z.object({
    id: z.string(),
    appId: z.string(),
    status: z.enum(['active', 'inactive']),
  });

export interface GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleType {
  sku: string;
  packageName: string;
  status: 'active';
  inactive;
}

export const GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleTypeSchema =
  z.object({
    sku: z.string(),
    packageName: z.string(),
    status: z.enum(['active', 'inactive']),
  });

export interface GetAdminPaymentsProductsPlatformsResponsePlatformsType {
  paymentProvider?: Record<string, any>;
  apple?: GetAdminPaymentsProductsPlatformsResponsePlatformsAppleType;
  google?: GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleType;
}

export const GetAdminPaymentsProductsPlatformsResponsePlatformsTypeSchema =
  z.object({
    paymentProvider: z
      .object({
        id: z.string(),
        status: z.enum(['active', 'inactive']),
      })
      .optional(),
    apple:
      GetAdminPaymentsProductsPlatformsResponsePlatformsAppleTypeSchema.optional(),
    google:
      GetAdminPaymentsProductsPlatformsResponsePlatformsGoogleTypeSchema.optional(),
  });

export interface GetAdminPaymentsProductsStatsResponseStatsByPlatformType {
  paymentProvider: number;
  apple: number;
  google: number;
}

export const GetAdminPaymentsProductsStatsResponseStatsByPlatformTypeSchema =
  z.object({
    paymentProvider: z.number(),
    apple: z.number(),
    google: z.number(),
  });

export interface GetAdminPaymentsProductsStatsResponseStatsType {
  total: number;
  byType: Record<string, any>;
  byPlatform: GetAdminPaymentsProductsStatsResponseStatsByPlatformType;
  multiPlatform: number;
}

export const GetAdminPaymentsProductsStatsResponseStatsTypeSchema = z.object({
  total: z.number(),
  byType: z.object({
    oneTime: z.number(),
    subscription: z.number(),
  }),
  byPlatform: GetAdminPaymentsProductsStatsResponseStatsByPlatformTypeSchema,
  multiPlatform: z.number(),
});

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsStripeType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsStripeTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsAppleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsAppleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemPlatformsType {
  stripe?: GetAdminPaymentsCustomersResponseDataItemPlatformsStripeType;
  polarsh?: GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshType;
  apple?: GetAdminPaymentsCustomersResponseDataItemPlatformsAppleType;
  google?: GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleType;
}

export const GetAdminPaymentsCustomersResponseDataItemPlatformsTypeSchema =
  z.object({
    stripe:
      GetAdminPaymentsCustomersResponseDataItemPlatformsStripeTypeSchema.optional(),
    polarsh:
      GetAdminPaymentsCustomersResponseDataItemPlatformsPolarshTypeSchema.optional(),
    apple:
      GetAdminPaymentsCustomersResponseDataItemPlatformsAppleTypeSchema.optional(),
    google:
      GetAdminPaymentsCustomersResponseDataItemPlatformsGoogleTypeSchema.optional(),
  });

export interface GetAdminPaymentsCustomersResponseDataItemType {
  id: string;
  userId: string;
  email: string;
  name: string;
  platforms: GetAdminPaymentsCustomersResponseDataItemPlatformsType;
  totalRevenue: number;
  totalTransactions: number;
  activeSubscriptions: number;
  createdAt: string;
  lastTransactionAt: string;
}

export const GetAdminPaymentsCustomersResponseDataItemTypeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  platforms: GetAdminPaymentsCustomersResponseDataItemPlatformsTypeSchema,
  totalRevenue: z.number(),
  totalTransactions: z.number(),
  activeSubscriptions: z.number(),
  createdAt: z.string(),
  lastTransactionAt: z.string(),
});

export interface GetAdminPaymentsCustomersResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsCustomersResponseMetaTypeSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export interface GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownType {
  stripe: number;
  polarsh: number;
  apple: number;
  google: number;
}

export const GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownTypeSchema =
  z.object({
    stripe: z.number(),
    polarsh: z.number(),
    apple: z.number(),
    google: z.number(),
  });

export interface GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformType {
  stripe: number;
  polarsh: number;
  apple: number;
  google: number;
}

export const GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformTypeSchema =
  z.object({
    stripe: z.number(),
    polarsh: z.number(),
    apple: z.number(),
    google: z.number(),
  });

export interface GetAdminPaymentsCustomersStatsResponseStatsType {
  totalCustomers: number;
  totalRevenue: number;
  averageRevenue: number;
  platformBreakdown: GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownType;
  revenueByPlatform: GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformType;
}

export const GetAdminPaymentsCustomersStatsResponseStatsTypeSchema = z.object({
  totalCustomers: z.number(),
  totalRevenue: z.number(),
  averageRevenue: z.number(),
  platformBreakdown:
    GetAdminPaymentsCustomersStatsResponseStatsPlatformBreakdownTypeSchema,
  revenueByPlatform:
    GetAdminPaymentsCustomersStatsResponseStatsRevenueByPlatformTypeSchema,
});

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsStripeType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsStripeTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsAppleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsAppleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleType {
  customerId: string;
  status?: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleTypeSchema =
  z.object({
    customerId: z.string(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerPlatformsType {
  stripe?: GetAdminPaymentsCustomersResponseCustomerPlatformsStripeType;
  polarsh?: GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshType;
  apple?: GetAdminPaymentsCustomersResponseCustomerPlatformsAppleType;
  google?: GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleType;
}

export const GetAdminPaymentsCustomersResponseCustomerPlatformsTypeSchema =
  z.object({
    stripe:
      GetAdminPaymentsCustomersResponseCustomerPlatformsStripeTypeSchema.optional(),
    polarsh:
      GetAdminPaymentsCustomersResponseCustomerPlatformsPolarshTypeSchema.optional(),
    apple:
      GetAdminPaymentsCustomersResponseCustomerPlatformsAppleTypeSchema.optional(),
    google:
      GetAdminPaymentsCustomersResponseCustomerPlatformsGoogleTypeSchema.optional(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemType {
  id: string;
  platform: 'stripe';
  polarsh;
  apple;
  google;
  amount: number;
  currency: string;
  status: string;
  productName: string;
  createdAt: string;
}

export const GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
    amount: z.number(),
    currency: z.string(),
    status: z.string(),
    productName: z.string(),
    createdAt: z.string(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemType {
  id: string;
  platform: 'stripe';
  polarsh;
  apple;
  google;
  productName: string;
  status: string;
  amount: number;
  currency: string;
  interval: string;
  currentPeriodEnd: string;
}

export const GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.enum(['stripe', 'polarsh', 'apple', 'google']),
    productName: z.string(),
    status: z.string(),
    amount: z.number(),
    currency: z.string(),
    interval: z.string(),
    currentPeriodEnd: z.string(),
  });

export interface GetAdminPaymentsCustomersResponseCustomerType {
  id: string;
  userId: string;
  email: string;
  name: string;
  platforms: GetAdminPaymentsCustomersResponseCustomerPlatformsType;
  totalRevenue: number;
  totalTransactions: number;
  activeSubscriptions: number;
  createdAt: string;
  lastTransactionAt: string;
  recentTransactions: GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemType[];
  subscriptions: GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemType[];
}

export const GetAdminPaymentsCustomersResponseCustomerTypeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  platforms: GetAdminPaymentsCustomersResponseCustomerPlatformsTypeSchema,
  totalRevenue: z.number(),
  totalTransactions: z.number(),
  activeSubscriptions: z.number(),
  createdAt: z.string(),
  lastTransactionAt: z.string(),
  recentTransactions: z.array(
    GetAdminPaymentsCustomersResponseCustomerRecentTransactionsItemTypeSchema
  ),
  subscriptions: z.array(
    GetAdminPaymentsCustomersResponseCustomerSubscriptionsItemTypeSchema
  ),
});

export interface GetAdminPaymentsCustomersTransactionsResponseDataItemType {
  id: string;
  platform: string;
  amount: number;
  currency: string;
  status: string;
  productName: string;
  createdAt: string;
}

export const GetAdminPaymentsCustomersTransactionsResponseDataItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.string(),
    amount: z.number(),
    currency: z.string(),
    status: z.string(),
    productName: z.string(),
    createdAt: z.string(),
  });

export interface GetAdminPaymentsCustomersTransactionsResponseMetaType {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const GetAdminPaymentsCustomersTransactionsResponseMetaTypeSchema =
  z.object({
    total: z.number(),
    pages: z.number(),
    page: z.number(),
    limit: z.number(),
  });

export interface GetAdminPaymentsCustomersSubscriptionsResponseSubscriptionsItemType {
  id: string;
  platform: string;
  productName: string;
  status: string;
  amount: number;
  currency: string;
  interval: string;
  currentPeriodEnd: string;
}

export const GetAdminPaymentsCustomersSubscriptionsResponseSubscriptionsItemTypeSchema =
  z.object({
    id: z.string(),
    platform: z.string(),
    productName: z.string(),
    status: z.string(),
    amount: z.number(),
    currency: z.string(),
    interval: z.string(),
    currentPeriodEnd: z.string(),
  });

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

export interface GetAdminProductsResponseProductsItemType {
  id: string;
  name: string;
  description: string;
}

export const GetAdminProductsResponseProductsItemTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
});

export interface GetAdminProductsResponseProductPricesItemType {
  id: string;
  platformProductId: string;
  platformPriceId: string;
  unitAmount: number;
  currency: string;
  billingPeriod: string;
  recurringInterval: string;
  recurringIntervalCount: number;
  trialPeriodDays: number;
  isDefault: boolean;
  active: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export const GetAdminProductsResponseProductPricesItemTypeSchema = z.object({
  id: z.string().uuid(),
  platformProductId: z.string().uuid(),
  platformPriceId: z.string(),
  unitAmount: z.number().int().min(-2147483648).max(2147483647),
  currency: z.string().max(3),
  billingPeriod: z.string(),
  recurringInterval: z.string(),
  recurringIntervalCount: z.number().int().min(-2147483648).max(2147483647),
  trialPeriodDays: z.number().int().min(-2147483648).max(2147483647),
  isDefault: z.boolean(),
  active: z.boolean(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface GetAdminProductsResponseProductType {
  id: string;
  name: string;
  description: string;
  prices?: GetAdminProductsResponseProductPricesItemType[];
}

export const GetAdminProductsResponseProductTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  prices: z
    .array(GetAdminProductsResponseProductPricesItemTypeSchema)
    .optional(),
});

export interface GetAdminSubscriptionsResponseSubscriptionsItemType {
  id: string;
  providerSubscriptionId: string;
  accountId: string;
  status: string;
  periodStart: string;
  periodEnd: string;
}

export const GetAdminSubscriptionsResponseSubscriptionsItemTypeSchema =
  z.object({
    id: z.string(),
    providerSubscriptionId: z.string(),
    accountId: z.string(),
    status: z.string(),
    periodStart: z.string(),
    periodEnd: z.string(),
  });

export interface GetAdminUsersResponseUsersItemType {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: 'admin';
  user;
  support;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export const GetAdminUsersResponseUsersItemTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(100),
  email: z.string(),
  username: z.string().max(100),
  role: z.enum(['admin', 'user', 'support']).optional(),
  banned: z.boolean(),
  banReason: z.string(),
  banExpires: z.string(),
  onboardingComplete: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  locale: z.string(),
});

export interface GetAdminUsersResponseUserType {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: 'admin';
  user;
  support;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export const GetAdminUsersResponseUserTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(100),
  email: z.string(),
  username: z.string().max(100),
  role: z.enum(['admin', 'user', 'support']).optional(),
  banned: z.boolean(),
  banReason: z.string(),
  banExpires: z.string(),
  onboardingComplete: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  locale: z.string(),
});

export interface PatchAdminUsersRequestType {
  name?: string;
  email?: string;
  username?: string;
  role?: 'admin';
  user;
  support;
  banned?: boolean;
  banReason?: string;
  banExpires?: string;
  onboardingComplete?: boolean;
  locale?: string;
}

export const PatchAdminUsersRequestTypeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  role: z.enum(['admin', 'user', 'support']).optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.string().datetime().optional(),
  onboardingComplete: z.boolean().optional(),
  locale: z.string().optional(),
});

export interface PatchAdminUsersResponseUserType {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: 'admin';
  user;
  support;
  banned: boolean;
  banReason: string;
  banExpires: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export const PatchAdminUsersResponseUserTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(100),
  email: z.string(),
  username: z.string().max(100),
  role: z.enum(['admin', 'user', 'support']).optional(),
  banned: z.boolean(),
  banReason: z.string(),
  banExpires: z.string(),
  onboardingComplete: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  locale: z.string(),
});

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

export class AdminApi extends ApiClient {
  setRole(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/set-role`,
      z.object({
        user: SetRoleResponseUserTypeSchema.optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
          role: z.string(),
        }),
      }
    );
  }

  createUser(data: CreateUserRequestType): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/create-user`,
      z.object({
        user: CreateUserResponseUserTypeSchema.optional(),
      }),
      { body: data, bodySchema: CreateUserRequestTypeSchema }
    );
  }

  listUsers(
    searchValue?: string,
    searchField?: string,
    searchOperator?: string,
    limit?: string,
    offset?: string,
    sortBy?: string,
    sortDirection?: string,
    filterField?: string,
    filterValue?: string,
    filterOperator?: string
  ): Promise<ListUsersResponseType> {
    return this.get(`/auth/admin/list-users`, ListUsersResponseTypeSchema, {
      queryParams: {
        searchValue,
        searchField,
        searchOperator,
        limit,
        offset,
        sortBy,
        sortDirection,
        filterField,
        filterValue,
        filterOperator,
      },
    });
  }

  listUserSessions(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/list-user-sessions`,
      z.object({
        sessions: z
          .array(ListUserSessionsResponseSessionsItemTypeSchema)
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  unbanUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/unban-user`,
      z.object({
        user: UnbanUserResponseUserTypeSchema.optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  banUser(data: BanUserRequestType): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/ban-user`,
      z.object({
        user: BanUserResponseUserTypeSchema.optional(),
      }),
      { body: data, bodySchema: BanUserRequestTypeSchema }
    );
  }

  impersonateUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/impersonate-user`,
      z.object({
        session: ImpersonateUserResponseSessionTypeSchema.optional(),
        user: ImpersonateUserResponseUserTypeSchema.optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  postAuthAdminStopimpersonating(): Promise<unknown> {
    return this.post(`/auth/admin/stop-impersonating`, z.unknown());
  }

  revokeUserSession(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/revoke-user-session`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          sessionToken: z.string(),
        }),
      }
    );
  }

  revokeUserSessions(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/revoke-user-sessions`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  removeUser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/remove-user`,
      z.object({
        success: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
        }),
      }
    );
  }

  setUserPassword(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/set-user-password`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          newPassword: z.string(),
          userId: z.string(),
        }),
      }
    );
  }

  postAuthAdminHaspermission(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/admin/has-permission`,
      z.object({
        error: z.string().optional(),
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          permission: z.object({}).optional(),
          permissions: z.object({}),
        }),
      }
    );
  }

  postAdminAssetsGenerateuploadurl(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/assets/generate-upload-url`,
      z.object({
        signedUrl: z.string().url(),
        key: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          filename: z.string().min(1),
          contentType: z.string().min(1),
        }),
      }
    );
  }

  postAdminAssets(
    data: PostAdminAssetsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/assets`,
      z.object({
        asset: PostAdminAssetsResponseAssetTypeSchema,
      }),
      { body: data, bodySchema: PostAdminAssetsRequestTypeSchema }
    );
  }

  getAdminAssetsList(
    page?: string,
    pageSize?: string,
    search?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/assets/list`,
      z.object({
        assets: z.array(GetAdminAssetsListResponseAssetsItemTypeSchema),
        pagination: GetAdminAssetsListResponsePaginationTypeSchema,
      }),
      { queryParams: { page, pageSize, search } }
    );
  }

  patchAdminAssets(
    id: string | number,
    data?: PatchAdminAssetsRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/assets/${id}`,
      z.object({
        assetId: z.string(),
      }),
      { body: data, bodySchema: PatchAdminAssetsRequestTypeSchema }
    );
  }

  deleteAdminAssets(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/assets/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminWaitlist(
    page?: string,
    pageSize?: string,
    search?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/waitlist`,
      z.object({
        entries: z.array(GetAdminWaitlistResponseEntriesItemTypeSchema),
        pagination: GetAdminWaitlistResponsePaginationTypeSchema,
      }),
      { queryParams: { page, pageSize, search, status } }
    );
  }

  patchAdminWaitlist(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/waitlist/${id}`,
      z.object({
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          intent: z.enum(['approve', 'decline', 'delete']),
        }),
      }
    );
  }

  getAdminBlogPosts(
    search?: string,
    filter?: string,
    category?: string,
    sort?: string,
    page?: number
  ): Promise<GetAdminBlogPostsResponseType> {
    return this.get(`/admin/blog/posts`, GetAdminBlogPostsResponseTypeSchema, {
      queryParams: { search, filter, category, sort, page },
    });
  }

  postAdminBlogPosts(
    data?: PostAdminBlogPostsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/posts`,
      z.object({
        postId: z.string(),
      }),
      { body: data, bodySchema: PostAdminBlogPostsRequestTypeSchema }
    );
  }

  getAdminBlogPosts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/posts/${id}`,
      z.object({
        post: GetAdminBlogPostsResponsePostTypeSchema,
      })
    );
  }

  patchAdminBlogPosts(
    id: string | number,
    data?: PatchAdminBlogPostsRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/posts/${id}`,
      z.object({
        postId: z.string(),
      }),
      { body: data, bodySchema: PatchAdminBlogPostsRequestTypeSchema }
    );
  }

  deleteAdminBlogPosts(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/blog/posts/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postAdminBlogPostsAutosave(
    data?: PostAdminBlogPostsAutosaveRequestType
  ): Promise<PostAdminBlogPostsAutosaveResponseType> {
    return this.post(
      `/admin/blog/posts/autosave`,
      PostAdminBlogPostsAutosaveResponseTypeSchema,
      { body: data, bodySchema: PostAdminBlogPostsAutosaveRequestTypeSchema }
    );
  }

  getAdminBlogCategories(
    search?: string,
    page?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/categories`,
      z.object({
        categories: z.array(
          GetAdminBlogCategoriesResponseCategoriesItemTypeSchema
        ),
        pagination: GetAdminBlogCategoriesResponsePaginationTypeSchema,
      }),
      { queryParams: { search, page } }
    );
  }

  postAdminBlogCategories(
    data?: PostAdminBlogCategoriesRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/categories`,
      z.object({
        categoryId: z.string(),
      }),
      { body: data, bodySchema: PostAdminBlogCategoriesRequestTypeSchema }
    );
  }

  patchAdminBlogCategories(
    id: string | number,
    data?: PatchAdminBlogCategoriesRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/categories/${id}`,
      z.object({
        categoryId: z.string(),
      }),
      { body: data, bodySchema: PatchAdminBlogCategoriesRequestTypeSchema }
    );
  }

  deleteAdminBlogCategories(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/blog/categories/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminBlogTags(
    search?: string,
    page?: number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/blog/tags`,
      z.object({
        tags: z.array(GetAdminBlogTagsResponseTagsItemTypeSchema),
        pagination: GetAdminBlogTagsResponsePaginationTypeSchema,
      }),
      { queryParams: { search, page } }
    );
  }

  postAdminBlogTags(data?: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/admin/blog/tags`,
      z.object({
        tagId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().min(2),
        }),
      }
    );
  }

  patchAdminBlogTags(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/blog/tags/${id}`,
      z.object({
        tagId: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().optional(),
        }),
      }
    );
  }

  deleteAdminBlogTags(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/blog/tags/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminCustomers(
    limit?: string,
    offset?: string,
    provider?: string,
    userId?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers`,
      z.object({
        customers: z.array(GetAdminCustomersResponseCustomersItemTypeSchema),
        pagination: GetAdminCustomersResponsePaginationTypeSchema.optional(),
      }),
      { queryParams: { limit, offset, provider, userId } }
    );
  }

  getAdminCustomers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers/${id}`,
      z.object({
        customer: GetAdminCustomersResponseCustomerTypeSchema,
      })
    );
  }

  patchAdminCustomers(
    id: string | number,
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/customers/${id}`,
      z.object({
        customer: PatchAdminCustomersResponseCustomerTypeSchema,
      }),
      {
        body: data,
        bodySchema: z.object({
          provider: z.enum(['stripe', 'polarsh', 'apple', 'google']).optional(),
          providerCustomerId: z.string().optional(),
        }),
      }
    );
  }

  getAdminCustomersProvider(
    providerCustomerId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/customers/provider/${providerCustomerId}`,
      z.object({
        customer: GetAdminCustomersProviderResponseCustomerTypeSchema,
      })
    );
  }

  getAdminPaymentsAppstoreAppleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/apple/products`,
      z.object({
        products: z.array(
          GetAdminPaymentsAppstoreAppleProductsResponseProductsItemTypeSchema
        ),
      })
    );
  }

  postAdminPaymentsAppstoreAppleProducts(
    data: PostAdminPaymentsAppstoreAppleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/apple/products`,
      z.object({
        product:
          PostAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PostAdminPaymentsAppstoreAppleProductsRequestTypeSchema,
      }
    );
  }

  putAdminPaymentsAppstoreAppleProducts(
    productId: string | number,
    data: PutAdminPaymentsAppstoreAppleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/apple/products/${productId}`,
      z.object({
        product: PutAdminPaymentsAppstoreAppleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PutAdminPaymentsAppstoreAppleProductsRequestTypeSchema,
      }
    );
  }

  getAdminPaymentsAppstoreGoogleProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/appstore/google/products`,
      z.object({
        products: z.array(
          GetAdminPaymentsAppstoreGoogleProductsResponseProductsItemTypeSchema
        ),
      })
    );
  }

  postAdminPaymentsAppstoreGoogleProducts(
    data: PostAdminPaymentsAppstoreGoogleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/appstore/google/products`,
      z.object({
        product:
          PostAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PostAdminPaymentsAppstoreGoogleProductsRequestTypeSchema,
      }
    );
  }

  putAdminPaymentsAppstoreGoogleProducts(
    sku: string | number,
    data: PutAdminPaymentsAppstoreGoogleProductsRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/appstore/google/products/${sku}`,
      z.object({
        product:
          PutAdminPaymentsAppstoreGoogleProductsResponseProductTypeSchema,
      }),
      {
        body: data,
        bodySchema: PutAdminPaymentsAppstoreGoogleProductsRequestTypeSchema,
      }
    );
  }

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

  postAdminPaymentsAppstoreSync(
    data: PostAdminPaymentsAppstoreSyncRequestType
  ): Promise<PostAdminPaymentsAppstoreSyncResponseType> {
    return this.post(
      `/admin/payments/appstore/sync`,
      PostAdminPaymentsAppstoreSyncResponseTypeSchema,
      { body: data, bodySchema: PostAdminPaymentsAppstoreSyncRequestTypeSchema }
    );
  }

  postAdminPaymentsAppstoreWebhookValidate(
    data: PostAdminPaymentsAppstoreWebhookValidateRequestType
  ): Promise<PostAdminPaymentsAppstoreWebhookValidateResponseType> {
    return this.post(
      `/admin/payments/appstore/webhook/validate`,
      PostAdminPaymentsAppstoreWebhookValidateResponseTypeSchema,
      {
        body: data,
        bodySchema: PostAdminPaymentsAppstoreWebhookValidateRequestTypeSchema,
      }
    );
  }

  getAdminPaymentsProducts(
    page?: number,
    limit?: number,
    search?: string,
    type?: string,
    platform?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products`,
      z.object({
        data: z.array(GetAdminPaymentsProductsResponseDataItemTypeSchema),
        meta: GetAdminPaymentsProductsResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit, search, type, platform } }
    );
  }

  postAdminPaymentsProducts(
    data: PostAdminPaymentsProductsRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/admin/payments/products`,
      z.object({
        result: PostAdminPaymentsProductsResponseResultTypeSchema,
      }),
      { body: data, bodySchema: PostAdminPaymentsProductsRequestTypeSchema }
    );
  }

  getAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}`,
      z.object({
        product: GetAdminPaymentsProductsResponseProductTypeSchema,
      })
    );
  }

  putAdminPaymentsProducts(
    productId: string | number,
    data: PutAdminPaymentsProductsRequestType
  ): Promise<Record<string, any>> {
    return this.put(
      `/admin/payments/products/${productId}`,
      z.object({
        result: PutAdminPaymentsProductsResponseResultTypeSchema,
      }),
      { body: data, bodySchema: PutAdminPaymentsProductsRequestTypeSchema }
    );
  }

  deleteAdminPaymentsProducts(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.delete(
      `/admin/payments/products/${productId}`,
      z.object({
        result: DeleteAdminPaymentsProductsResponseResultTypeSchema,
      })
    );
  }

  postAdminPaymentsProductsSync(
    data: Record<string, any>
  ): Promise<PostAdminPaymentsProductsSyncResponseType> {
    return this.post(
      `/admin/payments/products/sync`,
      PostAdminPaymentsProductsSyncResponseTypeSchema,
      {
        body: data,
        bodySchema: z.object({
          platforms:
            PostAdminPaymentsProductsSyncRequestPlatformsIntersection1TypeSchema.and(
              z.unknown()
            ),
        }),
      }
    );
  }

  getAdminPaymentsProductsPlatforms(
    productId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/${productId}/platforms`,
      z.object({
        productId: z.string(),
        platforms: GetAdminPaymentsProductsPlatformsResponsePlatformsTypeSchema,
      })
    );
  }

  getAdminPaymentsProductsStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/products/stats`,
      z.object({
        stats: GetAdminPaymentsProductsStatsResponseStatsTypeSchema,
      })
    );
  }

  getAdminPaymentsCustomers(
    page?: number,
    limit?: number,
    search?: string,
    platform?: string,
    sortBy?: string,
    sortOrder?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers`,
      z.object({
        data: z.array(GetAdminPaymentsCustomersResponseDataItemTypeSchema),
        meta: GetAdminPaymentsCustomersResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit, search, platform, sortBy, sortOrder } }
    );
  }

  getAdminPaymentsCustomersStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/stats`,
      z.object({
        stats: GetAdminPaymentsCustomersStatsResponseStatsTypeSchema,
      })
    );
  }

  getAdminPaymentsCustomers(
    customerId: string | number
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}`,
      z.object({
        customer: GetAdminPaymentsCustomersResponseCustomerTypeSchema,
      })
    );
  }

  getAdminPaymentsCustomersTransactions(
    customerId: string | number,
    page?: number,
    limit?: number,
    platform?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}/transactions`,
      z.object({
        data: z.array(
          GetAdminPaymentsCustomersTransactionsResponseDataItemTypeSchema
        ),
        meta: GetAdminPaymentsCustomersTransactionsResponseMetaTypeSchema,
      }),
      { queryParams: { page, limit, platform, status } }
    );
  }

  getAdminPaymentsCustomersSubscriptions(
    customerId: string | number,
    status?: string,
    platform?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/payments/customers/${customerId}/subscriptions`,
      z.object({
        subscriptions: z.array(
          GetAdminPaymentsCustomersSubscriptionsResponseSubscriptionsItemTypeSchema
        ),
      }),
      { queryParams: { status, platform } }
    );
  }

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

  getAdminProducts(): Promise<Record<string, any>> {
    return this.get(
      `/admin/products`,
      z.object({
        products: z.array(GetAdminProductsResponseProductsItemTypeSchema),
      })
    );
  }

  getAdminProducts(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/products/${id}`,
      z.object({
        product: GetAdminProductsResponseProductTypeSchema,
      })
    );
  }

  getAdminSubscriptions(
    customerId?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/admin/subscriptions`,
      z.object({
        subscriptions: z.array(
          GetAdminSubscriptionsResponseSubscriptionsItemTypeSchema
        ),
      }),
      { queryParams: { customerId, status } }
    );
  }

  getAdminUsers(): Promise<Record<string, any>> {
    return this.get(
      `/admin/users`,
      z.object({
        users: z.array(GetAdminUsersResponseUsersItemTypeSchema),
      })
    );
  }

  getAdminUsers(id: string | number): Promise<Record<string, any>> {
    return this.get(
      `/admin/users/${id}`,
      z.object({
        user: GetAdminUsersResponseUserTypeSchema,
      })
    );
  }

  patchAdminUsers(
    id: string | number,
    data: PatchAdminUsersRequestType
  ): Promise<Record<string, any>> {
    return this.patch(
      `/admin/users/${id}`,
      z.object({
        user: PatchAdminUsersResponseUserTypeSchema,
      }),
      { body: data, bodySchema: PatchAdminUsersRequestTypeSchema }
    );
  }

  deleteAdminUsers(id: string | number): Promise<Record<string, any>> {
    return this.delete(
      `/admin/users/${id}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getAdminStats(): Promise<Record<string, any>> {
    return this.get(
      `/admin/stats`,
      z.object({
        stats: GetAdminStatsResponseStatsTypeSchema,
      })
    );
  }
}
