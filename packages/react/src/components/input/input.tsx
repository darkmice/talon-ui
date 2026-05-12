/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { inputVariants } from './input.variants.js';
import type { InputProps } from './input.types.js';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, wrapperClassName, size, tone, prefix, suffix, disabled, 'aria-invalid': ariaInvalid, ...rest },
  ref,
) {
  const computedTone = ariaInvalid && tone == null ? 'invalid' : tone;
  return (
    <label
      className={cn(inputVariants({ size, tone: computedTone }), wrapperClassName)}
      data-size={size ?? 'md'}
      data-tone={computedTone ?? 'default'}
    >
      {prefix}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        className={cn(
          'flex-1 min-w-0 bg-transparent outline-none placeholder:text-text-tertiary text-text-primary',
          className,
        )}
        {...rest}
      />
      {suffix}
    </label>
  );
});

Input.displayName = 'Input';
