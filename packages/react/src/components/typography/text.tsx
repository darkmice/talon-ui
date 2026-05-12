/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../primitives/cn.js';
import { textVariants } from './typography.variants.js';
import type { TextProps } from './typography.types.js';

export const Text = forwardRef<HTMLSpanElement, TextProps>(function Text(
  { className, variant, tone, nums, asChild, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'span';
  return <Comp ref={ref} className={cn(textVariants({ variant, tone, nums }), className)} {...rest} />;
});

Text.displayName = 'Text';
