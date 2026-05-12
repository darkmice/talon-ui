/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const sliderRootVariants = cva('relative flex w-full touch-none select-none items-center', {
  variants: {
    orientation: {
      horizontal: 'h-5',
      vertical: 'h-40 w-5 flex-col',
    },
    disabled: { true: 'opacity-50 cursor-not-allowed' },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const sliderTrackVariants = cva('relative grow overflow-hidden rounded-pill bg-bg-subtle', {
  variants: {
    orientation: {
      horizontal: 'h-1 w-full',
      vertical: 'h-full w-1',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const sliderRangeVariants = cva('absolute rounded-pill', {
  variants: {
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
    tone: {
      primary: 'bg-primary-500',
      danger: 'bg-danger-500',
    },
  },
  defaultVariants: { orientation: 'horizontal', tone: 'primary' },
});

export const sliderThumbVariants = cva(
  [
    'block size-4 rounded-pill bg-bg-surface',
    'border-[1.5px]',
    'shadow-card',
    'transition-transform duration-fast ease-tp',
    'hover:scale-110',
    'focus-visible:tp-focus-ring focus-visible:outline-none',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      tone: {
        primary: 'border-primary-500',
        danger: 'border-danger-500',
      },
    },
    defaultVariants: { tone: 'primary' },
  },
);
