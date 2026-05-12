/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const switchVariants = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center',
    'rounded-pill border border-transparent bg-bg-subtle',
    'transition duration-fast ease-tp',
    'focus-visible:tp-focus-ring focus-visible:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'data-[state=checked]:bg-primary-500',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-[18px] w-8',
      },
      tone: {
        primary: 'data-[state=checked]:bg-primary-500',
        danger: 'data-[state=checked]:bg-danger-500',
      },
    },
    defaultVariants: { size: 'md', tone: 'primary' },
  },
);

export const switchThumbVariants = cva(
  [
    'pointer-events-none block rounded-pill bg-bg-surface shadow-sm',
    'transition-transform duration-fast ease-tp',
  ],
  {
    variants: {
      size: {
        sm: 'size-3 translate-x-[2px] data-[state=checked]:translate-x-[14px]',
        md: 'size-[14px] translate-x-[2px] data-[state=checked]:translate-x-[16px]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);
