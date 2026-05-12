/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../primitives/cn.js';
import { linkVariants } from './typography.variants.js';
import type { LinkProps } from './typography.types.js';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, tone, asChild, children, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp ref={ref} className={cn(linkVariants({ tone }), className)} {...rest}>
      {children}
    </Comp>
  );
});

Link.displayName = 'Link';
