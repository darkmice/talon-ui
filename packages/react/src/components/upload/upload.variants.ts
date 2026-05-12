/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const uploadDropzoneVariants = cva(
  [
    'flex flex-col items-center justify-center text-center',
    'rounded-md border-2 border-dashed border-border-strong',
    'bg-bg-surface',
    'p-tp-6',
    'cursor-pointer transition duration-fast ease-tp',
    'hover:border-primary-500 hover:bg-bg-subtle',
    'focus:outline-none focus-visible:tp-focus-ring',
  ],
  {
    variants: {
      dragging: {
        true: 'border-primary-500 bg-primary-50',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:border-border-strong hover:bg-bg-surface',
      },
    },
  },
);
