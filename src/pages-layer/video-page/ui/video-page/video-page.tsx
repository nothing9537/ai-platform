'use client';

import { AxiosError } from 'axios';
import { useCallback, type FC, useState, memo } from 'react';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  AIRequestForm,
  TextFormSchema,
  UserSelectVideoModelOptions,
  type VideoFormSchemaType,
} from '@/features/ai-request-form';
import { Heading } from '@/features/heading';
import { AIMessage } from '@/entities/ai-message';
import { Empty } from '@/shared/ui/empty';
import { Loading } from '@/shared/ui/loading';
import { cn } from '@/shared/lib/cn';

import { videoAPI } from '../../api';

interface VideoPageProps {
  className?: string;
}

export const VideoPage: FC<VideoPageProps> = memo(({ className }) => {
  const [video, setVideo] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const aiRequest = useCallback(async (values: VideoFormSchemaType) => {
    setIsLoading(true);
    setVideo(undefined);

    const response = await videoAPI.sendMessage(values);

    if (response instanceof AxiosError) {
      setIsLoading(false);
      return;
    }

    setVideo(response);
    setIsLoading(false);
    router.refresh();
  }, [router]);

  return (
    <section className={cn('', className)}>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video."
        Icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <AIRequestForm<VideoFormSchemaType>
          callback={aiRequest}
          formSchema={TextFormSchema}
          defaultValues={{ prompt: '', model: 'xl', negative_prompt: '' }}
          submitButtonClassName="col-span-12 w-full"
          components={[
            {
              type: 'input',
              name: 'prompt',
              placeholder: 'Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b',
              formFieldProps: {
                label: 'Prompt',
                classNames: {
                  formItem: 'col-span-12',
                  formControl: 'm-0 p-0',
                },
              },
            },
            {
              type: 'input',
              name: 'negative_prompt',
              placeholder: 'Very blue, dust, noisy, washed out, ugly, distorted, broken.',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b',
              formFieldProps: {
                label: 'Negative Prompt',
                formFieldDescription: '(optional)',
                classNames: {
                  formItem: 'col-span-12',
                  formControl: 'm-0 p-0',
                },
              },
            },
            {
              type: 'input',
              name: 'width',
              placeholder: '1920',
              valueAs: 'number',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b',
              formFieldProps: {
                label: 'Width',
                formFieldDescription: '(optional, default 576)',
                classNames: {
                  formItem: 'col-span-12',
                  formControl: 'm-0 p-0',
                },
              },
            },
            {
              type: 'input',
              name: 'height',
              placeholder: '1080',
              valueAs: 'number',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b',
              formFieldProps: {
                label: 'Height',
                formFieldDescription: '(optional, default 320)',
                classNames: {
                  formItem: 'col-span-12',
                  formControl: 'm-0 p-0',
                },
              },
            },
            {
              type: 'input',
              name: 'fps',
              placeholder: '24',
              valueAs: 'number',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b',
              formFieldProps: {
                label: 'FPS',
                formFieldDescription: '(optional, default 8)',
                classNames: {
                  formItem: 'col-span-12',
                  formControl: 'm-0 p-0',
                },
              },
            },
            {
              type: 'select',
              options: UserSelectVideoModelOptions,
              name: 'model',
              placeholder: 'Select model',
              formFieldProps: {
                label: 'Model',
                classNames: { formItem: 'col-span-12' },
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
          {!video && !isLoading && (
            <Empty label="No video generated yet." />
          )}
          {video && (
            <AIMessage
              message={{
                type: 'video',
                content: video || '',
                role: 'system',
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
});
