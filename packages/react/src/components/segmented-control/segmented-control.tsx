/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState, useCallback } from 'react';
import { cn } from '../../primitives/cn.js';
import {
  segmentedControlRootVariants,
  segmentedControlItemVariants,
} from './segmented-control.variants.js';
import type { SegmentedControlProps } from './segmented-control.types.js';

export function SegmentedControl<T extends string = string>({
  items,
  value,
  defaultValue,
  onValueChange,
  size,
  disabled,
  className,
  ...rest
}: SegmentedControlProps<T>) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<T | undefined>(defaultValue ?? items[0]?.value);
  const current = controlled ? value : internal;

  const handleSelect = useCallback(
    (next: T) => {
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );

  return (
    <div
      role="tablist"
      className={cn(segmentedControlRootVariants({ size }), className)}
      {...rest}
    >
      {items.map((item) => {
        const selected = item.value === current;
        const itemDisabled = disabled || item.disabled;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={itemDisabled}
            onClick={() => handleSelect(item.value)}
            className={segmentedControlItemVariants({ size, selected })}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.displayName = 'SegmentedControl';
