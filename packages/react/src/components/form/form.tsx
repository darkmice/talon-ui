/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useId } from 'react';
import type { ComponentPropsWithoutRef, HTMLAttributes, LabelHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { cn } from '../../primitives/cn.js';
import { FormFieldContext, FormItemContext } from './form.contexts.js';
import { useFormField } from './use-form-field.js';

export const Form = FormProvider;

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function FormItem(
  { className, ...rest },
  ref,
) {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-tp-1', className)} {...rest} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

export const FormLabel = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(function FormLabel(
  { className, ...rest },
  ref,
) {
  const { formItemId, error } = useFormField();
  return (
    <label
      ref={ref}
      htmlFor={formItemId}
      className={cn('text-body-strong text-text-primary', error && 'text-[#C8322B]', className)}
      {...rest}
    />
  );
});
FormLabel.displayName = 'FormLabel';

export const FormControl = forwardRef<HTMLElement, ComponentPropsWithoutRef<typeof Slot>>(function FormControl(
  props,
  ref,
) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

export const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function FormDescription(
  { className, ...rest },
  ref,
) {
  const { formDescriptionId } = useFormField();
  return (
    <p ref={ref} id={formDescriptionId} className={cn('text-caption text-text-secondary', className)} {...rest} />
  );
});
FormDescription.displayName = 'FormDescription';

export const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function FormMessage(
  { className, children, ...rest },
  ref,
) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : children;
  if (!body) return null;
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-caption text-[#C8322B]', className)}
      {...rest}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';
