/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
  [
    'peer inline-flex items-center justify-center shrink-0',
    'rounded-sm border border-border bg-bg-surface',
    'transition duration-fast ease-tp',
    'focus-visible:tp-focus-ring focus-visible:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500',
    'data-[state=indeterminate]:bg-primary-500 data-[state=indeterminate]:border-primary-500',
    'data-[state=checked]:text-text-on-primary data-[state=indeterminate]:text-text-on-primary',
  ],
  {
    variants: {
      size: {
        sm: 'size-[14px]',
        md: 'size-4',
      },
      tone: {
        primary: '',
        danger:
          'data-[state=checked]:bg-danger-500 data-[state=checked]:border-danger-500 data-[state=indeterminate]:bg-danger-500 data-[state=indeterminate]:border-danger-500',
      },
    },
    defaultVariants: { size: 'md', tone: 'primary' },
  },
);
