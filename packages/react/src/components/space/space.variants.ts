/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const spaceVariants = cva('flex', {
  variants: {
    direction: { horizontal: 'flex-row', vertical: 'flex-col' },
    size: {
      xs: 'gap-tp-1',
      sm: 'gap-tp-2',
      md: 'gap-tp-3',
      lg: 'gap-tp-4',
      xl: 'gap-tp-5',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    wrap: { true: 'flex-wrap' },
    inline: { true: 'inline-flex' },
  },
  defaultVariants: { direction: 'horizontal', size: 'md' },
});
