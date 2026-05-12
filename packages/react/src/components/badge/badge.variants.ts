/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const badgePillVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-pill tp-nums',
    'font-normal text-[10px] leading-none',
    'bg-danger-500 text-text-on-primary',
    'select-none',
  ],
  {
    variants: {
      kind: {
        number: 'h-4 min-w-4 px-1',
        dot:    'h-2 w-2 px-0',
      },
      tone: {
        danger:  'bg-danger-500',
        primary: 'bg-primary-500',
        success: 'bg-status-done-fg text-text-on-primary',
        neutral: 'bg-bg-inverse text-bg-app',
      },
    },
    defaultVariants: { kind: 'number', tone: 'danger' },
  },
);
