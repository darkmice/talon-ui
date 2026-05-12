/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const dividerVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'block w-full border-0 border-t',
      vertical: 'inline-block self-stretch border-0 border-l mx-tp-1',
    },
    tone: {
      default: 'border-border',
      strong: 'border-border-strong',
      subtle: 'border-bg-subtle',
    },
  },
  defaultVariants: { orientation: 'horizontal', tone: 'default' },
});
