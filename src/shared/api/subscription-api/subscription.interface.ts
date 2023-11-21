import { AxiosError } from 'axios';

export type APIRouteReturn = { url: string } | AxiosError;

export interface SubscriptionAPIMethods {
  getSubscriptionUrl(): Promise<APIRouteReturn>
}
