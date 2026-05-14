/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const numberInputWrapVariants = cva(
  [
    'inline-flex items-stretch w-full overflow-hidden',
    'rounded-md bg-bg-surface border border-border',
    'transition duration-fast ease-tp',
    'focus-within:tp-focus-ring focus-within:border-primary-500',
    'has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-control-sm text-caption',
        md: 'h-control-md text-body',
        lg: 'h-control-lg text-body',
      },
      tone: {
        default: '',
        invalid: 'border-[#C8322B] focus-within:border-[#C8322B]',
      },
    },
    defaultVariants: { size: 'md', tone: 'default' },
  },
);
