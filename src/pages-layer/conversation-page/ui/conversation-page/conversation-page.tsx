'use client';

import { AxiosError } from 'axios';
import { useCallback, type FC, useState, memo } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { UseFormReturn } from 'react-hook-form';
import { MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AIRequestForm, TextFormSchema, TextFormSchemaType } from '@/features/ai-request-form';
import { Heading } from '@/features/heading';
import { AIMessage, MessageRole } from '@/entities/ai-message';
import { Empty } from '@/shared/ui/empty';
import { Loading } from '@/shared/ui/loading';
import { cn } from '@/shared/lib/cn';

import { conversationAPI } from '../../api';

interface ConversationPageProps {
  className?: string;
}

export const ConversationPage: FC<ConversationPageProps> = memo(({ className }) => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const aiRequest = useCallback(async (values: TextFormSchemaType, form: UseFormReturn<TextFormSchemaType>) => {
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
    router.refresh();
  }, [messages, router]);

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
        <AIRequestForm
          callback={aiRequest}
          formSchema={TextFormSchema}
          defaultValues={{ prompt: '' }}
          components={[
            {
              type: 'input',
              name: 'prompt',
              placeholder: 'What is the first 20 digits of π number?',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent',
              formFieldProps: {
                classNames: {
                  formItem: 'col-span-12 lg:col-span-10',
                  formControl: 'm-0 p-0',
                },
              },
            },
          ]}
        />
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loading />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No messages yet." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <AIMessage
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
});
