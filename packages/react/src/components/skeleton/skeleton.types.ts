/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shape?: 'line' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  animation?: boolean;
}
