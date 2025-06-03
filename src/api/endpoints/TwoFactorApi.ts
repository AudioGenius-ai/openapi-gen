import { ApiClient } from '../ApiClient';
import { z } from 'zod';

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
        user: z.object({
          id: z.string(),
          email: z.string().email().optional(),
          emailVerified: z.boolean().optional(),
          name: z.string().optional(),
          image: z.string().url().optional(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
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
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/auth/two-factor/verify-backup-code`,
      z.object({
        user: z.object({
          id: z.string(),
          email: z.string().email().optional(),
          emailVerified: z.boolean().optional(),
          name: z.string().optional(),
          image: z.string().url().optional(),
          twoFactorEnabled: z.boolean(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
        session: z.object({
          token: z.string(),
          userId: z.string(),
          createdAt: z.string().datetime(),
          expiresAt: z.string().datetime(),
        }),
      }),
      {
        body: data,
        bodySchema: z.object({
          code: z.string(),
          disableSession: z.string().optional(),
          trustDevice: z.string().optional(),
        }),
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
