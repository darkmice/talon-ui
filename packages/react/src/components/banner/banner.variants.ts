/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const bannerVariants = cva(
  [
    'relative flex items-start gap-tp-3',
    'rounded-md border border-border bg-bg-surface',
    'p-tp-3 pl-tp-4',
    'overflow-hidden',
  ],
  {
    variants: {
      tone: {
        info:    'bg-status-info-bg',
        success: 'bg-status-done-bg',
        warning: 'bg-status-pending-bg',
        error:   'bg-status-blocked-bg',
      },
    },
    defaultVariants: { tone: 'info' },
  },
);

export const bannerLeftBarVariants = cva(
  'absolute left-0 top-0 bottom-0 w-1',
  {
    variants: {
      tone: {
        info:    'bg-status-info-fg',
        success: 'bg-status-done-fg',
        warning: 'bg-status-pending-fg',
        error:   'bg-status-blocked-fg',
      },
    },
    defaultVariants: { tone: 'info' },
  },
);

export const bannerIconVariants = cva('', {
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
