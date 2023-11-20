import OpenAI from 'openai';
import { AxiosError } from 'axios';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

import { $API } from '@/shared/api';

import { APIResponse, CodeAPIMethods } from './code-api.interface';

export class CodeAPI implements CodeAPIMethods {
  public async sendMessage(messages: ChatCompletionMessageParam[]): Promise<APIResponse> {
    try {
      const response = await $API.post<OpenAI.Chat.Completions.ChatCompletionMessage>('/api/code', { messages });

      return response.data;
    } catch (error) {
      console.error('[CODE_API_SEND_MESSAGE]', error);

      return error as AxiosError;
    }
  }
}
