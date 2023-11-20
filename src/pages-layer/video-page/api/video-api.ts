import axios, { AxiosError } from 'axios';

import { VideoFormSchemaType } from '@/features/ai-request-form';

import { APIResponse, VideoAPIMethods } from './video-api.interface';

export class VideoAPI implements VideoAPIMethods {
  public async sendMessage(values: VideoFormSchemaType): Promise<APIResponse> {
    try {
      const response = await axios.post<string>('/api/video', values);

      return response.data[0];
    } catch (error) {
      console.error('[VIDEO_API_SEND_MESSAGE]', error);

      return error as AxiosError;
    }
  }
}
