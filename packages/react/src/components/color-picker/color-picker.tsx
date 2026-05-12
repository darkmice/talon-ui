/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

/* eslint-disable no-restricted-syntax -- ColorPicker legitimately stores its own preset hex palette */
import { forwardRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Check } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { colorPickerTriggerVariants } from './color-picker.variants.js';
import type { ColorPickerProps } from './color-picker.types.js';

/**
 * ColorPicker — compact Phase-1 picker.
 * Preset grid + hex input + native system fallback.
 * Alpha channel and HSL/HSV canvas are deferred to v0.4.
 *
 * @see design.md §6.39
 */

export const DEFAULT_PRESETS = [
  // Primary
  '#4F60FF', '#3B4DE6', '#2E3DBF',
  // Status fg
  '#2E5BFF', '#B26B00', '#0E8A55', '#C8322B',
  // Accents
  '#7C5CFF', '#FF7A45', '#10B981', '#F59E0B', '#06B6D4', '#EC4899',
  // Neutrals
  '#0F172A', '#475569', '#94A3B8', '#E6E8EE', '#FFFFFF',
];

/** Perceived brightness via ITU BT.601 */
function isLight(hex: string): boolean {
  const m = hex.match(/^#?([0-9A-Fa-f]{6})$/);
  if (!m || !m[1]) return true;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

const HEX_RE = /^#([0-9A-Fa-f]{6})$/;

export const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(
  function ColorPicker(
    {
      value,
      defaultValue = '#4F60FF',
      onValueChange,
      presets = DEFAULT_PRESETS,
      size,
      tone,
      disabled,
      showHexInput = true,
      showSystemPicker = true,
      className,
      label = 'Pick a color',
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const current = isControlled ? value! : internal;
    const [hexInput, setHexInput] = useState(current);

    const setColor = (v: string) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
      setHexInput(v);
    };

    const commitHex = (raw: string) => {
      const trimmed = raw.trim();
      if (HEX_RE.test(trimmed)) {
        setColor(trimmed.toUpperCase());
      } else {
        setHexInput(current);
      }
    };

    return (
      <Popover.Root>
        <Popover.Trigger
          ref={ref}
          aria-label={label}
          disabled={disabled}
          className={cn(colorPickerTriggerVariants({ size, tone }), className)}
        >
          <span
            aria-hidden
            className="size-5 rounded-sm border border-border shrink-0"
            style={{ backgroundColor: current }}
          />
          <span className="tp-nums text-body text-text-primary uppercase">{current}</span>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={6}
            className="z-overlay bg-bg-surface border border-border rounded-md shadow-pop p-tp-3 w-64 space-y-tp-3"
          >
            {/* Preset grid */}
            <div>
              <p className="text-caption uppercase tracking-[0.06em] text-text-tertiary mb-tp-2">
                Presets
              </p>
              <div className="grid grid-cols-9 gap-tp-1" role="grid" aria-label="Color presets">
                {presets.map((c) => {
                  const active = current.toLowerCase() === c.toLowerCase();
                  return (
                    <button
                      key={c}
                      type="button"
                      role="gridcell"
                      aria-selected={active}
                      aria-label={c}
                      onClick={() => setColor(c)}
                      className={cn(
                        'size-5 rounded-sm border border-border relative',
                        'hover:scale-110 transition-transform duration-fast ease-tp',
                        'focus:outline-none focus-visible:tp-focus-ring',
                      )}
                      style={{ backgroundColor: c }}
                    >
                      {active && (
                        <Check
                          className="absolute inset-0 m-auto size-3"
                          strokeWidth={3}
                          style={{ color: isLight(c) ? '#0F172A' : '#FFFFFF' }}
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hex input + system picker row */}
            {(showHexInput || showSystemPicker) && (
              <div className="flex items-center gap-tp-2">
                {showSystemPicker && (
                  <label
                    className="size-7 rounded-sm border border-border relative overflow-hidden cursor-pointer"
                    aria-label="Open native color picker"
                  >
                    <input
                      type="color"
                      value={current.toLowerCase()}
                      onChange={(e) => setColor(e.target.value.toUpperCase())}
                      className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-1 rounded-sm"
                      style={{ backgroundColor: current }}
                    />
                  </label>
                )}

                {showHexInput && (
                  <input
                    type="text"
                    inputMode="text"
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value)}
                    onBlur={(e) => commitHex(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        commitHex((e.target as HTMLInputElement).value);
                      }
                    }}
                    placeholder="#RRGGBB"
                    spellCheck={false}
                    aria-label="Hex color value"
                    className="flex-1 h-control-sm rounded-sm border border-border px-tp-2 text-body tp-nums uppercase bg-bg-surface text-text-primary focus:tp-focus-ring focus:border-primary-500 focus:outline-none"
                  />
                )}
              </div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

ColorPicker.displayName = 'ColorPicker';
