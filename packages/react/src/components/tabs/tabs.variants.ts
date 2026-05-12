/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const tabsListVariants = cva(
  [
    'inline-flex items-end gap-tp-6',
    'border-b border-border',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-8',
        md: 'min-h-10',
        lg: 'min-h-12',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const tabsTriggerVariants = cva(
  [
    'inline-flex items-center gap-tp-2 px-tp-1 pb-tp-2 -mb-px',
    'border-b-2 border-transparent',
    'text-text-secondary',
    'transition-colors duration-fast ease-tp',
    'cursor-pointer',
    'hover:text-text-primary',
    'data-[state=active]:text-text-primary',
    'data-[state=active]:border-primary-500',
    'focus-visible:tp-focus-ring focus-visible:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'text-caption',
        md: 'text-body',
        lg: 'text-h3',
      },
    },
    defaultVariants: { size: 'md' },
  },
);
