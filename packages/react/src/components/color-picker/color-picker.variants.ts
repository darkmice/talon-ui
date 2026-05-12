/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const colorPickerTriggerVariants = cva(
  [
    'inline-flex items-center gap-tp-2 w-full',
    'rounded-md bg-bg-surface border border-border',
    'transition duration-fast ease-tp',
    'focus:tp-focus-ring focus:border-primary-500 focus:outline-none',
    'data-[state=open]:tp-focus-ring data-[state=open]:border-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-control-sm px-tp-2',
        md: 'h-control-md px-tp-3',
        lg: 'h-control-lg px-tp-4',
      },
      tone: {
        default: '',
        invalid: 'border-[#C8322B] focus:border-[#C8322B]',
      },
    },
    defaultVariants: { size: 'md', tone: 'default' },
  },
);
