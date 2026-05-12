/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  [
    'block rounded-lg bg-bg-surface border border-border',
    'shadow-card',
    'transition duration-fast ease-tp',
  ],
  {
    variants: {
      padding: {
        sm: 'p-tp-3',
        md: 'p-tp-5',
        lg: 'p-tp-6',
        none: 'p-0',
      },
      hoverable: {
        true: 'hover:border-primary-200 hover:shadow-pop',
      },
      interactive: {
        true: 'cursor-pointer focus-visible:tp-focus-ring focus-visible:outline-none',
      },
    },
    defaultVariants: { padding: 'md' },
  },
);
