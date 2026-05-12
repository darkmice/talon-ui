/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../primitives/cn.js';
import { titleVariants } from './typography.variants.js';
import type { TitleProps } from './typography.types.js';

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { className, level = 1, tone, asChild, ...rest },
  ref,
) {
  const Tag = asChild ? Slot : level === 'display' ? 'h1' : (`h${level}` as 'h1' | 'h2' | 'h3');
  return <Tag ref={ref} className={cn(titleVariants({ level, tone }), className)} {...rest} />;
});

Title.displayName = 'Title';
