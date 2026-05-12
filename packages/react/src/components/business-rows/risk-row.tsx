/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { Link } from '../typography/link.js';

export interface RiskRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  message: ReactNode;
  actionLabel?: ReactNode;
  actionHref?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export const RiskRow = forwardRef<HTMLDivElement, RiskRowProps>(function RiskRow(
  { message, actionLabel = 'Go fix', actionHref, onAction, icon, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex items-center gap-tp-2 py-tp-1', className)} {...rest}>
      <span className="size-4 inline-flex items-center justify-center text-status-pending-fg shrink-0">
        {icon ?? <AlertTriangle className="size-4" aria-hidden />}
      </span>
      <span className="flex-1 min-w-0 text-body text-text-primary">{message}</span>
      {(actionHref || onAction) &&
        (actionHref ? (
          <Link href={actionHref} tone="primary" className="text-caption shrink-0">
            {actionLabel} →
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="text-caption text-primary-600 hover:text-primary-700 hover:underline shrink-0 focus-visible:tp-focus-ring focus-visible:outline-none rounded-sm"
          >
            {actionLabel} →
          </button>
        ))}
    </div>
  );
});

RiskRow.displayName = 'RiskRow';
