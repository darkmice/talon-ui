/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const radioGroupVariants = cva('inline-flex gap-tp-3', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

export const radioItemVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'rounded-pill border border-border bg-bg-surface',
    'transition duration-fast ease-tp',
    'focus-visible:tp-focus-ring focus-visible:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'data-[state=checked]:border-primary-500',
  ],
  {
    variants: {
      size: {
        sm: 'size-[14px]',
        md: 'size-4',
      },
      tone: {
        primary: 'data-[state=checked]:border-primary-500',
        danger: 'data-[state=checked]:border-danger-500',
      },
    },
    defaultVariants: { size: 'md', tone: 'primary' },
  },
);

export const radioIndicatorVariants = cva('rounded-pill block', {
  variants: {
    size: {
      sm: 'size-[6px]',
      md: 'size-[8px]',
    },
    tone: {
      primary: 'bg-primary-500',
      danger: 'bg-danger-500',
    },
  },
  defaultVariants: { size: 'md', tone: 'primary' },
});
