/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';

export interface SpinProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'inverse';
  tip?: ReactNode;
  spinning?: boolean;
  children?: ReactNode;
  delay?: number;
}
