import axios, { AxiosError } from 'axios';

import { TextWithSelectsFormSchemaType } from '@/features/ai-request-form';

import { APIResponse, ImageAPIMethods } from './image-api.interface';

export class ImageAPI implements ImageAPIMethods {
  public async sendMessage(values: TextWithSelectsFormSchemaType): Promise<APIResponse> {
    try {
      const response = await axios.post<string[]>('/api/image', { values });

      return response.data;
    } catch (error) {
      console.error('[IMAGE_API_SEND_MESSAGE]', error);

      return error as AxiosError;
    }
  }
}
