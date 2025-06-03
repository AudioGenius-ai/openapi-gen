// Query key factory functions
export const useGetAuthGetsessionKey = () => ['get/auth/get-session'] as const;

export const useGetAuthVerifyemailKey = () =>
  ['get/auth/verify-email'] as const;

export const useGetAuthResetpasswordKey = (token: string | number) =>
  ['get/auth/reset-password/{token}', token] as const;

export const useGetAuthListsessionsKey = () =>
  ['get/auth/list-sessions'] as const;

export const useGetAuthListaccountsKey = () =>
  ['get/auth/list-accounts'] as const;

export const useGetAuthDeleteuserCallbackKey = () =>
  ['get/auth/delete-user/callback'] as const;

export const useGetAuthOkKey = () => ['get/auth/ok'] as const;

export const useGetAuthErrorKey = () => ['get/auth/error'] as const;

export const useGetAuthApikeyGetKey = () => ['get/auth/api-key/get'] as const;

export const useGetAuthApikeyListKey = () => ['get/auth/api-key/list'] as const;

export const useGetAuthOrganizationGetfullorganizationKey = () =>
  ['get/auth/organization/get-full-organization'] as const;

export const useGetAuthOrganizationListKey = () =>
  ['get/auth/organization/list'] as const;

export const useGetAuthOrganizationGetinvitationKey = () =>
  ['get/auth/organization/get-invitation'] as const;

export const useGetAuthOrganizationGetactivememberKey = () =>
  ['get/auth/organization/get-active-member'] as const;

export const useGetAuthOrganizationListinvitationsKey = () =>
  ['get/auth/organization/list-invitations'] as const;

export const useGetAuthOrganizationListteamsKey = () =>
  ['get/auth/organization/list-teams'] as const;

export const useListUsersKey = () => ['listUsers'] as const;

export const useGetProductsKey = () => ['get/products'] as const;

export const useGetUsersKey = () => ['get/users'] as const;

export const useGetUsersKey = (id: string | number) =>
  ['get/users/{id}', id] as const;

export const useGetOrganizationsKey = () => ['get/organizations'] as const;

export const useGetOrganizationsKey = (id: string | number) =>
  ['get/organizations/{id}', id] as const;

export const useGetOrganizationsMembersKey = (id: string | number) =>
  ['get/organizations/{id}/members', id] as const;

export const useGetOrganizationsInvitationsKey = (id: string | number) =>
  ['get/organizations/{id}/invitations', id] as const;

export const useGetSupportKey = () => ['get/support'] as const;

export const useGetSupportKey = (id: string | number) =>
  ['get/support/{id}', id] as const;

export const useGetSupportTicketsKey = (ticketId: string | number) =>
  ['get/support/tickets/{ticketId}', ticketId] as const;

export const useGetNotificationsKey = () => ['get/notifications'] as const;

export const useGetUsersMeNotificationsettingsKey = () =>
  ['get/users/me/notification-settings'] as const;

export const useGetBlogPostsKey = () => ['get/blog/posts'] as const;

export const useGetBlogPostsKey = (id: string | number) =>
  ['get/blog/posts/{id}', id] as const;

export const useGetAdminAssetsListKey = () =>
  ['get/admin/assets/list'] as const;

export const useGetAdminWaitlistKey = () => ['get/admin/waitlist'] as const;

export const useGetAdminBlogPostsKey = () => ['get/admin/blog/posts'] as const;

export const useGetAdminBlogPostsKey = (id: string | number) =>
  ['get/admin/blog/posts/{id}', id] as const;

export const useGetAdminBlogCategoriesKey = () =>
  ['get/admin/blog/categories'] as const;

export const useGetAdminBlogTagsKey = () => ['get/admin/blog/tags'] as const;

export const useGetAdminCustomersKey = () => ['get/admin/customers'] as const;

export const useGetAdminCustomersKey = (id: string | number) =>
  ['get/admin/customers/{id}', id] as const;

export const useGetAdminCustomersProviderKey = (
  providerCustomerId: string | number
) =>
  [
    'get/admin/customers/provider/{providerCustomerId}',
    providerCustomerId,
  ] as const;

export const useGetAdminPaymentsAppstoreAppleProductsKey = () =>
  ['get/admin/payments/appstore/apple/products'] as const;

export const useGetAdminPaymentsAppstoreGoogleProductsKey = () =>
  ['get/admin/payments/appstore/google/products'] as const;

export const useGetAdminPaymentsAppstoreReviewsKey = () =>
  ['get/admin/payments/appstore/reviews'] as const;

export const useGetAdminPaymentsProductsKey = () =>
  ['get/admin/payments/products'] as const;

export const useGetAdminPaymentsProductsKey = (productId: string | number) =>
  ['get/admin/payments/products/{productId}', productId] as const;

export const useGetAdminPaymentsProductsPlatformsKey = (
  productId: string | number
) => ['get/admin/payments/products/{productId}/platforms', productId] as const;

export const useGetAdminPaymentsProductsStatsKey = () =>
  ['get/admin/payments/products/stats'] as const;

export const useGetAdminPaymentsCustomersKey = () =>
  ['get/admin/payments/customers'] as const;

export const useGetAdminPaymentsCustomersStatsKey = () =>
  ['get/admin/payments/customers/stats'] as const;

export const useGetAdminPaymentsCustomersKey = (customerId: string | number) =>
  ['get/admin/payments/customers/{customerId}', customerId] as const;

export const useGetAdminPaymentsCustomersTransactionsKey = (
  customerId: string | number
) =>
  [
    'get/admin/payments/customers/{customerId}/transactions',
    customerId,
  ] as const;

export const useGetAdminPaymentsCustomersSubscriptionsKey = (
  customerId: string | number
) =>
  [
    'get/admin/payments/customers/{customerId}/subscriptions',
    customerId,
  ] as const;

export const useGetAdminPaymentsTransactionsKey = () =>
  ['get/admin/payments/transactions'] as const;

export const useGetAdminPaymentsTransactionsKey = (id: string | number) =>
  ['get/admin/payments/transactions/{id}', id] as const;

export const useGetAdminProductsKey = () => ['get/admin/products'] as const;

export const useGetAdminProductsKey = (id: string | number) =>
  ['get/admin/products/{id}', id] as const;

export const useGetAdminSubscriptionsKey = () =>
  ['get/admin/subscriptions'] as const;

export const useGetAdminUsersKey = () => ['get/admin/users'] as const;

export const useGetAdminUsersKey = (id: string | number) =>
  ['get/admin/users/{id}', id] as const;

export const useGetAdminStatsKey = () => ['get/admin/stats'] as const;

export const useGetPaymentsCustomersKey = (id: string | number) =>
  ['get/payments/customers/{id}', id] as const;

export const useGetUsersMeSubscriptionKey = () =>
  ['get/users/me/subscription'] as const;

export const useGetAttachmentsKey = () => ['get/attachments'] as const;

export const useGetAttachmentsKey = (id: string | number) =>
  ['get/attachments/{id}', id] as const;
