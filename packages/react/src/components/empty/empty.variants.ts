/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const emptyVariants = cva('flex flex-col items-center justify-center text-center', {
  variants: {
    size: {
      sm: 'py-tp-5',
      md: 'py-tp-8',
      lg: 'py-tp-10',
    },
  },
  defaultVariants: { size: 'md' },
});

export const emptyIconVariants = cva('', {
  variants: {
    size: {
      sm: 'size-8 [&>svg]:size-8',
      md: 'size-12 [&>svg]:size-12',
      lg: 'size-16 [&>svg]:size-16',
    },
  },
  defaultVariants: { size: 'md' },
});
