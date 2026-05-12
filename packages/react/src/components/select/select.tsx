/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import {
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
  selectLabelClass,
  selectSeparatorClass,
} from './select.variants.js';
import type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from './select.types.js';

export const Select = (props: SelectProps) => <RadixSelect.Root {...props} />;
Select.displayName = 'Select';

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(props, ref) {
  return <RadixSelect.Value ref={ref} {...props} />;
});
SelectValue.displayName = 'SelectValue';

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { className, size, tone, children, ...rest },
  ref,
) {
  return (
    <RadixSelect.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ size, tone }), className)}
      {...rest}
    >
      {children}
      <RadixSelect.Icon asChild>
        <ChevronDown className="size-4 text-text-tertiary" aria-hidden />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { className, children, position = 'popper', sideOffset = 6, ...rest },
  ref,
) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(selectContentVariants(), className)}
        {...rest}
      >
        <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 text-text-tertiary">
          <ChevronUp className="size-4" aria-hidden />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 text-text-tertiary">
          <ChevronDown className="size-4" aria-hidden />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});
SelectContent.displayName = 'SelectContent';

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, tone, children, ...rest },
  ref,
) {
  return (
    <RadixSelect.Item ref={ref} className={cn(selectItemVariants({ tone }), className)} {...rest}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute right-tp-2 inline-flex items-center">
        <Check className="size-4" aria-hidden />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});
SelectItem.displayName = 'SelectItem';

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(function SelectGroup(props, ref) {
  return <RadixSelect.Group ref={ref} {...props} />;
});
SelectGroup.displayName = 'SelectGroup';

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel(
  { className, ...rest },
  ref,
) {
  return <RadixSelect.Label ref={ref} className={cn(selectLabelClass, className)} {...rest} />;
});
SelectLabel.displayName = 'SelectLabel';

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(function SelectSeparator(
  { className, ...rest },
  ref,
) {
  return <RadixSelect.Separator ref={ref} className={cn(selectSeparatorClass, className)} {...rest} />;
});
SelectSeparator.displayName = 'SelectSeparator';
