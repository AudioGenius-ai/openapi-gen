import { ApiClient } from '../ApiClient';
import { z } from 'zod';

export interface PostNotificationsTokenRegisterRequestDeviceInfoType {
  deviceName?: string;
  deviceModel?: string;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  osVersion?: string;
}

export const PostNotificationsTokenRegisterRequestDeviceInfoTypeSchema =
  z.object({
    deviceName: z.string().optional(),
    deviceModel: z.string().optional(),
    browserName: z.string().optional(),
    browserVersion: z.string().optional(),
    osName: z.string().optional(),
    osVersion: z.string().optional(),
  });

export interface PostNotificationsTokenRegisterRequestType {
  token: string;
  deviceType: 'ios';
  android;
  web;
  deviceInfo?: PostNotificationsTokenRegisterRequestDeviceInfoType;
}

export const PostNotificationsTokenRegisterRequestTypeSchema = z.object({
  token: z.string(),
  deviceType: z.enum(['ios', 'android', 'web']),
  deviceInfo:
    PostNotificationsTokenRegisterRequestDeviceInfoTypeSchema.optional(),
});

export interface GetNotificationsResponseItemsItemType {
  id: string;
  userId: string;
  title: string;
  body: string;
  data: Record<string, unknown>;
  status: 'pending';
  sent;
  failed;
  delivered;
  read;
  priority: 'default';
  normal;
  high;
  image: string;
  createdAt: string | string;
  updatedAt: string | string;
}

export const GetNotificationsResponseItemsItemTypeSchema = z.object({
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
});

export interface GetNotificationsResponseType {
  items: GetNotificationsResponseItemsItemType[];
  total: number;
  limit: number;
  offset: number;
}

export const GetNotificationsResponseTypeSchema = z.object({
  items: z.array(GetNotificationsResponseItemsItemTypeSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
});

export interface PostNotificationsSendRequestType {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  image?: string;
  priority?: 'default';
  normal;
  high;
}

export const PostNotificationsSendRequestTypeSchema = z.object({
  userId: z.string(),
  title: z.string().max(200),
  body: z.string().max(1000),
  data: z.record(z.unknown()).optional(),
  image: z.string().url().optional(),
  priority: z.enum(['default', 'normal', 'high']).optional(),
});

export interface GetUsersMeNotificationsettingsResponseType {
  pushEnabled: boolean;
  emailEnabled: boolean;
  marketingEnabled: boolean;
  newLoginAlerts: boolean;
  messageNotifications: boolean;
  updateNotifications: boolean;
  doNotDisturb: boolean;
  doNotDisturbStart: string;
  doNotDisturbEnd: string;
}

export const GetUsersMeNotificationsettingsResponseTypeSchema = z.object({
  pushEnabled: z.boolean(),
  emailEnabled: z.boolean(),
  marketingEnabled: z.boolean(),
  newLoginAlerts: z.boolean(),
  messageNotifications: z.boolean(),
  updateNotifications: z.boolean(),
  doNotDisturb: z.boolean(),
  doNotDisturbStart: z.string(),
  doNotDisturbEnd: z.string(),
});

export interface PutUsersMeNotificationsettingsRequestType {
  pushEnabled?: boolean;
  emailEnabled?: boolean;
  marketingEnabled?: boolean;
  newLoginAlerts?: boolean;
  messageNotifications?: boolean;
  updateNotifications?: boolean;
  doNotDisturb?: boolean;
  doNotDisturbStart?: string;
  doNotDisturbEnd?: string;
}

export const PutUsersMeNotificationsettingsRequestTypeSchema = z.object({
  pushEnabled: z.boolean().optional(),
  emailEnabled: z.boolean().optional(),
  marketingEnabled: z.boolean().optional(),
  newLoginAlerts: z.boolean().optional(),
  messageNotifications: z.boolean().optional(),
  updateNotifications: z.boolean().optional(),
  doNotDisturb: z.boolean().optional(),
  doNotDisturbStart: z.string().optional(),
  doNotDisturbEnd: z.string().optional(),
});

export interface PutUsersMeNotificationsettingsResponseType {
  pushEnabled: boolean;
  emailEnabled: boolean;
  marketingEnabled: boolean;
  newLoginAlerts: boolean;
  messageNotifications: boolean;
  updateNotifications: boolean;
  doNotDisturb: boolean;
  doNotDisturbStart: string;
  doNotDisturbEnd: string;
}

export const PutUsersMeNotificationsettingsResponseTypeSchema = z.object({
  pushEnabled: z.boolean(),
  emailEnabled: z.boolean(),
  marketingEnabled: z.boolean(),
  newLoginAlerts: z.boolean(),
  messageNotifications: z.boolean(),
  updateNotifications: z.boolean(),
  doNotDisturb: z.boolean(),
  doNotDisturbStart: z.string(),
  doNotDisturbEnd: z.string(),
});

export class NotificationsApi extends ApiClient {
  postNotificationsTokenRegister(
    data?: PostNotificationsTokenRegisterRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/notifications/token/register`,
      z.object({
        success: z.boolean(),
      }),
      {
        body: data,
        bodySchema: PostNotificationsTokenRegisterRequestTypeSchema,
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
  ): Promise<GetNotificationsResponseType> {
    return this.get(`/notifications`, GetNotificationsResponseTypeSchema, {
      queryParams: { limit, offset, status },
    });
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
    data?: PostNotificationsSendRequestType
  ): Promise<Record<string, any>> {
    return this.post(
      `/notifications/send`,
      z.object({
        success: z.boolean(),
      }),
      { body: data, bodySchema: PostNotificationsSendRequestTypeSchema }
    );
  }

  getUsersMeNotificationsettings(): Promise<GetUsersMeNotificationsettingsResponseType> {
    return this.get(
      `/users/me/notification-settings`,
      GetUsersMeNotificationsettingsResponseTypeSchema
    );
  }

  putUsersMeNotificationsettings(
    data?: PutUsersMeNotificationsettingsRequestType
  ): Promise<PutUsersMeNotificationsettingsResponseType> {
    return this.put(
      `/users/me/notification-settings`,
      PutUsersMeNotificationsettingsResponseTypeSchema,
      {
        body: data,
        bodySchema: PutUsersMeNotificationsettingsRequestTypeSchema,
      }
    );
  }
}
