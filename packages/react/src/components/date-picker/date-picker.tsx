/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker, type DateRange } from 'react-day-picker';
import { format as dfnsFormat } from 'date-fns';
import { Calendar } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { datePickerTriggerVariants } from './date-picker.variants.js';
import type { DatePickerProps } from './date-picker.types.js';

/**
 * DatePicker — calendar popover for single date or date range selection.
 * Built on react-day-picker v10 + @radix-ui/react-popover.
 *
 * @see design.md §6.38
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(
    {
      mode = 'single',
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Pick a date',
      format,
      size,
      tone,
      disabled,
      className,
      disabledDates,
      weekStartsOn = 0,
      ...rest
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<Date | DateRange | undefined>(
      defaultValue ?? undefined,
    );
    const current = isControlled ? value : internal;

    const resolvedFormat = format ?? (mode === 'range' ? 'PP' : 'PP');

    const set = (v: Date | DateRange | undefined) => {
      if (!isControlled) setInternal(v);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (onValueChange as any)?.(v);
    };

    const label = (() => {
      if (mode === 'single') {
        const d = current as Date | undefined;
        return d ? dfnsFormat(d, resolvedFormat) : '';
      }
      const r = current as DateRange | undefined;
      if (!r?.from) return '';
      if (!r.to) return `${dfnsFormat(r.from, 'PP')} –`;
      return `${dfnsFormat(r.from, 'PP')} – ${dfnsFormat(r.to, 'PP')}`;
    })();

    // react-day-picker v10 classNames use UI / DayFlag / SelectionState enum values.
    const rdpClassNames = {
      // UI keys
      root: 'tp-rdp',
      months: 'flex flex-col',
      month: 'space-y-2',
      month_caption: 'flex justify-between items-center px-2 py-1',
      caption_label: 'text-sm font-medium text-text-primary',
      nav: 'flex items-center gap-1',
      button_previous:
        'inline-flex items-center justify-center size-7 rounded-sm hover:bg-bg-subtle text-text-secondary disabled:opacity-40',
      button_next:
        'inline-flex items-center justify-center size-7 rounded-sm hover:bg-bg-subtle text-text-secondary disabled:opacity-40',
      month_grid: 'w-full border-collapse',
      weekdays: 'flex',
      weekday:
        'inline-flex items-center justify-center size-8 text-[0.7rem] uppercase tracking-[0.06em] text-text-tertiary',
      weeks: '',
      week: 'flex w-full mt-1',
      day: 'relative inline-flex items-center justify-center size-8 text-sm',
      day_button:
        'inline-flex items-center justify-center size-8 rounded-sm hover:bg-bg-subtle text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      // DayFlag keys
      today: '[&>button]:border [&>button]:border-primary-500',
      outside: '[&>button]:text-text-tertiary [&>button]:opacity-50',
      disabled: '[&>button]:text-text-tertiary [&>button]:line-through [&>button]:cursor-not-allowed',
      hidden: 'invisible',
      focused: '',
      // SelectionState keys
      selected:
        '[&>button]:bg-primary-500 [&>button]:text-white [&>button]:hover:bg-primary-600',
      range_start:
        'rounded-l-sm [&>button]:bg-primary-500 [&>button]:text-white [&>button]:hover:bg-primary-600',
      range_end:
        'rounded-r-sm [&>button]:bg-primary-500 [&>button]:text-white [&>button]:hover:bg-primary-600',
      range_middle:
        'bg-primary-50 [&>button]:text-primary-700 [&>button]:hover:bg-primary-100 [&>button]:rounded-none',
      // Misc UI keys (chevron, dropdowns, footer)
      chevron: 'size-4',
      dropdowns: '',
      dropdown: '',
      dropdown_root: '',
      footer: '',
      week_number: '',
      week_number_header: '',
      months_dropdown: '',
      years_dropdown: '',
    };

    return (
      <Popover.Root>
        <Popover.Trigger
          ref={ref}
          disabled={disabled}
          className={cn(datePickerTriggerVariants({ size, tone }), className)}
          {...rest}
        >
          <Calendar className="size-4 text-text-tertiary shrink-0" aria-hidden />
          <span className={cn('flex-1 text-left truncate', !label && 'text-text-tertiary')}>
            {label || placeholder}
          </span>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={6}
            className="z-50 bg-bg-surface border border-border rounded-md shadow-pop p-3 min-w-[280px]"
          >
            {mode === 'single' ? (
              <DayPicker
                mode="single"
                selected={current as Date | undefined}
                onSelect={(d) => set(d)}
                disabled={disabledDates}
                weekStartsOn={weekStartsOn}
                showOutsideDays
                classNames={rdpClassNames}
              />
            ) : (
              <DayPicker
                mode="range"
                selected={current as DateRange | undefined}
                onSelect={(r) => set(r)}
                disabled={disabledDates}
                weekStartsOn={weekStartsOn}
                showOutsideDays
                classNames={rdpClassNames}
              />
            )}

            <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-border">
              <button
                type="button"
                className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded-sm hover:bg-bg-subtle"
                onClick={() => set(undefined)}
              >
                Clear
              </button>
              <button
                type="button"
                className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded-sm hover:bg-bg-subtle"
                onClick={() =>
                  set(
                    mode === 'single'
                      ? new Date()
                      : { from: new Date(), to: new Date() },
                  )
                }
              >
                Today
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

DatePicker.displayName = 'DatePicker';
