---
title: Tabs
nav: Components
group: Feedback & Navigation
order: 24
---

# Tabs

Underline-style tabs with optional badges, wrapping Radix Tabs. `Tabs` are the Talon Pilot underline tabs: 2px primary indicator under the active label, no enclosing pill. Composition mirrors Radix Tabs.

## Basic

<code src="./demos/basic.tsx"></code>

## With badges

<code src="./demos/with-badge.tsx"></code>

## Controlled

<code src="./demos/controlled.tsx"></code>

## API

### Tabs

<API id="Tabs"></API>

### TabsList

<API id="TabsList"></API>

### TabsTrigger

<API id="TabsTrigger"></API>

### TabsContent

<API id="TabsContent"></API>

## Don't

- Don't ship more than ~6 tabs — overflow makes scanning hard. Use a sidebar or breadcrumb instead.
- Don't nest Tabs more than 1 level deep — confusing focus model.
