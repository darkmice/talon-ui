/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { TextareaHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { textareaVariants } from './textarea.variants.js';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  autosize?: boolean;
  wrapperClassName?: string;
}
