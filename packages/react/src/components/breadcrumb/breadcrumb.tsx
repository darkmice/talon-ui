/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { Menu, MenuTrigger, MenuContent, MenuItem } from '../menu/menu.js';
import { breadcrumbVariants, breadcrumbItemVariants, breadcrumbSeparatorClass } from './breadcrumb.variants.js';
import type { BreadcrumbProps, BreadcrumbItem } from './breadcrumb.types.js';

function fold(
  items: BreadcrumbItem[],
  maxItems: number,
): { visible: (BreadcrumbItem | { ellipsis: BreadcrumbItem[] })[] } {
  if (!maxItems || items.length <= maxItems) {
    return { visible: items as (BreadcrumbItem | { ellipsis: BreadcrumbItem[] })[] };
  }
  const first = items[0];
  const tailCount = Math.max(1, maxItems - 2); // first + ellipsis + tailCount
  const tail = items.slice(items.length - tailCount);
  const middle = items.slice(1, items.length - tailCount);
  return { visible: [first!, { ellipsis: middle }, ...tail] };
}

function ItemAnchor({
  item,
  isLast,
  size,
}: {
  item: BreadcrumbItem;
  isLast: boolean;
  size: 'sm' | 'md';
}) {
  const content = (
    <span className={cn(breadcrumbItemVariants({ size, current: isLast }))}>{item.label}</span>
  );
  if (isLast) {
    return <span aria-current="page">{content}</span>;
  }
  if (item.href) {
    return (
      <a href={item.href} onClick={item.onClick} className="hover:underline">
        {content}
      </a>
    );
  }
  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} className="hover:underline">
        {content}
      </button>
    );
  }
  return content;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, maxItems = 0, separator = '/', size = 'sm', className, label = 'Breadcrumb', ...rest },
  ref,
) {
  const { visible } = fold(items, maxItems);
  return (
    <nav ref={ref} aria-label={label} className={cn(breadcrumbVariants({ size }), className)} {...rest}>
      <ol className="flex items-center gap-tp-2">
        {visible.map((node, i) => {
          const isLast = i === visible.length - 1;
          if ('ellipsis' in node) {
            return (
              <li key={`e-${i}`} className="flex items-center gap-tp-2">
                <Menu>
                  <MenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Show hidden breadcrumbs"
                      className="inline-flex items-center justify-center size-6 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-bg-subtle focus-visible:tp-focus-ring focus-visible:outline-none"
                    >
                      <MoreHorizontal className="size-4" aria-hidden />
                    </button>
                  </MenuTrigger>
                  <MenuContent>
                    {node.ellipsis.map((item, j) => (
                      <MenuItem
                        key={j}
                        onSelect={() => {
                          if (item.onClick) item.onClick();
                          else if (item.href) window.location.href = item.href;
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </MenuContent>
                </Menu>
                <span aria-hidden className={breadcrumbSeparatorClass}>
                  {separator}
                </span>
              </li>
            );
          }
          return (
            <li key={i} className="flex items-center gap-tp-2">
              <ItemAnchor item={node as BreadcrumbItem} isLast={isLast} size={size} />
              {!isLast && (
                <span aria-hidden className={breadcrumbSeparatorClass}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
