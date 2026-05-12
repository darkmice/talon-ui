/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { statisticValueVariants, statisticDeltaVariants } from './statistic.variants.js';
import type { StatisticProps } from './statistic.types.js';

function formatValue(value: number | string, precision?: number) {
  if (typeof value !== 'number' || precision == null) return value;
  return value.toFixed(precision);
}

export const Statistic = forwardRef<HTMLDivElement, StatisticProps>(function Statistic(
  { className, label, value, prefix, suffix, precision, delta, deltaDirection, size, align = 'start', ...rest },
  ref,
) {
  const formatted = formatValue(value, precision);
  const direction =
    deltaDirection === 'up' || deltaDirection === 'down'
      ? deltaDirection
      : typeof delta === 'number' && delta < 0
        ? 'down'
        : 'up';
  const Trend = direction === 'up' ? TrendingUp : TrendingDown;
  return (
    <div
      ref={ref}
      className={cn('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start', className)}
      {...rest}
    >
      <span className="text-caption text-text-tertiary">{label}</span>
      <span className={cn(statisticValueVariants({ size }), 'tp-nums text-text-primary mt-tp-1')}>
        {prefix && <span className="mr-tp-1 text-text-secondary">{prefix}</span>}
        {formatted}
        {suffix && <span className="ml-tp-1 text-text-secondary">{suffix}</span>}
      </span>
      {typeof delta === 'number' && (
        <span className={cn(statisticDeltaVariants({ direction }), 'mt-tp-1 inline-flex items-center gap-tp-1 text-caption tp-nums')}>
          <Trend className="size-3" strokeWidth={2.5} aria-hidden />
          {Math.abs(delta)}
        </span>
      )}
    </div>
  );
});

Statistic.displayName = 'Statistic';
