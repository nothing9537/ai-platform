'use client';

import { type ReactElement, createContext, useCallback } from 'react';
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '../ui/form';
import { cn } from '../lib/cn';

interface FormFieldWrapperProps<T extends FieldValues> extends FormFieldOverviewProps {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: (props: FormFieldContextProps<T>) => ReactElement;
}

export interface FormFieldOverviewProps {
  label?: string;
  withError?: boolean;
  customControl?: boolean;
  formFieldDescription?: string;
  classNames?: {
    formItem?: string;
    formMessage?: string;
    formLabel?: string;
    formDescription?: string;
    formControl?: string;
  }
}

export interface FormFieldContextProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
}

const FormFieldContext = createContext({});

export const FormFieldWrapper = <T extends FieldValues>(props: FormFieldWrapperProps<T>): JSX.Element => {
  const { form, name, children, label, withError = true, customControl = false, formFieldDescription, classNames } = props;

  const renderFormField = useCallback(() => (
    <FormField
      control={form.control}
      name={name}
      render={(renderProps: FormFieldContextProps<T>) => (
        <FormItem className={cn('w-full', classNames?.formItem)}>
          {label && (
            <FormLabel className={classNames?.formLabel}>
              {label}
            </FormLabel>
          )}
          {customControl ? (
            children?.(renderProps)
          ) : (
            <FormControl className={classNames?.formControl}>
              {children?.(renderProps)}
            </FormControl>
          )}
          {withError && <FormMessage className={cn('text-rose-600', classNames?.formMessage)} />}
          {formFieldDescription && (
            <FormDescription className={classNames?.formDescription}>
              {formFieldDescription}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  ), [children, customControl, form.control, formFieldDescription, label, name, withError, classNames]);

  return (
    <FormFieldContext.Consumer>
      {renderFormField}
    </FormFieldContext.Consumer>
  );
};
