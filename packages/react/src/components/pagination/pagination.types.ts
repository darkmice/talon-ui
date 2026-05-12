/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes } from 'react';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  pageSize?: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  siblings?: number;
  boundaries?: number;
  size?: 'sm' | 'md';
  disabled?: boolean;
  label?: string;
}
