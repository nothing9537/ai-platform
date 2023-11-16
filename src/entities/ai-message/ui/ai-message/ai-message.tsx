'use client';

import { type FC, memo, type ReactNode } from 'react';

import { AIMessage } from '../../model/types/ai-message';
import { AIMessageText } from '../ai-message-text/ai-message-text';
import { UserMessage } from '../user-message/user-message';

interface AiMessageProps {
  className?: string;
  message: AIMessage;
}

const renderMessage = (message: AIMessage): ReactNode => {
  if (message.role === 'user') {
    return <UserMessage content={message.content} />;
  }

  switch (message.type) {
    case 'text':
      return <AIMessageText content={message.content} />;
    default:
      return null;
  }
};

export const AiMessage: FC<AiMessageProps> = memo(({ message }) => {
  return (
    renderMessage(message)
  );
});
