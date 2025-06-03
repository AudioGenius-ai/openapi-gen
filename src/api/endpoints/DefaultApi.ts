import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface SocialSignInRequestType {
  callbackURL?: string;
  newUserCallbackURL?: string;
  errorCallbackURL?: string;
  provider: string;
  disableRedirect?: string;
  idToken?: string;
  scopes?: string;
  requestSignUp?: string;
  loginHint?: string;
}

export const SocialSignInRequestTypeSchema = z.object({
  callbackURL: z.string().optional(),
  newUserCallbackURL: z.string().optional(),
  errorCallbackURL: z.string().optional(),
  provider: z.string(),
  disableRedirect: z.string().optional(),
  idToken: z.string().optional(),
  scopes: z.string().optional(),
  requestSignUp: z.string().optional(),
  loginHint: z.string().optional(),
});

export interface GetAuthGetsessionResponseSessionType {
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

export const GetAuthGetsessionResponseSessionTypeSchema = z.object({
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

export interface GetAuthGetsessionResponseUserType {
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

export const GetAuthGetsessionResponseUserTypeSchema = z.object({
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

export interface PostAuthSignupEmailRequestType {
  name: string;
  email: string;
  password: string;
  callbackURL?: string;
}

export const PostAuthSignupEmailRequestTypeSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  callbackURL: z.string().optional(),
});

export interface PostAuthSignupEmailResponseUserType {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAuthSignupEmailResponseUserTypeSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  image: z.string().url().optional(),
  emailVerified: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface PostAuthSigninEmailRequestType {
  email: string;
  password: string;
  callbackURL?: string;
  rememberMe?: string;
}

export const PostAuthSigninEmailRequestTypeSchema = z.object({
  email: z.string(),
  password: z.string(),
  callbackURL: z.string().optional(),
  rememberMe: z.string().optional(),
});

export interface PostAuthSigninEmailResponseUserType {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAuthSigninEmailResponseUserTypeSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  emailVerified: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface PostAuthSigninEmailResponseType {
  redirect: false;
  token: string;
  url?: unknown;
  user: PostAuthSigninEmailResponseUserType;
}

export const PostAuthSigninEmailResponseTypeSchema = z.object({
  redirect: z.enum([false]),
  token: z.string(),
  url: z.unknown().optional(),
  user: PostAuthSigninEmailResponseUserTypeSchema,
});

export interface GetAuthVerifyemailResponseUserType {
  id: string;
  email: string;
  name: string;
  image: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const GetAuthVerifyemailResponseUserTypeSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  image: z.string(),
  emailVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface PostAuthChangepasswordRequestType {
  newPassword: string;
  currentPassword: string;
  revokeOtherSessions?: string;
}

export const PostAuthChangepasswordRequestTypeSchema = z.object({
  newPassword: z.string(),
  currentPassword: z.string(),
  revokeOtherSessions: z.string().optional(),
});

export interface PostAuthChangepasswordResponseUserType {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAuthChangepasswordResponseUserTypeSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  image: z.string().url().optional(),
  emailVerified: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface PostAuthDeleteuserRequestType {
  callbackURL?: string;
  password?: string;
  token?: string;
}

export const PostAuthDeleteuserRequestTypeSchema = z.object({
  callbackURL: z.string().optional(),
  password: z.string().optional(),
  token: z.string().optional(),
});

export interface GetAuthListsessionsResponseItemType {
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

export const GetAuthListsessionsResponseItemTypeSchema = z.object({
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

export interface PostAuthLinksocialRequestType {
  callbackURL?: string;
  provider: string;
  scopes?: string;
}

export const PostAuthLinksocialRequestTypeSchema = z.object({
  callbackURL: z.string().optional(),
  provider: z.string(),
  scopes: z.string().optional(),
});

export interface GetAuthListaccountsResponseItemType {
  id?: string;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const GetAuthListaccountsResponseItemTypeSchema = z.object({
  id: z.string().optional(),
  provider: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export interface PostAuthRefreshtokenRequestType {
  providerId: string;
  accountId?: string;
  userId?: string;
}

export const PostAuthRefreshtokenRequestTypeSchema = z.object({
  providerId: z.string(),
  accountId: z.string().optional(),
  userId: z.string().optional(),
});

export interface PostAuthRefreshtokenResponseType {
  tokenType?: string;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
}

export const PostAuthRefreshtokenResponseTypeSchema = z.object({
  tokenType: z.string().optional(),
  idToken: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  accessTokenExpiresAt: z.string().datetime().optional(),
  refreshTokenExpiresAt: z.string().datetime().optional(),
});

export interface PostAuthGetaccesstokenRequestType {
  providerId: string;
  accountId?: string;
  userId?: string;
}

export const PostAuthGetaccesstokenRequestTypeSchema = z.object({
  providerId: z.string(),
  accountId: z.string().optional(),
  userId: z.string().optional(),
});

export interface PostAuthGetaccesstokenResponseType {
  tokenType?: string;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
}

export const PostAuthGetaccesstokenResponseTypeSchema = z.object({
  tokenType: z.string().optional(),
  idToken: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  accessTokenExpiresAt: z.string().datetime().optional(),
  refreshTokenExpiresAt: z.string().datetime().optional(),
});

export class DefaultApi extends ApiClient {
  socialSignIn(data: SocialSignInRequestType): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-in/social`,
      z.object({
        redirect: z.enum([false]),
        token: z.string(),
      }),
      { body: data, bodySchema: SocialSignInRequestTypeSchema }
    );
  }

  getAuthGetsession(): Promise<Record<string, any>> {
    return this.get(
      `/auth/get-session`,
      z.object({
        session: GetAuthGetsessionResponseSessionTypeSchema,
        user: GetAuthGetsessionResponseUserTypeSchema,
      })
    );
  }

  postAuthSignout(data?: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-out`,
      z.object({
        success: z.boolean().optional(),
      }),
      { body: data, bodySchema: z.object({}) }
    );
  }

  postAuthSignupEmail(
    data?: PostAuthSignupEmailRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-up/email`,
      z.object({
        token: z.string().optional(),
        user: PostAuthSignupEmailResponseUserTypeSchema,
      }),
      { body: data, bodySchema: PostAuthSignupEmailRequestTypeSchema }
    );
  }

  postAuthSigninEmail(
    data: PostAuthSigninEmailRequestType
  ): Promise<PostAuthSigninEmailResponseType> {
    return this.post(
      `/auth/sign-in/email`,
      PostAuthSigninEmailResponseTypeSchema,
      { body: data, bodySchema: PostAuthSigninEmailRequestTypeSchema }
    );
  }

  postAuthForgetpassword(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/forget-password`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          redirectTo: z.string().optional(),
        }),
      }
    );
  }

  postAuthResetpassword(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/reset-password`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          newPassword: z.string(),
          token: z.string().optional(),
        }),
      }
    );
  }

  getAuthVerifyemail(
    token: string,
    callbackURL?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/auth/verify-email`,
      z.object({
        user: GetAuthVerifyemailResponseUserTypeSchema,
        status: z.boolean(),
      }),
      { queryParams: { token, callbackURL } }
    );
  }

  postAuthSendverificationemail(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/send-verification-email`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          callbackURL: z.string().optional(),
        }),
      }
    );
  }

  postAuthChangeemail(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/change-email`,
      z.object({
        status: z.boolean(),
        message: z
          .enum(['Email updated', 'Verification email sent'])
          .optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          newEmail: z.string(),
          callbackURL: z.string().optional(),
        }),
      }
    );
  }

  postAuthChangepassword(
    data: PostAuthChangepasswordRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/change-password`,
      z.object({
        token: z.string().optional(),
        user: PostAuthChangepasswordResponseUserTypeSchema,
      }),
      { body: data, bodySchema: PostAuthChangepasswordRequestTypeSchema }
    );
  }

  postAuthUpdateuser(data?: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/update-user`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string().optional(),
          image: z.string().optional(),
        }),
      }
    );
  }

  postAuthDeleteuser(
    data: PostAuthDeleteuserRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/delete-user`,
      z.object({
        success: z.boolean(),
        message: z.enum(['User deleted', 'Verification email sent']),
      }),
      { body: data, bodySchema: PostAuthDeleteuserRequestTypeSchema }
    );
  }

  getAuthResetpassword(
    token: string | number,
    callbackURL?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/auth/reset-password/${token}`,
      z.object({
        token: z.string().optional(),
      }),
      { queryParams: { callbackURL } }
    );
  }

