/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { InputHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { numberInputWrapVariants } from './number-input.variants.js';

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof numberInputWrapVariants> {
  unit?: ReactNode;
  wrapperClassName?: string;
  onValueChange?: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  holdStep?: number;
}
