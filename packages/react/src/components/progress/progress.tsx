/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import {
  progressTrackVariants,
  progressFillVariants,
  progressLabelClass,
} from './progress.variants.js';
import type { ProgressProps } from './progress.types.js';

const CIRCLE_PRESETS = { sm: 32, md: 56, lg: 80 };

function defaultFormat(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    max = 100,
    type = 'linear',
    size = 'md',
    status = 'normal',
    showInfo = true,
    format,
    strokeWidth,
    label = 'Progress',
    className,
    ...rest
  },
  ref,
) {
  const ratio = Math.max(0, Math.min(1, value / max));
  const display = format ? format(value, max) : defaultFormat(value, max);

  if (type === 'circle') {
    const px = CIRCLE_PRESETS[size];
    const sw = strokeWidth ?? Math.max(3, Math.round(px / 12));
    const r = (px - sw) / 2;
    const c = 2 * Math.PI * r;
    const dash = c * ratio;
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cn('inline-flex items-center justify-center relative', className)}
        style={{ width: px, height: px }}
        {...rest}
      >
        <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} className="rotate-[-90deg]">
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={sw}
            className="text-bg-subtle"
          />
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            className={cn(progressFillVariants({ status }))}
          />
        </svg>
        {showInfo && (
          <span
            className={cn(
              'absolute inset-0 inline-flex items-center justify-center text-caption tp-nums',
              size === 'lg' ? 'text-body-strong' : '',
            )}
          >
            {status === 'success' ? (
              <Check className="size-4 text-status-done-fg" aria-hidden />
            ) : status === 'error' ? (
              <X className="size-4 text-danger-500" aria-hidden />
            ) : (
              display
            )}
          </span>
        )}
      </div>
    );
  }

  // linear
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn('flex items-center gap-tp-2', className)}
      {...rest}
    >
      <div className={cn(progressTrackVariants({ size }), 'flex-1')}>
        <div
          className={cn(
            progressFillVariants({ status }),
            'h-full rounded-pill transition-[width] duration-fast ease-tp',
          )}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      {showInfo && <span className={cn(progressLabelClass)}>{display}</span>}
    </div>
  );
});

Progress.displayName = 'Progress';
