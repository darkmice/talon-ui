/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Custom twMerge instance that understands Talon design-token class groups.
 *
 * tailwind-merge v2 treats every `text-*` class as potentially belonging to
 * the built-in `font-size` group, so custom tokens like `text-text-on-primary`
 * get dropped when they appear alongside `text-body` / `text-caption`.
 *
 * Fix: register these as separate class groups with explicit AdditionalClassGroupIds
 * so they never conflict with built-in Tailwind utilities.
 */
const twMerge = extendTailwindMerge<'tp-text-color' | 'tp-font-size'>({
  extend: {
    classGroups: {
      // `text-text-*` tokens are semantic text colours — separate from font-size.
      'tp-text-color': [{ 'text-text': [''] as string[] }],
      // Talon typography scale tokens (text-body, text-caption, text-h1…h3, text-display, …)
      'tp-font-size': [{ text: ['body', 'body-strong', 'caption', 'label', 'heading', 'display', 'h1', 'h2', 'h3', 'mono-sm'] }],
    },
    conflictingClassGroups: {
      'tp-text-color': ['tp-text-color'],
      'tp-font-size': ['tp-font-size', 'font-size'],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
