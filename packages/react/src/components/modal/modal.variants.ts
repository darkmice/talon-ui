/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const modalOverlayClass =
  'fixed inset-0 z-overlay bg-[rgba(15,23,42,0.4)] data-[state=open]:animate-in data-[state=closed]:animate-out';

export const modalContentVariants = cva(
  [
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'z-modal',
    'w-full',
    'rounded-lg bg-bg-surface text-text-primary',
    'shadow-[var(--tp-shadow-modal)] border border-border',
    'p-tp-6',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-[480px]',
        md: 'max-w-[640px]',
        lg: 'max-w-[800px]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);
