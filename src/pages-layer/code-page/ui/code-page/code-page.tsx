'use client';

import { AxiosError } from 'axios';
import { useCallback, type FC, useState } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { UseFormReturn } from 'react-hook-form';
import { Code } from 'lucide-react';

import { AIRequest, AiRequestForm } from '@/features/ai-request-form';
import { Heading } from '@/features/heading';
import { AiMessage, MessageRole } from '@/entities/ai-message';
import { Empty } from '@/shared/ui/empty';
import { Loading } from '@/shared/ui/loading';
import { cn } from '@/shared/lib/cn';

import { codeAPI } from '../../api';

interface CodePageProps {
  className?: string;
}

export const CodePage: FC<CodePageProps> = ({ className }) => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const aiRequest = useCallback(async (values: AIRequest, form: UseFormReturn<AIRequest>) => {
    setIsLoading(true);

    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: values.prompt,
    };

    const newMessages = [...messages, userMessage];

    const response = await codeAPI.sendMessage(newMessages);

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
        title="Code Generation"
        description="Generate code using descriptive text."
        Icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <AiRequestForm
          placeholder="Simple modal window using React Hooks and TailwindCSS"
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
                  type: 'code',
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
