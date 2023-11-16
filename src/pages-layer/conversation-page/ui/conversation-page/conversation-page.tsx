'use client';

import { AxiosError } from 'axios';
import { useCallback, type FC, useState } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { UseFormReturn } from 'react-hook-form';
import { MessageSquare } from 'lucide-react';

import { AIRequest, AiRequestForm } from '@/features/ai-request-form';
import { Heading } from '@/features/heading';
import { AiMessage, MessageRole } from '@/entities/ai-message';
import { Empty } from '@/shared/ui/empty';
import { Loading } from '@/shared/ui/loading';
import { cn } from '@/shared/lib/cn';

import { conversationAPI } from '../../api';

interface ConversationPageProps {
  className?: string;
}

export const ConversationPage: FC<ConversationPageProps> = ({ className }) => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const aiRequest = useCallback(async (values: AIRequest, form: UseFormReturn<AIRequest>) => {
    setIsLoading(true);

    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: values.prompt,
    };

    const newMessages = [...messages, userMessage];

    const response = await conversationAPI.sendMessage(newMessages);

    if (response instanceof AxiosError) {
      setIsLoading(false);
      return;
    }

    setMessages((current) => [...current, userMessage, response]);
    setIsLoading(false);
    form.reset();
  }, [messages]);

  return (
    <section className={cn('', className)}>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        Icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <AiRequestForm
          placeholder="What is the first 20 digits of π number?"
          callback={aiRequest}
        />
        <div className="space-y-4 mt-4">
          {isLoading && (
            <Loading />
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No messages yet." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <AiMessage
                key={message.content as string}
                message={{
                  type: 'text',
                  content: message.content as string,
                  role: message.role as MessageRole,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
