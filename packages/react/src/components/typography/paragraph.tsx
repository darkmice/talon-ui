/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { paragraphVariants } from './typography.variants.js';
import type { ParagraphProps } from './typography.types.js';

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph(
  { className, tone, spacing, ...rest },
  ref,
) {
  return <p ref={ref} className={cn(paragraphVariants({ tone, spacing }), className)} {...rest} />;
});

Paragraph.displayName = 'Paragraph';
