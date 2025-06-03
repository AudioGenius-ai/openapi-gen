import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostAuthTwofactorVerifyotpResponseUserType {
  id: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export const PostAuthTwofactorVerifyotpResponseUserTypeSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  emailVerified: z.boolean().optional(),
  name: z.string().optional(),
  image: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export interface PostAuthTwofactorVerifybackupcodeRequestType {
  code: string;
  disableSession?: string;
  trustDevice?: string;
}

export const PostAuthTwofactorVerifybackupcodeRequestTypeSchema = z.object({
  code: z.string(),
  disableSession: z.string().optional(),
  trustDevice: z.string().optional(),
});

export interface PostAuthTwofactorVerifybackupcodeResponseUserType {
  id: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  image?: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PostAuthTwofactorVerifybackupcodeResponseUserTypeSchema = z.object(
  {
    id: z.string(),
    email: z.string().email().optional(),
    emailVerified: z.boolean().optional(),
    name: z.string().optional(),
    image: z.string().url().optional(),
    twoFactorEnabled: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }
);

export interface PostAuthTwofactorVerifybackupcodeResponseSessionType {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export const PostAuthTwofactorVerifybackupcodeResponseSessionTypeSchema =
  z.object({
    token: z.string(),
    userId: z.string(),
    createdAt: z.string().datetime(),
    expiresAt: z.string().datetime(),
  });

export class TwoFactorApi extends ApiClient {
  postAuthTwofactorGettotpuri(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/get-totp-uri`,
      z.object({
        totpURI: z.string().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          password: z.string(),
        }),
      }
    );
  }

  postAuthTwofactorVerifytotp(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/verify-totp`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          code: z.string(),
          trustDevice: z.string().optional(),
        }),
      }
    );
  }

  postAuthTwofactorSendotp(): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/send-otp`,
      z.object({
        status: z.boolean().optional(),
      })
    );
  }

  postAuthTwofactorVerifyotp(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/verify-otp`,
      z.object({
        token: z.string(),
        user: PostAuthTwofactorVerifyotpResponseUserTypeSchema,
      }),
      {
        body: data,
        bodySchema: z.object({
          code: z.string(),
          trustDevice: z.string().optional(),
        }),
      }
    );
  }

  postAuthTwofactorVerifybackupcode(
    data: PostAuthTwofactorVerifybackupcodeRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/verify-backup-code`,
      z.object({
        user: PostAuthTwofactorVerifybackupcodeResponseUserTypeSchema,
        session: PostAuthTwofactorVerifybackupcodeResponseSessionTypeSchema,
      }),
      {
        body: data,
        bodySchema: PostAuthTwofactorVerifybackupcodeRequestTypeSchema,
      }
    );
  }

  postAuthTwofactorGeneratebackupcodes(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/generate-backup-codes`,
      z.object({
        status: z.enum([true]),
        backupCodes: z.array(z.string()),
      }),
      {
        body: data,
        bodySchema: z.object({
          password: z.string(),
        }),
      }
    );
  }

  postAuthTwofactorEnable(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/enable`,
      z.object({
        totpURI: z.string().optional(),
        backupCodes: z.array(z.string()).optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          password: z.string(),
          issuer: z.string().optional(),
        }),
      }
    );
  }

  postAuthTwofactorDisable(
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/disable`,
      z.object({
        status: z.boolean().optional(),
      }),
      {
        body: data,
        bodySchema: z.object({
          password: z.string(),
        }),
      }
    );
  }
}
