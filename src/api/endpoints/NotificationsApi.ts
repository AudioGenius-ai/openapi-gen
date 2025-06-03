import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export class NotificationsApi extends ApiClient {
  postNotificationsTokenRegister(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/notifications/token/register`,
      z.object({
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          token: z.string(),
          deviceType: z.enum(['ios', 'android', 'web']),
          deviceInfo: z
            .object({
              deviceName: z.string().optional(),
              deviceModel: z.string().optional(),
              browserName: z.string().optional(),
              browserVersion: z.string().optional(),
              osName: z.string().optional(),
              osVersion: z.string().optional(),
            })
            .optional(),
        }),
      }
    );
  }

  deleteNotificationsToken(
    token: string | number
  ): Promise<Record<string, any>> {
    return this.delete(
      `/notifications/token/${token}`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  getNotifications(
    limit?: string,
    offset?: string,
    status?: string
  ): Promise<Record<string, any>> {
    return this.get(
      `/notifications`,
      z.object({
        items: z.array(
          z.object({
            id: z.string(),
            userId: z.string(),
            title: z.string().max(200),
            body: z.string().max(1000),
            data: z.record(z.unknown()),
            status: z.enum(['pending', 'sent', 'failed', 'delivered', 'read']),
            priority: z.enum(['default', 'normal', 'high']),
            image: z.string(),
            createdAt: z.union([z.string(), z.string()]),
            updatedAt: z.union([z.string(), z.string()]),
          })
        ),
        total: z.number(),
        limit: z.number(),
        offset: z.number(),
      }),
      { queryParams: { limit, offset, status } }
    );
  }

  postNotificationsRead(id: string | number): Promise<Record<string, any>> {
    return this.post(
      `/notifications/${id}/read`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postNotificationsDelivered(
    id: string | number
  ): Promise<Record<string, any>> {
    return this.post(
      `/notifications/${id}/delivered`,
      z.object({
        success: z.boolean(),
      })
    );
  }

  postNotificationsSend(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.post(
      `/notifications/send`,
      z.object({
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: z.object({
          userId: z.string(),
          title: z.string().max(200),
          body: z.string().max(1000),
          data: z.record(z.unknown()).optional(),
          image: z.string().url().optional(),
          priority: z.enum(['default', 'normal', 'high']).optional(),
        }),
      }
    );
  }

  getUsersMeNotificationsettings(): Promise<Record<string, any>> {
    return this.get(
      `/users/me/notification-settings`,
      z.object({
        pushEnabled: z.boolean(),
        emailEnabled: z.boolean(),
        marketingEnabled: z.boolean(),
        newLoginAlerts: z.boolean(),
        messageNotifications: z.boolean(),
        updateNotifications: z.boolean(),
        doNotDisturb: z.boolean(),
        doNotDisturbStart: z.string(),
        doNotDisturbEnd: z.string(),
      })
    );
  }

  putUsersMeNotificationsettings(
    data?: Record<string, any>
  ): Promise<Record<string, any>> {
    return this.put(
      `/users/me/notification-settings`,
      z.object({
        pushEnabled: z.boolean(),
        emailEnabled: z.boolean(),
        marketingEnabled: z.boolean(),
        newLoginAlerts: z.boolean(),
        messageNotifications: z.boolean(),
        updateNotifications: z.boolean(),
        doNotDisturb: z.boolean(),
        doNotDisturbStart: z.string(),
        doNotDisturbEnd: z.string(),
      }),
      {
        body: data,
        bodySchema: z.object({
          pushEnabled: z.boolean().optional(),
          emailEnabled: z.boolean().optional(),
          marketingEnabled: z.boolean().optional(),
          newLoginAlerts: z.boolean().optional(),
          messageNotifications: z.boolean().optional(),
          updateNotifications: z.boolean().optional(),
          doNotDisturb: z.boolean().optional(),
          doNotDisturbStart: z.string().optional(),
          doNotDisturbEnd: z.string().optional(),
        }),
      }
    );
  }
}
