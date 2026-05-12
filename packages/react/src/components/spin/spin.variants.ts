/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const spinIconVariants = cva('', {
  variants: {
    size: {
      sm: 'size-[14px]',
      md: 'size-5',
      lg: 'size-7',
    },
    tone: {
      primary: 'text-primary-500',
      inverse: 'text-text-on-primary',
    },
  },
  defaultVariants: { size: 'md', tone: 'primary' },
});

export const spinTipClass = 'text-caption text-text-secondary';
