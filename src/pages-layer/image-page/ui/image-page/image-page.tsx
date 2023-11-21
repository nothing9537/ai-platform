'use client';

import { AxiosError } from 'axios';
import { useCallback, type FC, useState } from 'react';
import { Code } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  AIRequestForm,
  ImageFormSchema,
  ImageFormSchemaType,
  UserSelectAmountOptions,
  UserSelectResolutionOptions,
} from '@/features/ai-request-form';
import { Heading } from '@/features/heading';
import { AIMessage } from '@/entities/ai-message';
import { Empty } from '@/shared/ui/empty';
import { Loading } from '@/shared/ui/loading';
import { cn } from '@/shared/lib/cn';
import { useToast } from '@/shared/ui/use-toast';

import { imageAPI } from '../../api';

interface ImagePageProps {
  className?: string;
}

export const ImagePage: FC<ImagePageProps> = ({ className }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const aiRequest = useCallback(async (values: ImageFormSchemaType) => {
    setImages([]);
    setIsLoading(true);

    const response = await imageAPI.sendMessage(values);

    if (response instanceof AxiosError) {
      setIsLoading(false);
      toast({ variant: 'destructive', description: 'Something went wrong' });

      return;
    }

    setImages(response);
    setIsLoading(false);
    router.refresh();
  }, [router, toast]);

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
        <AIRequestForm<ImageFormSchemaType>
          callback={aiRequest}
          formSchema={ImageFormSchema}
          defaultValues={{ prompt: '', amount: '1', resolution: '512x512' }}
          components={[
            {
              type: 'input',
              name: 'prompt',
              placeholder: 'A picture of a Black Hole',
              className: 'border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent',
              formFieldProps: {
                classNames: { formItem: 'col-span-12 lg:col-span-6', formControl: 'm-0 p-0' },
              },
            },
            {
              type: 'select',
              options: UserSelectAmountOptions,
              name: 'amount',
              placeholder: 'Select amount of photos',
              formFieldProps: {
                classNames: { formItem: 'col-span-12 lg:col-span-2' },
              },
            },
            {
              type: 'select',
              options: UserSelectResolutionOptions,
              name: 'resolution',
              placeholder: 'Select resolution',
              formFieldProps: {
                classNames: { formItem: 'col-span-12 lg:col-span-2' },
              },
            },
          ]}
        />
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loading />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated yet." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((imageUrl) => (
              <AIMessage
                key={imageUrl}
                message={{ type: 'image', content: imageUrl, role: 'system' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
