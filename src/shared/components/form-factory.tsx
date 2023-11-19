import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { Input } from '../ui/input';
import { FormControl } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormFieldOverviewProps, FormFieldWrapper } from './form-field-wrapper';

type InputValueAs = 'number' | 'string' | 'date';

interface FormFactoryComponentBase<T extends FieldValues> {
  name: Path<T>;
  type: 'input' | 'select';
  formFieldProps?: FormFieldOverviewProps;
}

interface FormFactoryInputComponent<T extends FieldValues> extends FormFactoryComponentBase<T> {
  name: Path<T>;
  type: 'input'
  className?: string;
  placeholder?: string;
  valueAs?: InputValueAs | ((value: string) => unknown);
}

interface FormFactorySelectComponent<T extends FieldValues> extends FormFactoryComponentBase<T> {
  name: Path<T>;
  type: 'select'
  options: { label: string, value: string }[];
  placeholder?: string;
  classNames?: {
    trigger?: string;
    content?: string;
    item?: string;
  };
}

export type FormFactoryComponent<T extends FieldValues> =
  FormFactoryInputComponent<T>
  | FormFactorySelectComponent<T>;

export interface FormFactoryProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  components: FormFactoryComponent<T>[];
}

export const FormFactory = <T extends FieldValues>(props: FormFactoryProps<T>) => {
  const { form, components } = props;

  return (
    <>
      {components.map((component) => {
        if (component.type === 'input') {
          return (
            <FormFieldWrapper form={form} name={component.name} {...component.formFieldProps} key={component.name}>
              {({ field, formState }) => (
                <Input
                  placeholder={component?.placeholder}
                  className={component?.className}
                  disabled={formState.isSubmitting}
                  {...field}
                  onChange={(e) => {
                    if (component.valueAs === 'number') {
                      const numberRegex = /^-?\d*\.?\d+$/;

                      if (numberRegex.test(e.target.value)) {
                        field.onChange(+e.target.value);
                      } else {
                        field.onChange(e);
                      }
                    } else if (component.valueAs === 'date') {
                      field.onChange(new Date(+e.target.value));
                    } else if (typeof component.valueAs === 'function') {
                      field.onChange(component.valueAs(e.target.value));
                    } else {
                      field.onChange(e);
                    }
                  }}
                />
              )}
            </FormFieldWrapper>
          );
        }

        if (component.type === 'select') {
          return (
            <FormFieldWrapper form={form} customControl name={component.name} {...component.formFieldProps} key={component.name}>
              {({ field, formState }) => (
                <Select disabled={formState.isSubmitting} onValueChange={field.onChange} value={field.value}>
                  <FormControl className={component?.formFieldProps?.classNames?.formControl}>
                    <SelectTrigger className={component?.classNames?.trigger}>
                      <SelectValue defaultValue={field.value} placeholder={component.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={component?.classNames?.content}>
                    {component.options.map((option) => (
                      <SelectItem key={option.value} value={option.value} className={component?.classNames?.item}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormFieldWrapper>
          );
        }

        return null;
      })}
    </>
  );
};
