---
title: Menu
nav: Components
group: Feedback & Navigation
order: 28
---

# Menu

Dropdown menu with submenus, shortcuts, separators, and danger items. `Menu` is the dropdown menu wrapped over `@radix-ui/react-dropdown-menu`. It supports icons, shortcut labels, separators, submenus, checkbox / radio items, and a destructive `tone="danger"` for items.

## Basic

<code src="./demos/basic.tsx"></code>

## Icons + shortcuts

<code src="./demos/icons-and-shortcuts.tsx"></code>

## Submenu

<code src="./demos/submenu.tsx"></code>

## Exports

`Menu`, `MenuTrigger`, `MenuContent`, `MenuItem` (with `icon`, `shortcut`, `tone`), `MenuLabel`, `MenuSeparator`, `MenuShortcut`, `MenuSub`, `MenuSubTrigger`, `MenuSubContent`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuGroup`, `MenuPortal`.

## API

### MenuItem

<API id="MenuItem"></API>

### MenuSubTrigger

<API id="MenuSubTrigger"></API>

### MenuCheckboxItem

<API id="MenuCheckboxItem"></API>

### MenuRadioItem

<API id="MenuRadioItem"></API>

## Don't

- Don't use Menu as a substitute for Tabs or Sidebar — menus are for actions, not navigation.
- Don't pack more than ~10 items into one menu. Group with `MenuLabel` and `MenuSeparator`, or split into nested submenus.
