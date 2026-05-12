/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../primitives/cn.js';
import { cardVariants } from './card.variants.js';
import type { CardProps } from './card.types.js';

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, padding, hoverable, interactive, asChild, role, tabIndex, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  const isInteractive = !!interactive;
  return (
    <Comp
      ref={ref}
      role={role ?? (isInteractive ? 'button' : undefined)}
      tabIndex={tabIndex ?? (isInteractive ? 0 : undefined)}
      className={cn(cardVariants({ padding, hoverable, interactive }), className)}
      {...rest}
    />
  );
});

Card.displayName = 'Card';
