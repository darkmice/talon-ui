/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { badgePillVariants } from './badge.variants.js';
import type { BadgeProps } from './badge.types.js';

function formatCount(n: number, max: number) {
  return n > max ? `${max}+` : String(n);
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, count, max = 99, dot, showZero, tone, children, label, ...rest },
  ref,
) {
  const kind = dot ? 'dot' : 'number';
  const hasValue = dot || (typeof count === 'number' && (count > 0 || showZero));

  const pill = hasValue ? (
    <span
      role={dot ? undefined : 'status'}
      aria-label={label ?? (dot ? 'badge' : `${count}`)}
      data-kind={kind}
      className={cn(badgePillVariants({ kind, tone }))}
    >
      {!dot && typeof count === 'number' && formatCount(count, max)}
    </span>
  ) : null;

  if (children === undefined) {
    return (
      <span ref={ref} className={cn('inline-flex', className)} {...rest}>
        {pill}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn('relative inline-flex', className)} {...rest}>
      {children}
      {pill && (
        <span aria-hidden={false} className="absolute -top-1 -right-1">
          {pill}
        </span>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';
