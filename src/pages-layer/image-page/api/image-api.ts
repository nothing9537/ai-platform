import { AxiosError } from 'axios';

import { ImageFormSchemaType } from '@/features/ai-request-form';
import { $API } from '@/shared/api';

import { APIResponse, ImageAPIMethods } from './image-api.interface';

export class ImageAPI implements ImageAPIMethods {
  public async sendMessage(values: ImageFormSchemaType): Promise<APIResponse> {
    try {
      const response = await $API.post<string[]>('/api/image', { values });

      return response.data;
    } catch (error) {
      console.error('[IMAGE_API_SEND_MESSAGE]', error);

      return error as AxiosError;
    }
  }
}
