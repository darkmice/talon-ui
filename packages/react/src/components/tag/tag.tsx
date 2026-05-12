/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { tagVariants } from './tag.variants.js';
import type { TagProps } from './tag.types.js';

const STATUS_TONES = new Set(['progress', 'pending', 'done', 'blocked', 'idle', 'info']);

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { className, tone, size, children, dot, removable, removeLabel = 'Remove', onRemove, ...rest },
  ref,
) {
  const isStatus = tone && STATUS_TONES.has(tone);
  return (
    <span
      ref={ref}
      role={isStatus ? 'status' : undefined}
      data-tone={tone ?? 'neutral'}
      data-size={size ?? 'md'}
      className={cn(tagVariants({ tone, size }), className)}
      {...rest}
    >
      {dot && <span aria-hidden className="size-2 rounded-pill bg-current opacity-80" />}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="-mr-tp-1 ml-tp-1 inline-flex size-3 items-center justify-center rounded-pill hover:bg-bg-subtle focus-visible:tp-focus-ring"
        >
          <X className="size-3" aria-hidden />
        </button>
      )}
    </span>
  );
});

Tag.displayName = 'Tag';
