/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const switchVariants = cva(
  [
    'peer relative inline-flex shrink-0 cursor-pointer items-center',
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

/**
 * Thumb 用 absolute + inset-y 垂直锁死 + left/right auto 切换水平位置,
 * 完全不依赖 translate / box-sizing,任何 Tailwind 版本都对齐。
 */
export const switchThumbVariants = cva(
  [
    'pointer-events-none absolute block rounded-pill bg-bg-surface shadow-sm aspect-square',
    'transition-[left,right] duration-fast ease-tp',
  ],
  {
    variants: {
      size: {
        sm: 'inset-y-[1px] left-[1px] right-auto data-[state=checked]:left-auto data-[state=checked]:right-[1px]',
        md: 'inset-y-[1px] left-[1px] right-auto data-[state=checked]:left-auto data-[state=checked]:right-[1px]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);
