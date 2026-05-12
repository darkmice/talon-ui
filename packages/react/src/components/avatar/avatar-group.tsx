/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Children, isValidElement, cloneElement, forwardRef } from 'react';
import type { ReactElement } from 'react';
import { cn } from '../../primitives/cn.js';
import { avatarVariants } from './avatar.variants.js';
import type { AvatarGroupProps, AvatarProps } from './avatar.types.js';

export const AvatarGroup = forwardRef<HTMLSpanElement, AvatarGroupProps>(function AvatarGroup(
  { max = 3, size = 'md', className, children },
  ref,
) {
  const all = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const visible = all.slice(0, max);
  const overflow = all.length - visible.length;

  return (
    <span ref={ref} className={cn('inline-flex items-center', className)}>
      {visible.map((child, i) =>
        cloneElement(child, {
          key: i,
          size,
          ring: 'surface',
          className: cn(i > 0 && '-ml-tp-2', child.props.className),
        }),
      )}
      {overflow > 0 && (
        <span
          role="status"
          aria-label={`+${overflow} more`}
          data-size={size}
          className={cn(
            avatarVariants({ size, ring: 'surface' }),
            '-ml-tp-2 bg-bg-subtle text-text-secondary tp-nums',
          )}
        >
          +{overflow}
        </span>
      )}
    </span>
  );
});

AvatarGroup.displayName = 'AvatarGroup';
