/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const resultVariants = cva('flex flex-col items-center justify-center text-center', {
  variants: {
    size: {
      sm: 'py-tp-6',
      md: 'py-tp-10',
      lg: 'py-tp-14',
    },
  },
  defaultVariants: { size: 'md' },
});

export const resultIconVariants = cva('', {
  variants: {
    status: {
      success: 'text-status-done-fg',
      error: 'text-danger-500',
      warning: 'text-status-pending-fg',
      info: 'text-status-info-fg',
      '403': 'text-status-pending-fg',
      '404': 'text-text-tertiary',
      '500': 'text-danger-500',
    },
    size: {
      sm: '[&>svg]:size-8',
      md: '[&>svg]:size-14',
      lg: '[&>svg]:size-20',
    },
  },
  defaultVariants: { status: 'info', size: 'md' },
});
