/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useContext } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { FormFieldContext, FormItemContext } from './form.contexts.js';

export function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  if (!fieldContext) throw new Error('useFormField must be used within <FormField>');
  if (!itemContext) throw new Error('useFormField must be used within <FormItem>');
  const { name } = fieldContext;
  const { id } = itemContext;
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name });
  const fieldState = getFieldState(name, formState);
  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}
