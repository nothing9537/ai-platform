'use client';

import { type FC, memo, useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { FormFieldWrapper } from '@/shared/components/form-field-wrapper';

import { FormSchema } from '../../model/types/form-schema';
import { formSchema } from '../../model/consts/form-schema';

interface AiRequestFormProps {
  className?: string;
  placeholder?: string;
  callback: (values: FormSchema, form: UseFormReturn<FormSchema>) => Promise<void>;
}

export const AiRequestForm: FC<AiRequestFormProps> = memo(({ placeholder, callback }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = useCallback(async (values: FormSchema) => {
    await callback(values, form);
  }, [callback, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
        <FormFieldWrapper
          form={form}
          name="prompt"
          classNames={{
            formItem: 'col-span-12 lg:col-span-10',
            formControl: 'm-0 p-0',
          }}
        >
          {({ field }) => (
            <Input
              disabled={isLoading}
              className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              placeholder={placeholder}
              {...field}
            />
          )}
        </FormFieldWrapper>
        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
          Generate
        </Button>
      </form>
    </Form>
  );
});
