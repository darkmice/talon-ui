/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const toastRootVariants = cva(
  [
    'flex items-start gap-tp-3',
    'w-full max-w-[360px]',
    'rounded-md bg-bg-surface border border-border shadow-pop',
    'p-tp-3',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
  ],
  {
    variants: {
      tone: {
        info:    '',
        success: '',
        warning: '',
        error:   '',
      },
    },
    defaultVariants: { tone: 'info' },
  },
);

export const toastIconVariants = cva('', {
  variants: {
    tone: {
      info:    'text-status-info-fg',
      success: 'text-status-done-fg',
      warning: 'text-status-pending-fg',
      error:   'text-status-blocked-fg',
    },
  },
  defaultVariants: { tone: 'info' },
});
