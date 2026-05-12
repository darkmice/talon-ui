/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const datePickerTriggerVariants = cva(
  [
    'inline-flex items-center gap-tp-2 w-full',
    'rounded-md bg-bg-surface border border-border text-text-primary',
    'transition duration-fast ease-tp',
    'focus:tp-focus-ring focus:border-primary-500 focus:outline-none',
    'data-[state=open]:tp-focus-ring data-[state=open]:border-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-control-sm px-tp-2 text-caption',
        md: 'h-control-md px-tp-3 text-body',
        lg: 'h-control-lg px-tp-4 text-body',
      },
      tone: {
        default: '',
        invalid: 'border-[#C8322B] focus:border-[#C8322B]',
      },
    },
    defaultVariants: { size: 'md', tone: 'default' },
  },
);
