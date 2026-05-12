/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import {
  comboboxTriggerVariants,
  comboboxContentClass,
  comboboxInputClass,
  comboboxItemClass,
  comboboxLabelClass,
  comboboxEmptyClass,
} from './combobox.variants.js';
import type {
  ComboboxProps,
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxItemProps,
} from './combobox.types.js';

// ─── Context ────────────────────────────────────────────────────────────────

type ComboboxCtx = {
  value: string;
  setValue: (v: string) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  registerItem: (value: string, label: string) => void;
  unregisterItem: (value: string) => void;
  labels: Map<string, string>;
};

const ComboboxContext = createContext<ComboboxCtx | null>(null);

function useComboboxContext(): ComboboxCtx {
  const ctx = useContext(ComboboxContext);
  if (!ctx) throw new Error('useComboboxContext must be used inside <Combobox>');
  return ctx;
}

// ─── Combobox (root) ─────────────────────────────────────────────────────────

export function Combobox({
  value,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);

  const isCtrlValue = value !== undefined;
  const isCtrlOpen = openProp !== undefined;

  const v = isCtrlValue ? (value ?? '') : internalValue;
  const o = isCtrlOpen ? !!openProp : internalOpen;

  const setValue = (next: string) => {
    if (!isCtrlValue) setInternalValue(next);
    onValueChange?.(next);
  };

  const setOpen = (next: boolean) => {
    if (!isCtrlOpen) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const labelsRef = useRef<Map<string, string>>(new Map());

  const registerItem = (val: string, label: string) => {
    labelsRef.current.set(val, label);
  };

  const unregisterItem = (val: string) => {
    labelsRef.current.delete(val);
  };

  const ctx = useMemo<ComboboxCtx>(
    () => ({
      value: v,
      setValue,
      open: o,
      setOpen,
      registerItem,
      unregisterItem,
      labels: labelsRef.current,
    }),
    [v, o],
  );

  return (
    <ComboboxContext.Provider value={ctx}>
      <Popover.Root open={o} onOpenChange={setOpen}>
        {children}
      </Popover.Root>
    </ComboboxContext.Provider>
  );
}
Combobox.displayName = 'Combobox';

// ─── ComboboxTrigger ─────────────────────────────────────────────────────────

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  function ComboboxTrigger({ className, size, tone, children, ...rest }, ref) {
    return (
      <Popover.Trigger
        ref={ref}
        role="combobox"
        className={cn(comboboxTriggerVariants({ size, tone }), className)}
        {...rest}
      >
        {children}
        <ChevronDown className="size-4 text-text-tertiary" aria-hidden />
      </Popover.Trigger>
    );
  },
);
ComboboxTrigger.displayName = 'ComboboxTrigger';

// ─── ComboboxValue ────────────────────────────────────────────────────────────

export function ComboboxValue({ placeholder }: { placeholder?: string }) {
  const { value, labels } = useComboboxContext();
  const label = value ? (labels.get(value) ?? value) : '';
  return (
    <span className={cn(!label && 'text-text-tertiary')}>{label || placeholder}</span>
  );
}
ComboboxValue.displayName = 'ComboboxValue';

// ─── ComboboxContent ─────────────────────────────────────────────────────────

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent(
    { className, children, sideOffset = 6, align = 'start', ...rest },
    ref,
  ) {
    return (
      <Popover.Portal>
        <Popover.Content
          ref={ref}
          sideOffset={sideOffset}
          align={align}
          className={cn(comboboxContentClass, className)}
          {...rest}
        >
          <Command className="flex flex-col">{children}</Command>
        </Popover.Content>
      </Popover.Portal>
    );
  },
);
ComboboxContent.displayName = 'ComboboxContent';

// ─── ComboboxInput ────────────────────────────────────────────────────────────

export function ComboboxInput({ placeholder = 'Search...' }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-tp-2 border-b border-border px-tp-3 py-tp-2">
      <Search className="size-4 text-text-tertiary" aria-hidden />
      <Command.Input
        placeholder={placeholder}
        className={comboboxInputClass}
        aria-label={placeholder}
      />
    </div>
  );
}
ComboboxInput.displayName = 'ComboboxInput';

// ─── ComboboxList ─────────────────────────────────────────────────────────────

export function ComboboxList({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <Command.List className={cn('overflow-y-auto max-h-60', className)}>{children}</Command.List>;
}
ComboboxList.displayName = 'ComboboxList';

// ─── ComboboxEmpty ────────────────────────────────────────────────────────────

export function ComboboxEmpty({ children }: { children?: ReactNode }) {
  return (
    <Command.Empty className={comboboxEmptyClass}>{children ?? 'No results.'}</Command.Empty>
  );
}
ComboboxEmpty.displayName = 'ComboboxEmpty';

// ─── ComboboxGroup ────────────────────────────────────────────────────────────

export function ComboboxGroup({
  heading,
  children,
}: {
  heading?: string;
  children?: ReactNode;
}) {
  return (
    <Command.Group
      className="p-1"
      heading={
        heading ? <span className={comboboxLabelClass}>{heading}</span> : undefined
      }
    >
      {children}
    </Command.Group>
  );
}
ComboboxGroup.displayName = 'ComboboxGroup';

// ─── ComboboxItem ─────────────────────────────────────────────────────────────

export function ComboboxItem({
  value,
  children,
  tone,
  disabled,
  className,
  ...rest
}: ComboboxItemProps) {
  const { value: selectedValue, setValue, setOpen, registerItem, unregisterItem } =
    useComboboxContext();

  const text = typeof children === 'string' ? children : value;

  useEffect(() => {
    registerItem(value, text);
    return () => {
      unregisterItem(value);
    };
  }, [value, text]);

  const isSelected = selectedValue === value;

  return (
    <Command.Item
      value={value}
      disabled={disabled}
      onSelect={(v) => {
        setValue(v);
        setOpen(false);
      }}
      className={cn(comboboxItemClass({ tone }), className)}
      {...rest}
    >
      {children}
      {isSelected && <Check className="ml-auto size-4" aria-hidden />}
    </Command.Item>
  );
}
ComboboxItem.displayName = 'ComboboxItem';
