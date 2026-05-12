---
title: KanbanCard
nav: Components
group: Data Display
order: 44
---

# KanbanCard

Single Kanban board card composed of id, title, tags, assignees, progress, timestamp. `KanbanCard` is a complete board card. It composes our `Card` + `Tag` + `Avatar` / `AvatarGroup` + `Progress` so callers don't reinvent the layout.

## Basic

<code src="./demos/basic.tsx"></code>

## With progress

<code src="./demos/progress.tsx"></code>

## Selectable + assignees

<code src="./demos/assignees.tsx"></code>

## API

<API id="KanbanCard"></API>

## Don't

- Don't squeeze more than two tags side-by-side; use vertical stacking.
- Don't use KanbanCard outside a column / board context — orphan cards lose meaning.
