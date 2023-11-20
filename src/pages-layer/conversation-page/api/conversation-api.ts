import OpenAI from 'openai';
import { AxiosError } from 'axios';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

import { $API } from '@/shared/api';

import { APIResponse, ConversationAPIMethods } from './conversation-api.interface';

export class ConversationAPI implements ConversationAPIMethods {
  public async sendMessage(messages: ChatCompletionMessageParam[]): Promise<APIResponse> {
    try {
      const response = await $API.post<OpenAI.Chat.Completions.ChatCompletionMessage>('/api/conversation', { messages });

      return response.data;
    } catch (error) {
      console.error('[CONVERSATION_API_SEND_MESSAGE]', error);

      return error as AxiosError;
    }
  }
}
