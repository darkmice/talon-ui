/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { emptyVariants } from './empty.variants.js';

export interface EmptyProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof emptyVariants> {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}
