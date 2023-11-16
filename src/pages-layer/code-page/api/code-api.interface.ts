import OpenAI from 'openai';
import { AxiosError } from 'axios';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export type APIResponse = OpenAI.Chat.Completions.ChatCompletionMessage | AxiosError;

export interface CodeAPIMethods {
  sendMessage(messages: ChatCompletionMessageParam[]): Promise<APIResponse>;
}
