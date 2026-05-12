/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { spaceVariants } from './space.variants.js';

export interface SpaceProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spaceVariants> {}
