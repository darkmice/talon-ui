/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const tagVariants = cva(
  [
    'inline-flex items-center gap-tp-1',
    'rounded-sm font-medium tp-nums',
    'whitespace-nowrap',
  ],
  {
    variants: {
      tone: {
        neutral:  'bg-bg-subtle text-text-secondary',
        progress: 'bg-status-progress-bg text-status-progress-fg',
        pending:  'bg-status-pending-bg text-status-pending-fg',
        done:     'bg-status-done-bg text-status-done-fg',
        blocked:  'bg-status-blocked-bg text-status-blocked-fg',
        idle:     'bg-status-idle-bg text-status-idle-fg',
        info:     'bg-status-info-bg text-status-info-fg',
      },
      size: {
        sm: 'h-[18px] px-tp-2 text-[11px] leading-none',
        md: 'h-[22px] px-tp-2 text-caption leading-none',
      },
    },
    defaultVariants: { tone: 'neutral', size: 'md' },
  },
);
