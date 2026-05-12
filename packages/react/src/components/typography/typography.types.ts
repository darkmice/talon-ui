/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { titleVariants, textVariants, paragraphVariants, linkVariants } from './typography.variants.js';

export type TitleLevel = 'display' | 1 | 2 | 3;

export interface TitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  level?: TitleLevel;
  asChild?: boolean;
}

export interface TextProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

export interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
  children?: ReactNode;
}
