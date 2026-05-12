/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useEffect, useRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Clock } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { timePickerTriggerVariants } from './time-picker.variants.js';
import type { TimePickerProps } from './time-picker.types.js';

/**
 * TimePicker — three-column scrolling time picker inside a Radix Popover.
 * Phase 1: 24-hour only. AM/PM toggle planned for v0.4.
 *
 * @see design.md §6.39
 */

const pad = (n: number) => n.toString().padStart(2, '0');

function parse(value: string | undefined, withSeconds: boolean) {
  if (!value) return { h: 0, m: 0, s: 0, set: false };
  const parts = value.split(':');
  const h = Math.min(23, Math.max(0, Number(parts[0] ?? 0)));
  const m = Math.min(59, Math.max(0, Number(parts[1] ?? 0)));
  const s = withSeconds ? Math.min(59, Math.max(0, Number(parts[2] ?? 0))) : 0;
  return { h, m, s, set: true };
}

function format(h: number, m: number, s: number, withSeconds: boolean) {
  return withSeconds ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}`;
}

interface ColumnProps {
  values: number[];
  active: number;
  onPick: (v: number) => void;
  label: string;
}

function Column({ values, active, onPick, label }: ColumnProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>(`[data-value="${active}"]`);
    if (el && ref.current) {
      const offset = el.offsetTop - ref.current.clientHeight / 2 + el.clientHeight / 2;
      ref.current.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <div
      ref={ref}
      aria-label={label}
      role="listbox"
      className="w-14 h-48 overflow-y-auto scroll-smooth border-r border-border last:border-r-0"
    >
      <ul className="py-1">
        {values.map((v) => {
          const isActive = v === active;
          return (
            <li
              key={v}
              role="option"
              aria-selected={isActive}
              data-value={v}
              tabIndex={0}
              onClick={() => onPick(v)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPick(v);
                }
              }}
              className={cn(
                'h-8 flex items-center justify-center cursor-pointer rounded-sm tabular-nums text-sm text-text-primary',
                'hover:bg-bg-subtle',
                isActive && 'bg-interactive-bg-selected text-interactive-fg-selected font-medium',
              )}
            >
              {pad(v)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const TimePicker = forwardRef<HTMLButtonElement, TimePickerProps>(function TimePicker(
  {
    value,
    defaultValue,
    onValueChange,
    withSeconds = false,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    size,
    tone,
    disabled,
    className,
    // format12h is documented as a future toggle; Phase 1 is 24h only
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format12h: _format12h,
    ...rest
  },
  ref,
) {
  const placeholder = rest.placeholder ?? (withSeconds ? 'HH:MM:SS' : 'HH:MM');
  // Remove placeholder from rest to avoid passing it twice to the button
  const { placeholder: _placeholder, ...buttonRest } = rest;

  const ctrl = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = ctrl ? value : internal;
  const { h, m, s, set } = parse(current, withSeconds);

  const commit = (nh = h, nm = m, ns = s) => {
    const v = format(nh, nm, ns, withSeconds);
    if (!ctrl) setInternal(v);
    onValueChange?.(v);
  };

  const hours = Array.from({ length: Math.ceil(24 / hourStep) }, (_, i) => i * hourStep);
  const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);
  const seconds = Array.from({ length: Math.ceil(60 / secondStep) }, (_, i) => i * secondStep);

  return (
    <Popover.Root>
      <Popover.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(timePickerTriggerVariants({ size, tone }), className)}
        {...buttonRest}
      >
        <Clock className="size-4 text-text-tertiary shrink-0" aria-hidden />
        <span className={cn('flex-1 text-left tabular-nums', !set && 'text-text-tertiary')}>
          {set ? format(h, m, s, withSeconds) : placeholder}
        </span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-50 bg-bg-surface border border-border rounded-md shadow-pop p-2"
        >
          <div className="flex">
            <Column values={hours} active={h} onPick={(v) => commit(v, m, s)} label="Hours" />
            <Column values={minutes} active={m} onPick={(v) => commit(h, v, s)} label="Minutes" />
            {withSeconds && (
              <Column
                values={seconds}
                active={s}
                onPick={(v) => commit(h, m, v)}
                label="Seconds"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-border">
            <button
              type="button"
              className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded-sm hover:bg-bg-subtle"
              onClick={() => {
                const now = new Date();
                commit(now.getHours(), now.getMinutes(), withSeconds ? now.getSeconds() : 0);
              }}
            >
              Now
            </button>
            <button
              type="button"
              className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded-sm hover:bg-bg-subtle"
              onClick={() => {
                if (!ctrl) setInternal(undefined);
                onValueChange?.('');
              }}
            >
              Clear
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});

TimePicker.displayName = 'TimePicker';
