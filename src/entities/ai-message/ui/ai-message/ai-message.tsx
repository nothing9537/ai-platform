import { type FC, memo, type ReactNode } from 'react';

import { AIMessageText } from '../ai-message-text/ai-message-text';
import { AIMessageCode } from '../ai-message-code/ai-message-code';
import { AIMessageImage } from '../ai-message-image/ai-message-image';
import { AIMessageAudio } from '../ai-message-audio/ai-message-audio';
import { AIMessageVideo } from '../ai-message-video/ai-message-video';

import { UserMessage } from '../user-message/user-message';
import { AIMessageType } from '../../model/types/ai-message';

interface AIMessageProps {
  className?: string;
  message: AIMessageType;
}

const renderMessage = (message: AIMessageType): ReactNode => {
  if (message.role === 'user') {
    return <UserMessage content={message.content} />;
  }

  switch (message.type) {
    case 'text':
      return <AIMessageText content={message.content} />;
    case 'code':
      return <AIMessageCode content={message.content} />;
    case 'image':
      return <AIMessageImage content={message.content} />;
    case 'audio':
      return <AIMessageAudio content={message.content} />;
    case 'video':
      return <AIMessageVideo content={message.content} />;
    default:
      return null;
  }
};

export const AIMessage: FC<AIMessageProps> = memo(({ message }) => {
  return (
    renderMessage(message)
  );
});
