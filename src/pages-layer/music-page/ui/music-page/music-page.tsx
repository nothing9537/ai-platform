'use client';

import { AxiosError } from 'axios';
import { useCallback, type FC, useState, memo } from 'react';
import { Music } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  AIRequestForm,
  MusicFormSchema,
  type MusicFormSchemaType,
  UserSelectModelVersionOptions,
  UserSelectNormalizationStrategyOptions,
  UserSelectOutputFormatOptions,
} from '@/features/ai-request-form';
import { Heading } from '@/features/heading';
import { AIMessage } from '@/entities/ai-message';
import { Empty } from '@/shared/ui/empty';
import { Loading } from '@/shared/ui/loading';
import { cn } from '@/shared/lib/cn';
import { useToast } from '@/shared/ui/use-toast';

import { musicAPI } from '../../api';

interface VideoPageProps {
  className?: string;
}

export const MusicPage: FC<VideoPageProps> = memo(({ className }) => {
  const [music, setMusic] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const aiRequest = useCallback(async (values: MusicFormSchemaType) => {
    setIsLoading(true);
    setMusic(undefined);

    const response = await musicAPI.sendMessage(values);

    if (response instanceof AxiosError) {
      setIsLoading(false);
      toast({ variant: 'destructive', description: 'Something went wrong' });

      return;
    }

    setMusic(response);
    setIsLoading(false);
    router.refresh();
  }, [router, toast]);

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
          submitButtonClassName="col-span-12 w-full"
          defaultValues={{
            prompt: '',
            seed: -1,
            duration: 10,
            model_version: 'large',
            normalization_strategy: 'loudness',
            output_format: 'wav',
          }}
          components={[
            {
              type: 'input',
              name: 'prompt',
              placeholder: 'Epic melodic death-core.',
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
              name: 'duration',
              placeholder: '25',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b',
              valueAs: 'number',
              formFieldProps: {
                label: 'Duration',
                classNames: {
                  formItem: 'col-span-12',
                  formControl: 'm-0 p-0',
                },
              },
            },
            {
              type: 'input',
              name: 'seed',
              placeholder: '3442726813',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b',
              valueAs: 'number',
              formFieldProps: {
                label: 'Seed',
                formFieldDescription: '( -1 for random )',
                classNames: {
                  formItem: 'col-span-12',
                  formControl: 'm-0 p-0',
                },
              },
            },
            {
              type: 'select',
              options: UserSelectModelVersionOptions,
              name: 'model_version',
              placeholder: 'Select model version',
              formFieldProps: {
                label: 'Model version',
                classNames: { formItem: 'col-span-12' },
              },
            },
            {
              type: 'select',
              options: UserSelectNormalizationStrategyOptions,
              name: 'normalization_strategy',
              placeholder: 'Select normalization strategy',
              formFieldProps: {
                label: 'Normalization strategy',
                classNames: { formItem: 'col-span-12' },
              },
            },
            {
              type: 'select',
              options: UserSelectOutputFormatOptions,
              name: 'output_format',
              placeholder: 'Select output format',
              formFieldProps: {
                label: 'Output format',
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
          {!music && !isLoading && (
            <Empty label="No music generated yet." />
          )}
          {music && (
            <AIMessage
              message={{
                type: 'audio',
                content: music || '',
                role: 'system',
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
});
