'use client';

import { FC, memo, useCallback } from 'react';
import { DefaultValues, UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { FormFactory, FormFactoryComponent } from '@/shared/components/form-factory';

import { FormSchema, FromSchemaType } from '../../model/types/form-schema';

type AsyncDefaultValues<T> = (payload?: unknown) => Promise<T>;

interface AIRequestFormProps {
  callback: (values: FromSchemaType, form: UseFormReturn<FromSchemaType>) => Promise<void>;
  components: FormFactoryComponent<FromSchemaType>[];
  formSchema: FormSchema;
  defaultValues?: DefaultValues<FromSchemaType> | AsyncDefaultValues<FromSchemaType>;
  submitButtonClassName?: string;
}

export const AIRequestForm: FC<AIRequestFormProps> = memo((props) => {
  const { callback, components, formSchema, defaultValues, submitButtonClassName = 'col-span-12 lg:col-span-2 w-full' } = props;

  const form = useForm<FromSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = useCallback(async (values: FromSchemaType) => {
    await callback(values, form);
  }, [callback, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
        <FormFactory<FromSchemaType>
          form={form}
          components={components}
        />
        <Button className={submitButtonClassName} disabled={isLoading}>
          Generate
        </Button>
      </form>
    </Form>
  );
});
