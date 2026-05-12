/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { spaceVariants } from './space.variants.js';
import type { SpaceProps } from './space.types.js';

export const Space = forwardRef<HTMLDivElement, SpaceProps>(function Space(
  { className, direction, size, align, justify, wrap, inline, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-direction={direction ?? 'horizontal'}
      data-size={size ?? 'md'}
      className={cn(spaceVariants({ direction, size, align, justify, wrap, inline }), className)}
      {...rest}
    />
  );
});

Space.displayName = 'Space';
