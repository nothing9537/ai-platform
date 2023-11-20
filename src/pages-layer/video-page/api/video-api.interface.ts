import { AxiosError } from 'axios';

import { VideoFormSchemaType } from '@/features/ai-request-form';

export type APIResponse = string | AxiosError;

export interface VideoAPIMethods {
  sendMessage(values: VideoFormSchemaType): Promise<APIResponse>;
}
