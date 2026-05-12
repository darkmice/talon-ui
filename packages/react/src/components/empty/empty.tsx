/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { emptyVariants, emptyIconVariants } from './empty.variants.js';
import type { EmptyProps } from './empty.types.js';

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { className, icon, title, description, action, size, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cn(emptyVariants({ size }), className)}
      {...rest}
    >
      <div className={cn(emptyIconVariants({ size }), 'inline-flex items-center justify-center text-text-tertiary')}>
        {icon ?? <Inbox aria-hidden />}
      </div>
      {title && <p className="mt-tp-3 text-body-strong text-text-primary">{title}</p>}
      {description && <p className="mt-tp-1 text-caption text-text-secondary max-w-prose">{description}</p>}
      {action && <div className="mt-tp-4">{action}</div>}
    </div>
  );
});

Empty.displayName = 'Empty';
