/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { spinIconVariants, spinTipClass } from './spin.variants.js';
import type { SpinProps } from './spin.types.js';

export const Spin = forwardRef<HTMLDivElement, SpinProps>(function Spin(
  { className, size = 'md', tone = 'primary', tip, spinning = true, children, delay = 0, ...rest },
  ref,
) {
  const [active, setActive] = useState(delay === 0 ? spinning : false);
  useEffect(() => {
    if (!spinning) {
      setActive(false);
      return;
    }
    if (delay === 0) {
      setActive(true);
      return;
    }
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [spinning, delay]);

  const spinner = (
    <span role="status" aria-live="polite" aria-label={typeof tip === 'string' ? tip : 'Loading'} className={cn('inline-flex flex-col items-center gap-tp-2')}>
      <Loader2 className={cn(spinIconVariants({ size, tone }), 'animate-spin')} strokeWidth={2} aria-hidden />
      {tip && <span className={spinTipClass}>{tip}</span>}
    </span>
  );

  if (children !== undefined) {
    return (
      <div ref={ref} className={cn('relative inline-block w-full', className)} {...rest}>
        <div className={cn('transition-opacity duration-fast', active && 'opacity-50 pointer-events-none')}>{children}</div>
        {active && (
          <div className="absolute inset-0 flex items-center justify-center">
            {spinner}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {active && spinner}
    </div>
  );
});

Spin.displayName = 'Spin';
