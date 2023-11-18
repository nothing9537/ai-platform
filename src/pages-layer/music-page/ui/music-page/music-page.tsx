'use client';

import { AxiosError } from 'axios';
import { useCallback, type FC, useState, memo } from 'react';
import { Music } from 'lucide-react';

import { AIRequestForm, MusicFormSchema, MusicFormSchemaType } from '@/features/ai-request-form';
import { Heading } from '@/features/heading';
import { AIMessage } from '@/entities/ai-message';
import { Empty } from '@/shared/ui/empty';
import { Loading } from '@/shared/ui/loading';
import { cn } from '@/shared/lib/cn';

import { musicAPI } from '../../api';

interface ConversationPageProps {
  className?: string;
}

export const MusicPage: FC<ConversationPageProps> = memo(({ className }) => {
  const [music, setMusic] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const aiRequest = useCallback(async (values: MusicFormSchemaType) => {
    setIsLoading(true);
    setMusic(undefined);

    const response = await musicAPI.sendMessage(values);

    if (response instanceof AxiosError) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, []);

  return (
    <section className={cn('', className)}>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        Icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <AIRequestForm<MusicFormSchemaType>
          callback={aiRequest}
          formSchema={MusicFormSchema}
          defaultValues={{ prompt: '' }}
          components={[
            {
              type: 'input',
              name: 'prompt',
              placeholder: 'Epic melodic death-core.',
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
          {!music && !isLoading && (
            <Empty label="No music generated yet." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            <AIMessage
              message={{
                type: 'audio',
                content: music || '',
                role: 'system',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
