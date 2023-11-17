import { AxiosError } from 'axios';
import { TextWithSelectsFormSchemaType } from '@/features/ai-request-form';

export type APIResponse = string[] | AxiosError;

export interface ImageAPIMethods {
  sendMessage(values: TextWithSelectsFormSchemaType): Promise<APIResponse>;
}
