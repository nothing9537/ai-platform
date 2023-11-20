import { AxiosError } from 'axios';

import { MusicFormSchemaType } from '@/features/ai-request-form';
import { $API } from '@/shared/api';

import { APIResponse, MusicAPIMethods } from './music-api.interface';

export class MusicAPI implements MusicAPIMethods {
  public async sendMessage(values: MusicFormSchemaType): Promise<APIResponse> {
    try {
      const response = await $API.post<string>('/api/music', values);

      return response.data;
    } catch (error) {
      console.error('[MUSIC_API_SEND_MESSAGE]', error);

      return error as AxiosError;
    }
  }
}
