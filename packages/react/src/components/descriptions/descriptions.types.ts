/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';

export interface DescriptionsItemProps {
  label: ReactNode;
  children: ReactNode;
  mono?: boolean;
  span?: number;
}

export interface DescriptionsProps extends Omit<HTMLAttributes<HTMLDListElement>, 'children'> {
  columns?: number;
  size?: 'sm' | 'md';
  layout?: 'horizontal' | 'vertical';
  children: ReactNode;
}
