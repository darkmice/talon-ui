/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { skeletonVariants } from './skeleton.variants.js';
import type { SkeletonProps } from './skeleton.types.js';

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, shape, width, height, animation = true, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      data-shape={shape ?? 'rect'}
      className={cn(skeletonVariants({ shape, animation }), className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
});

Skeleton.displayName = 'Skeleton';
