/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { bannerVariants, bannerLeftBarVariants, bannerIconVariants } from './banner.variants.js';
import type { BannerProps } from './banner.types.js';

const DEFAULT_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
} as const;

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { className, tone = 'info', title, children, icon, action, onDismiss, ...rest },
  ref,
) {
  const resolvedTone = tone ?? 'info';
  const DefaultIcon = DEFAULT_ICONS[resolvedTone];
  return (
    <div
      ref={ref}
      role="status"
      data-tone={tone}
      className={cn(bannerVariants({ tone }), className)}
      {...rest}
    >
      <span aria-hidden className={cn(bannerLeftBarVariants({ tone }))} />
      <span aria-hidden className={cn(bannerIconVariants({ tone }), 'shrink-0 size-5 inline-flex items-center justify-center')}>
        {icon ?? <DefaultIcon className="size-5" />}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="text-body-strong text-text-primary">{title}</p>}
        {children && <div className={cn('text-body text-text-secondary', title && 'mt-tp-1')}>{children}</div>}
      </div>
      {action && <div className="ml-auto shrink-0">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="shrink-0 inline-flex items-center justify-center size-6 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-bg-subtle focus-visible:tp-focus-ring focus-visible:outline-none"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
});

Banner.displayName = 'Banner';
