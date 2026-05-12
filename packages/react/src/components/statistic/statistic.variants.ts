/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const statisticValueVariants = cva('font-semibold', {
  variants: {
    size: {
      sm: 'text-h3',
      md: 'text-h2',
      lg: 'text-display',
    },
  },
  defaultVariants: { size: 'md' },
});

export const statisticDeltaVariants = cva('', {
  variants: {
    direction: {
      up: 'text-status-done-fg',
      down: 'text-danger-500',
    },
  },
  defaultVariants: { direction: 'up' },
});
