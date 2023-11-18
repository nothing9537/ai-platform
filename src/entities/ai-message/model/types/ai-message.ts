import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

interface AIMessageBase {
  type: 'text' | 'video' | 'image' | 'audio' | 'code';
  role: MessageRole;
  content: unknown;
}

interface AIMessageText extends AIMessageBase {
  type: 'text';
  content: string;
}

interface AIMessageCode extends AIMessageBase {
  type: 'code';
  content: string;
}
interface AIMessageImage extends AIMessageBase {
  type: 'image';
  content: string;
}
interface AIMessageAudio extends AIMessageBase {
  type: 'audio';
  content: string;
}

export type MessageRole = Pick<ChatCompletionMessageParam, 'role'>['role'];

export type AIMessageType =
  AIMessageText
  | AIMessageCode
  | AIMessageImage
  | AIMessageAudio;