  getAuthListsessions(): Promise<GetAuthListsessionsResponseItemType[]> {
    return this.get(
      `/auth/list-sessions`,
      z.array(GetAuthListsessionsResponseItemTypeSchema)
    );
  }

  postAuthRevokesession(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/revoke-session`,
      z.object({
        status: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          token: z.string(),
        }),
      }
    );
  }

  postAuthRevokesessions(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/revoke-sessions`,
      z.object({
        status: z.boolean(),
      }),
      { body: data, bodySchema: z.object({}) }
    );
  }

  postAuthRevokeothersessions(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/revoke-other-sessions`,
      z.object({
        status: z.boolean(),
      }),
      { body: data, bodySchema: z.object({}) }
    );
  }

  postAuthLinksocial(
    data: PostAuthLinksocialRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/link-social`,
      z.object({
        url: z.string(),
        redirect: z.boolean(),
      }),
      { body: data, bodySchema: PostAuthLinksocialRequestTypeSchema }
    );
  }

  getAuthListaccounts(): Promise<GetAuthListaccountsResponseItemType[]> {
    return this.get(
      `/auth/list-accounts`,
      z.array(GetAuthListaccountsResponseItemTypeSchema)
    );
  }

  getAuthDeleteuserCallback(
    token?: string,
    callbackURL?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/auth/delete-user/callback`,
      z.object({
        success: z.boolean(),
        message: z.enum(['User deleted']),
      }),
      { queryParams: { token, callbackURL } }
    );
  }

  postAuthUnlinkaccount(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/unlink-account`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          providerId: z.string(),
          accountId: z.string().optional(),
        }),
      }
    );
  }

  postAuthRefreshtoken(
    data: PostAuthRefreshtokenRequestType
  ): Promise<PostAuthRefreshtokenResponseType> {
    return this.post(
      `/auth/refresh-token`,
      PostAuthRefreshtokenResponseTypeSchema,
      { body: data, bodySchema: PostAuthRefreshtokenRequestTypeSchema }
    );
  }

  postAuthGetaccesstoken(
    data: PostAuthGetaccesstokenRequestType
  ): Promise<PostAuthGetaccesstokenResponseType> {
    return this.post(
      `/auth/get-access-token`,
      PostAuthGetaccesstokenResponseTypeSchema,
      { body: data, bodySchema: PostAuthGetaccesstokenRequestTypeSchema }
    );
  }

  getAuthOk(): Promise<Record<string, any>> {
    return this.get(
      `/auth/ok`,
      z.object({
        ok: z.boolean(),
      })
    );
  }

  getAuthError(): Promise<unknown> {
    return this.get(`/auth/error`, z.unknown());
  }
}
