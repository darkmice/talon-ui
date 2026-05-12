/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ShieldOff,
  FileQuestion,
  ServerCrash,
} from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { resultVariants, resultIconVariants } from './result.variants.js';
import type { ResultProps, ResultStatus } from './result.types.js';

const ICONS: Record<ResultStatus, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  '403': ShieldOff,
  '404': FileQuestion,
  '500': ServerCrash,
};

const TITLES: Record<ResultStatus, string> = {
  success: 'Success',
  error: 'Something went wrong',
  warning: 'Warning',
  info: 'Info',
  '403': '403 — Forbidden',
  '404': '404 — Not found',
  '500': '500 — Internal error',
};

export const Result = forwardRef<HTMLDivElement, ResultProps>(function Result(
  { className, status = 'info', icon, title, description, extra, size, ...rest },
  ref,
) {
  const Icon = ICONS[status];
  return (
    <div
      ref={ref}
      role="status"
      data-status={status}
      className={cn(resultVariants({ size }), className)}
      {...rest}
    >
      <span className={cn(resultIconVariants({ status, size }), 'inline-flex items-center justify-center')}>
        {icon ?? <Icon aria-hidden />}
      </span>
      <p className="mt-tp-4 text-h2 text-text-primary">{title ?? TITLES[status]}</p>
      {description && <p className="mt-tp-2 text-body text-text-secondary max-w-prose">{description}</p>}
      {extra && <div className="mt-tp-5 flex justify-center gap-tp-2">{extra}</div>}
    </div>
  );
});

Result.displayName = 'Result';
