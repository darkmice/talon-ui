/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { resultVariants } from './result.variants.js';

export type ResultStatus = 'success' | 'error' | 'warning' | 'info' | '403' | '404' | '500';

export interface ResultProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof resultVariants> {
  status?: ResultStatus;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  extra?: ReactNode;
}
