import axios, { AxiosError } from 'axios';
import { APIRouteReturn, SubscriptionAPIMethods } from './subscription.interface';

export class SubscriptionAPI implements SubscriptionAPIMethods {
  public async getSubscriptionUrl(): Promise<APIRouteReturn> {
    try {
      const response = await axios.get<{ url: string }>('/api/stripe');

      return response.data;
    } catch (error) {
      console.error('[SUBSCRIPTION_API_GET]', error);

      return error as AxiosError;
    }
  }
}
