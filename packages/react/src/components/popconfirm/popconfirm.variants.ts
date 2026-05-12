/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const popconfirmContentVariants = cva(
  [
    'relative z-overlay rounded-md',
    'bg-bg-surface border border-border text-text-primary',
    'p-tp-3 w-72',
    'shadow-pop',
  ],
);

export const popconfirmIconVariants = cva('', {
  variants: {
    tone: {
      default: 'text-primary-500',
      danger: 'text-danger-500',
      warning: 'text-status-pending-fg',
    },
  },
  defaultVariants: { tone: 'default' },
});
