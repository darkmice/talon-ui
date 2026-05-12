/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useLayoutEffect, useRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { textareaVariants } from './textarea.variants.js';
import type { TextareaProps } from './textarea.types.js';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    className,
    wrapperClassName,
    size,
    tone,
    autosize,
    value,
    defaultValue,
    'aria-invalid': ariaInvalid,
    disabled,
    rows = 3,
    ...rest
  },
  forwardedRef,
) {
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const setRefs = (node: HTMLTextAreaElement | null) => {
    innerRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useLayoutEffect(() => {
    if (!autosize) return;
    const el = innerRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [autosize, value, defaultValue]);

  const computedTone = ariaInvalid && tone == null ? 'invalid' : tone;
  return (
    <label
      className={cn(textareaVariants({ size, tone: computedTone }), wrapperClassName)}
      data-size={size ?? 'md'}
      data-tone={computedTone ?? 'default'}
    >
      <textarea
        ref={setRefs}
        rows={autosize ? 1 : rows}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        className={cn(
          'flex-1 min-w-0 bg-transparent outline-none resize-none',
          'text-text-primary placeholder:text-text-tertiary',
          autosize ? 'overflow-hidden' : 'overflow-auto',
          className,
        )}
        {...rest}
      />
    </label>
  );
});

Textarea.displayName = 'Textarea';
