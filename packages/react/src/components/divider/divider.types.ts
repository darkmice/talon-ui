/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { dividerVariants } from './divider.variants.js';

export interface DividerProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'>,
    VariantProps<typeof dividerVariants> {
  children?: ReactNode; // label, horizontal only
}
