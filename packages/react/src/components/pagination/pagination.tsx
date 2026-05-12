/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../select/select.js';
import { paginationItemVariants } from './pagination.variants.js';
import type { PaginationProps } from './pagination.types.js';

function paginationRange(
  current: number,
  totalPages: number,
  siblings: number,
  boundaries: number,
): (number | 'ellipsis')[] {
  const totalNumbers = siblings * 2 + boundaries * 2 + 3;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const startPages = Array.from({ length: boundaries }, (_, i) => i + 1);
  const endPages = Array.from(
    { length: boundaries },
    (_, i) => totalPages - boundaries + 1 + i,
  );

  const siblingStart = Math.max(current - siblings, boundaries + 2);
  const siblingEnd = Math.min(current + siblings, totalPages - boundaries - 1);

  const middlePages: number[] = [];
  for (let i = siblingStart; i <= siblingEnd; i++) middlePages.push(i);

  const result: (number | 'ellipsis')[] = [];
  result.push(...startPages);
  if (siblingStart > boundaries + 1) result.push('ellipsis');
  result.push(...middlePages);
  if (siblingEnd < totalPages - boundaries) result.push('ellipsis');
  result.push(...endPages);

  return result;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    pageSize = 10,
    total,
    onChange,
    showPageSize = true,
    pageSizeOptions = [10, 20, 50, 100],
    siblings = 1,
    boundaries = 1,
    size = 'md',
    disabled,
    className,
    label = 'Pagination',
    ...rest
  },
  ref,
) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const items = paginationRange(page, totalPages, siblings, boundaries);

  const go = (next: number) => {
    if (disabled) return;
    const clamped = Math.max(1, Math.min(totalPages, next));
    if (clamped !== page) onChange(clamped, pageSize);
  };

  const changePageSize = (next: string) => {
    const n = Number(next);
    if (Number.isFinite(n) && n > 0) onChange(1, n);
  };

  return (
    <nav
      ref={ref}
      aria-label={label}
      role="navigation"
      className={cn('flex items-center gap-tp-2', className)}
      {...rest}
    >
      <ul className="flex items-center gap-tp-1">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            disabled={disabled || page <= 1}
            onClick={() => go(page - 1)}
            className={cn(paginationItemVariants({ size, active: false }), 'gap-0')}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
        </li>
        {items.map((it, i) =>
          it === 'ellipsis' ? (
            <li
              key={`e-${i}`}
              aria-hidden
              className="inline-flex items-center justify-center w-8 text-text-tertiary"
            >
              …
            </li>
          ) : (
            <li key={it}>
              <button
                type="button"
                aria-label={`Page ${it}`}
                aria-current={it === page ? 'page' : undefined}
                disabled={disabled}
                onClick={() => go(it)}
                className={cn(paginationItemVariants({ size, active: it === page }))}
              >
                {it}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            aria-label="Next page"
            disabled={disabled || page >= totalPages}
            onClick={() => go(page + 1)}
            className={cn(paginationItemVariants({ size, active: false }))}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </li>
      </ul>
      {showPageSize && (
        <Select value={String(pageSize)} onValueChange={changePageSize} disabled={disabled}>
          <SelectTrigger size="sm" className="w-auto min-w-[88px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </nav>
  );
});

Pagination.displayName = 'Pagination';
