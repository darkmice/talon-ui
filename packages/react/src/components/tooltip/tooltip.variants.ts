/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const tooltipContentVariants = cva(
  [
    'z-overlay rounded-sm bg-bg-inverse text-text-on-primary',
    'px-tp-2 py-1 text-caption',
    'shadow-pop',
    'data-[state=delayed-open]:animate-in',
    'data-[state=closed]:animate-out',
  ],
);
