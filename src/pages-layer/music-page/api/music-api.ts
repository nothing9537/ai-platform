import OpenAI from 'openai';
import axios, { AxiosError } from 'axios';

import { APIResponse, MusicAPIMethods } from './music-api.interface';

export class MusicAPI implements MusicAPIMethods {
  public async sendMessage(values: { prompt: string }): Promise<APIResponse> {
    try {
      const response = await axios.post<OpenAI.Chat.Completions.ChatCompletionMessage>('/api/music', values);

      return response.data;
    } catch (error) {
      console.error('[CONVERSATION_API_SEND_MESSAGE]', error);

      return error as AxiosError;
    }
  }
}
