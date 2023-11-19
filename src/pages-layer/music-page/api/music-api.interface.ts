import { AxiosError } from 'axios';

import { MusicFormSchemaType } from '@/features/ai-request-form';

export type APIResponse = string | AxiosError;

export interface MusicAPIMethods {
  sendMessage(values: MusicFormSchemaType): Promise<APIResponse>;
}
