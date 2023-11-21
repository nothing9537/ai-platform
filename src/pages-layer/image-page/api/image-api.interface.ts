import { AxiosError } from 'axios';
import { ImageFormSchemaType } from '@/features/ai-request-form';

export type APIResponse = string[] | AxiosError;

export interface ImageAPIMethods {
  sendMessage(values: ImageFormSchemaType): Promise<APIResponse>;
}
