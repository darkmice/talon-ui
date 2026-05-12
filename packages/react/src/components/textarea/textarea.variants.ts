/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    'inline-flex w-full',
    'rounded-md bg-bg-surface',
    'border border-border',
    'transition duration-fast ease-tp',
    'focus-within:tp-focus-ring focus-within:border-primary-500',
    'has-[textarea:disabled]:opacity-50 has-[textarea:disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-control-sm px-tp-2 py-tp-1 text-caption',
        md: 'min-h-control-md px-tp-3 py-tp-2 text-body',
        lg: 'min-h-control-lg px-tp-4 py-tp-2 text-body',
      },
      tone: {
        default: '',
        invalid: 'border-[#DC2626] focus-within:border-[#DC2626]',
      },
    },
    defaultVariants: { size: 'md', tone: 'default' },
  },
);
