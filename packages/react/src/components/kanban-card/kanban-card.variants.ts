/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const kanbanCardVariants = cva(
  'w-full',
  {
    variants: {
      size: {
        sm: 'max-w-[280px]',
        md: 'max-w-[320px]',
      },
      selected: {
        true: 'ring-2 ring-primary-500 border-primary-500',
        false: '',
      },
    },
    defaultVariants: { size: 'md', selected: false },
  },
);
