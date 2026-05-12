/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const progressTrackVariants = cva('rounded-pill bg-bg-subtle overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-2',
    },
  },
  defaultVariants: { size: 'md' },
});

export const progressFillVariants = cva('', {
  variants: {
    status: {
      normal:  'text-primary-500 bg-primary-500',
      success: 'text-status-done-fg bg-status-done-fg',
      warning: 'text-status-pending-fg bg-status-pending-fg',
      error:   'text-danger-500 bg-danger-500',
    },
  },
  defaultVariants: { status: 'normal' },
});

export const progressLabelClass = 'text-caption text-text-secondary tp-nums shrink-0';
