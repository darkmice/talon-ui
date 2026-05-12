/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const rateVariants = cva('inline-flex items-center gap-tp-1', {
  variants: {
    size: { sm: '', md: '', lg: '' },
  },
  defaultVariants: { size: 'md' },
});
