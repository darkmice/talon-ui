/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const skeletonVariants = cva(
  'bg-bg-subtle',
  {
    variants: {
      shape: {
        line: 'h-3 rounded-pill',
        rect: 'rounded-md',
        circle: 'rounded-pill aspect-square',
      },
      animation: {
        true: 'animate-pulse [animation-duration:1.4s]',
        false: '',
      },
    },
    defaultVariants: { shape: 'rect', animation: true },
  },
);
