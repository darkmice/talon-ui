/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const paginationItemVariants = cva(
  [
    'inline-flex items-center justify-center rounded-sm',
    'border border-transparent',
    'transition duration-fast ease-tp',
    'text-text-primary',
    'hover:bg-bg-subtle',
    'focus-visible:tp-focus-ring focus-visible:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'tp-nums',
  ],
  {
    variants: {
      size: {
        sm: 'size-7 text-caption',
        md: 'size-8 text-body',
      },
      active: {
        true: 'bg-primary-500 text-text-on-primary hover:bg-primary-600',
        false: '',
      },
    },
    defaultVariants: { size: 'md', active: false },
  },
);
