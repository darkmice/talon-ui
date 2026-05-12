/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { rateVariants } from './rate.variants.js';
import type { RateProps } from './rate.types.js';

const sizeMap = { sm: 'size-[14px]', md: 'size-4', lg: 'size-5' } as const;

export const Rate = forwardRef<HTMLDivElement, RateProps>(function Rate(
  {
    className,
    value,
    defaultValue = 0,
    count = 5,
    size = 'md',
    allowHalf = false,
    readOnly,
    disabled,
    onValueChange,
    label = 'Rating',
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const controlled = value !== undefined;
  const current = hover ?? (controlled ? (value as number) : internal);
  const disabledOrRO = disabled || readOnly;

  const commit = (next: number) => {
    if (disabledOrRO) return;
    if (!controlled) setInternal(next);
    onValueChange?.(next);
  };

  const starClass = sizeMap[size];

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      data-size={size}
      className={cn('inline-flex items-center gap-tp-1', disabledOrRO && 'opacity-50 cursor-not-allowed', className)}
      onMouseLeave={() => setHover(null)}
      {...rest}
    >
      {Array.from({ length: count }, (_, i) => {
        const starIndex = i + 1;
        const filled = current >= starIndex;
        const halfFilled = !filled && current >= starIndex - 0.5;
        return (
          <span key={starIndex} className={cn('relative inline-flex', starClass)}>
            {/* Background star */}
            <Star className={cn(starClass, 'absolute inset-0 text-border-strong')} strokeWidth={1.5} aria-hidden />
            {/* Foreground filled overlay */}
            <span
              className={cn('absolute inset-0 overflow-hidden')}
              style={{ width: filled ? '100%' : halfFilled ? '50%' : '0%' }}
              aria-hidden
            >
              <Star className={cn(starClass, 'text-[#F59E0B]')} strokeWidth={1.5} fill="#F59E0B" aria-hidden />
            </span>
            {/* Click targets — full + (optionally) half */}
            {allowHalf && (
              <button
                type="button"
                tabIndex={-1}
                aria-label={`${starIndex - 0.5}`}
                disabled={disabledOrRO}
                onMouseEnter={() => setHover(starIndex - 0.5)}
                onClick={() => commit(starIndex - 0.5)}
                className="absolute left-0 top-0 w-1/2 h-full"
              />
            )}
            <button
              type="button"
              tabIndex={i === 0 ? 0 : -1}
              aria-label={`${starIndex}`}
              disabled={disabledOrRO}
              onMouseEnter={() => setHover(starIndex)}
              onClick={() => commit(starIndex)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  commit(Math.min((controlled ? (value as number) : internal) + (allowHalf ? 0.5 : 1), count));
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  commit(Math.max((controlled ? (value as number) : internal) - (allowHalf ? 0.5 : 1), 0));
                }
              }}
              className={cn(
                allowHalf ? 'absolute right-0 top-0 w-1/2 h-full' : 'absolute inset-0',
                'focus-visible:tp-focus-ring focus-visible:outline-none rounded-sm',
              )}
            />
          </span>
        );
      })}
    </div>
  );
});

Rate.displayName = 'Rate';
