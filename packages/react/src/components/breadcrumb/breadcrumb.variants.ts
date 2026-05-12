/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const breadcrumbVariants = cva('inline-flex', {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-body',
    },
  },
  defaultVariants: { size: 'sm' },
});

export const breadcrumbItemVariants = cva('text-text-tertiary', {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-body',
    },
    current: {
      true: 'text-text-primary font-medium',
      false: '',
    },
  },
  defaultVariants: { size: 'sm', current: false },
});

export const breadcrumbSeparatorClass = 'text-text-tertiary tp-nums select-none';
