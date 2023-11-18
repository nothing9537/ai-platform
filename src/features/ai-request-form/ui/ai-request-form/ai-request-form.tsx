'use client';

import { useCallback } from 'react';
import { DefaultValues, FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { FormFactory, type FormFactoryComponent } from '@/shared/components/form-factory';

import { FormSchema } from '../../model/types/form-schema';

type AsyncDefaultValues<T> = (payload?: unknown) => Promise<T>;

interface AIRequestFormProps<T extends FieldValues> {
  callback: (values: T, form: UseFormReturn<T>) => Promise<void>;
  components: FormFactoryComponent<T>[];
  formSchema: FormSchema;
  defaultValues?: DefaultValues<T> | AsyncDefaultValues<T>;
  submitButtonClassName?: string;
}

export const AIRequestForm = <T extends object>(props: AIRequestFormProps<T>) => {
  const { callback, components, formSchema, defaultValues, submitButtonClassName = 'col-span-12 lg:col-span-2 w-full' } = props;

  const form = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = useCallback(async (values: T) => {
    await callback(values, form);
  }, [callback, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
        <FormFactory<T>
          form={form}
          components={components}
        />
        <Button className={submitButtonClassName} disabled={isLoading}>
          Generate
        </Button>
      </form>
    </Form>
  );
};
