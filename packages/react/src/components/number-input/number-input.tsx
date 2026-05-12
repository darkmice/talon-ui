/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { numberInputWrapVariants } from './number-input.variants.js';
import type { NumberInputProps } from './number-input.types.js';

function clamp(n: number, min?: number, max?: number) {
  if (min != null && n < min) return min;
  if (max != null && n > max) return max;
  return n;
}

function inferPrecision(step: number) {
  const s = String(step);
  return s.includes('.') ? (s.split('.')[1]?.length ?? 0) : 0;
}

function fmt(n: number, precision: number) {
  return Number.isFinite(n) ? n.toFixed(precision) : '';
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    className,
    wrapperClassName,
    size,
    tone,
    unit,
    value,
    defaultValue,
    onChange,
    onValueChange,
    min,
    max,
    step = 1,
    precision,
    disabled,
    holdStep = 100,
    'aria-invalid': ariaInvalid,
    ...rest
  },
  forwardedRef,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement);

  const p = precision ?? inferPrecision(step);
  const [internal, setInternal] = useState<string>(() =>
    value != null ? fmt(Number(value), p) : defaultValue != null ? fmt(Number(defaultValue), p) : '',
  );
  const controlled = value !== undefined;
  const display = controlled ? fmt(Number(value), p) : internal;

  const commit = (next: number) => {
    const clamped = clamp(next, min, max);
    const text = fmt(clamped, p);
    if (!controlled) setInternal(text);
    onValueChange?.(clamped);
    if (innerRef.current) {
      // Synthesise an onChange event for native compatibility
      const proto = Object.getPrototypeOf(innerRef.current);
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      setter?.call(innerRef.current, text);
      innerRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const bump = (dir: 1 | -1) => {
    const current = Number(display || 0);
    commit(current + dir * step);
  };

  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startHold = (dir: 1 | -1) => {
    bump(dir);
    const tick = () => {
      bump(dir);
      holdRef.current = setTimeout(tick, holdStep);
    };
    holdRef.current = setTimeout(tick, holdStep * 4); // initial delay before continuous
  };
  const stopHold = () => {
    if (holdRef.current) {
      clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  };

  useEffect(() => () => stopHold(), []);

  const computedTone = ariaInvalid && tone == null ? 'invalid' : tone;

  return (
    <label
      data-size={size ?? 'md'}
      data-tone={computedTone ?? 'default'}
      className={cn(numberInputWrapVariants({ size, tone: computedTone }), wrapperClassName)}
    >
      <input
        ref={innerRef}
        type="text"
        inputMode="decimal"
        value={display}
        onChange={(e) => {
          const raw = e.target.value;
          if (!controlled) setInternal(raw);
          const n = Number(raw);
          if (Number.isFinite(n)) onValueChange?.(clamp(n, min, max));
          onChange?.(e);
        }}
        onBlur={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) commit(n);
          rest.onBlur?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            bump(1);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            bump(-1);
          }
          rest.onKeyDown?.(e);
        }}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        className={cn('flex-1 min-w-0 bg-transparent outline-none px-tp-3 tp-nums text-text-primary placeholder:text-text-tertiary', className)}
        {...rest}
      />
      {unit && (
        <span className="inline-flex items-center px-tp-2 text-caption text-text-secondary">{unit}</span>
      )}
      <div className="inline-flex flex-col border-l border-border">
        <button
          type="button"
          tabIndex={-1}
          aria-label="Increment"
          onMouseDown={() => startHold(1)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(1)}
          onTouchEnd={stopHold}
          disabled={disabled}
          className="inline-flex items-center justify-center h-1/2 w-6 text-text-secondary hover:bg-bg-subtle disabled:cursor-not-allowed"
        >
          <ChevronUp className="size-3" strokeWidth={2.5} aria-hidden />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Decrement"
          onMouseDown={() => startHold(-1)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(-1)}
          onTouchEnd={stopHold}
          disabled={disabled}
          className="inline-flex items-center justify-center h-1/2 w-6 text-text-secondary hover:bg-bg-subtle border-t border-border disabled:cursor-not-allowed"
        >
          <ChevronDown className="size-3" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </label>
  );
});

NumberInput.displayName = 'NumberInput';
