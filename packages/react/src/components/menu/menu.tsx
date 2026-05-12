/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRight, Check, Circle } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import {
  menuContentVariants,
  menuItemVariants,
  menuLabelClass,
  menuSeparatorClass,
  menuShortcutClass,
  menuSubContentClass,
} from './menu.variants.js';
import type {
  MenuProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuItemProps,
  MenuSubTriggerProps,
  MenuCheckboxItemProps,
  MenuRadioItemProps,
} from './menu.types.js';

export const Menu = RadixMenu.Root;
export const MenuTrigger = RadixMenu.Trigger;
export const MenuPortal = RadixMenu.Portal;
export const MenuSub = RadixMenu.Sub;
export const MenuRadioGroup = RadixMenu.RadioGroup;
export const MenuGroup = RadixMenu.Group;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  { className, sideOffset = 6, ...rest },
  ref,
) {
  return (
    <RadixMenu.Portal>
      <RadixMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(menuContentVariants(), className)}
        {...rest}
      />
    </RadixMenu.Portal>
  );
});
MenuContent.displayName = 'MenuContent';

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { className, tone, icon, shortcut, children, ...rest },
  ref,
) {
  return (
    <RadixMenu.Item ref={ref} className={cn(menuItemVariants({ tone }), className)} {...rest}>
      {icon && <span className="size-4 inline-flex items-center justify-center shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && <span className={menuShortcutClass}>{shortcut}</span>}
    </RadixMenu.Item>
  );
});
MenuItem.displayName = 'MenuItem';

export const MenuLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function MenuLabel(
  { className, ...rest },
  ref,
) {
  return <RadixMenu.Label ref={ref} className={cn(menuLabelClass, className)} {...rest} />;
});
MenuLabel.displayName = 'MenuLabel';

export const MenuSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function MenuSeparator(
  { className, ...rest },
  ref,
) {
  return <RadixMenu.Separator ref={ref} className={cn(menuSeparatorClass, className)} {...rest} />;
});
MenuSeparator.displayName = 'MenuSeparator';

export const MenuShortcut = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn(menuShortcutClass, className)}>{children}</span>
);
MenuShortcut.displayName = 'MenuShortcut';

export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(function MenuSubTrigger(
  { className, icon, children, ...rest },
  ref,
) {
  return (
    <RadixMenu.SubTrigger
      ref={ref}
      className={cn(menuItemVariants({}), 'data-[state=open]:bg-bg-subtle', className)}
      {...rest}
    >
      {icon && <span className="size-4 inline-flex items-center justify-center shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      <ChevronRight className="size-4 text-text-tertiary" aria-hidden />
    </RadixMenu.SubTrigger>
  );
});
MenuSubTrigger.displayName = 'MenuSubTrigger';

export const MenuSubContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenuSubContent(
  { className, sideOffset = 6, ...rest },
  ref,
) {
  return (
    <RadixMenu.Portal>
      <RadixMenu.SubContent
        ref={ref}
        sideOffset={sideOffset}
        className={cn(menuSubContentClass, className)}
        {...rest}
      />
    </RadixMenu.Portal>
  );
});
MenuSubContent.displayName = 'MenuSubContent';

export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(function MenuCheckboxItem(
  { className, children, ...rest },
  ref,
) {
  return (
    <RadixMenu.CheckboxItem ref={ref} className={cn(menuItemVariants({}), 'pl-tp-6 relative', className)} {...rest}>
      <RadixMenu.ItemIndicator className="absolute left-tp-2 inline-flex items-center justify-center">
        <Check className="size-3" strokeWidth={2.5} aria-hidden />
      </RadixMenu.ItemIndicator>
      <span className="flex-1">{children}</span>
    </RadixMenu.CheckboxItem>
  );
});
MenuCheckboxItem.displayName = 'MenuCheckboxItem';

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(function MenuRadioItem(
  { className, children, ...rest },
  ref,
) {
  return (
    <RadixMenu.RadioItem ref={ref} className={cn(menuItemVariants({}), 'pl-tp-6 relative', className)} {...rest}>
      <RadixMenu.ItemIndicator className="absolute left-tp-2 inline-flex items-center justify-center">
        <Circle className="size-2 fill-current" aria-hidden />
      </RadixMenu.ItemIndicator>
      <span className="flex-1">{children}</span>
    </RadixMenu.RadioItem>
  );
});
MenuRadioItem.displayName = 'MenuRadioItem';

// Re-export type aliases for external use
export type { MenuProps, MenuTriggerProps, MenuContentProps, MenuItemProps, MenuSubTriggerProps, MenuCheckboxItemProps, MenuRadioItemProps };
