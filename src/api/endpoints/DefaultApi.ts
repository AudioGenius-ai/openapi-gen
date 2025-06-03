import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class DefaultApi extends ApiClient {
  socialSignIn(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-in/social`,
      z.object({
        redirect: z.enum([false]),
        token: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          callbackURL: z.string().optional(),
          newUserCallbackURL: z.string().optional(),
          errorCallbackURL: z.string().optional(),
          provider: z.string(),
          disableRedirect: z.string().optional(),
          idToken: z.string().optional(),
          scopes: z.string().optional(),
          requestSignUp: z.string().optional(),
          loginHint: z.string().optional(),
        }),
      }
    );
  }

  getAuthGetsession(): Promise<Record<string, any>> {
    return this.get(
      `/auth/get-session`,
      z.object({
        session: z.object({
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
        }),
        user: z.object({
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
        }),
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
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-up/email`,
      z.object({
        token: z.string().optional(),
        user: z.object({
          id: z.string(),
          email: z.string().email(),
          name: z.string(),
          image: z.string().url().optional(),
          emailVerified: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string(),
          callbackURL: z.string().optional(),
        }),
      }
    );
  }

  postAuthSigninEmail(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/sign-in/email`,
      z.object({
        redirect: z.enum([false]),
        token: z.string(),
        url: z.unknown().optional(),
        user: z.object({
          id: z.string(),
          email: z.string(),
          name: z.string().optional(),
          image: z.string().optional(),
          emailVerified: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          email: z.string(),
          password: z.string(),
          callbackURL: z.string().optional(),
          rememberMe: z.string().optional(),
        }),
      }
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
        user: z.object({
          id: z.string(),
          email: z.string(),
          name: z.string(),
          image: z.string(),
          emailVerified: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
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
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/change-password`,
      z.object({
        token: z.string().optional(),
        user: z.object({
          id: z.string(),
          email: z.string().email(),
          name: z.string(),
          image: z.string().url().optional(),
          emailVerified: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          newPassword: z.string(),
          currentPassword: z.string(),
          revokeOtherSessions: z.string().optional(),
        }),
      }
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

  postAuthDeleteuser(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/delete-user`,
      z.object({
        success: z.boolean(),
        message: z.enum(['User deleted', 'Verification email sent']),
      }),
      {
        body: data,
        bodySchema: z.object({
          callbackURL: z.string().optional(),
          password: z.string().optional(),
          token: z.string().optional(),
        }),
      }
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

  getAuthListsessions(): Promise<unknown> {
    return this.get(
      `/auth/list-sessions`,
      z.array(
        z.object({
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
        })
      )
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

  postAuthLinksocial(data: Record<string, any>): Promise<Record<string, any>> {
    return this.post(
      `/auth/link-social`,
      z.object({
        url: z.string(),
        redirect: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          callbackURL: z.string().optional(),
          provider: z.string(),
          scopes: z.string().optional(),
        }),
      }
    );
  }

  getAuthListaccounts(): Promise<unknown> {
    return this.get(
      `/auth/list-accounts`,
      z.array(
        z.object({
          id: z.string().optional(),
          provider: z.string().optional(),
          createdAt: z.string().datetime().optional(),
          updatedAt: z.string().datetime().optional(),
        })
      )
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
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/refresh-token`,
      z.object({
        tokenType: z.string().optional(),
        idToken: z.string().optional(),
        accessToken: z.string().optional(),
        refreshToken: z.string().optional(),
        accessTokenExpiresAt: z.string().datetime().optional(),
        refreshTokenExpiresAt: z.string().datetime().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          providerId: z.string(),
          accountId: z.string().optional(),
          userId: z.string().optional(),
        }),
      }
    );
  }

  postAuthGetaccesstoken(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/get-access-token`,
      z.object({
        tokenType: z.string().optional(),
        idToken: z.string().optional(),
        accessToken: z.string().optional(),
        refreshToken: z.string().optional(),
        accessTokenExpiresAt: z.string().datetime().optional(),
        refreshTokenExpiresAt: z.string().datetime().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          providerId: z.string(),
          accountId: z.string().optional(),
          userId: z.string().optional(),
        }),
      }
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
