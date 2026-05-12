/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const popoverContentVariants = cva(
  [
    'relative z-overlay rounded-md',
    'bg-bg-surface border border-border',
    'text-text-primary',
    'p-tp-4',
    'shadow-pop',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  ],
  {
    variants: {
      width: {
        sm: 'w-60',     // 240
        md: 'w-72',     // 288
        lg: 'w-80',     // 320
        xl: 'w-90 max-w-[360px]', // 360 max
      },
    },
    defaultVariants: { width: 'md' },
  },
);
