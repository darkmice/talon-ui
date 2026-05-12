/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'inline-flex items-center gap-tp-2 w-full',
    'rounded-md bg-bg-surface',
    'border border-border',
    'transition duration-fast ease-tp',
    'focus-within:tp-focus-ring focus-within:border-primary-500',
    'has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed',
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
        invalid: 'border-[#DC2626] focus-within:border-[#DC2626]',
      },
    },
    defaultVariants: { size: 'md', tone: 'default' },
  },
);
