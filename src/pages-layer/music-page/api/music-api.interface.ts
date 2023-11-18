import OpenAI from 'openai';
import { AxiosError } from 'axios';

export type APIResponse = OpenAI.Chat.Completions.ChatCompletionMessage | AxiosError;

export interface MusicAPIMethods {
  sendMessage(values: { prompt: string }): Promise<APIResponse>;
}
