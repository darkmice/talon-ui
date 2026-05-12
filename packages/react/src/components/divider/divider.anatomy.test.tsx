/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Divider } from './divider.js';

describe('Divider anatomy (design.md §4)', () => {
  test('default <hr> has border-t border-border w-full block', () => {
    const { container } = render(<Divider />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('HR');
    const cls = el.className;
    expect(cls).toMatch(/border-t/);
    expect(cls).toMatch(/border-border/);
    expect(cls).toMatch(/w-full/);
    expect(cls).toMatch(/block/);
  });

  test('vertical <span> has border-l border-border h-4 inline-block self-stretch', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('SPAN');
    const cls = el.className;
    expect(cls).toMatch(/border-l/);
    expect(cls).toMatch(/border-border/);
    expect(cls).toMatch(/h-4/);
    expect(cls).toMatch(/inline-block/);
    expect(cls).toMatch(/self-stretch/);
  });

  test('labelled: outer <div> has flex items-center gap-tp-3; middle span carries text-caption uppercase', () => {
    const { container } = render(<Divider>Section break</Divider>);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.tagName).toBe('DIV');
    const outerCls = outer.className;
    expect(outerCls).toMatch(/flex/);
    expect(outerCls).toMatch(/items-center/);
    expect(outerCls).toMatch(/gap-tp-3/);

    const spans = outer.querySelectorAll('span');
    // spans: [rule-left, label, rule-right]
    expect(spans.length).toBe(3);
    const labelSpan = spans[1] as HTMLElement;
    expect(labelSpan.className).toMatch(/text-caption/);
    expect(labelSpan.className).toMatch(/uppercase/);
    expect(labelSpan.textContent).toBe('Section break');
  });

  test('labelled: flanking rule spans are aria-hidden with border-t border-border flex-1', () => {
    const { container } = render(<Divider>Rule</Divider>);
    const outer = container.firstElementChild as HTMLElement;
    const spans = outer.querySelectorAll('span');
    const left = spans[0] as HTMLElement;
    const right = spans[2] as HTMLElement;

    expect(left).toHaveAttribute('aria-hidden');
    expect(right).toHaveAttribute('aria-hidden');
    expect(left.className).toMatch(/border-t/);
    expect(left.className).toMatch(/border-border/);
    expect(left.className).toMatch(/flex-1/);
    expect(right.className).toMatch(/flex-1/);
  });

  test('tone="strong" on labelled: flanking rules carry border-border-strong', () => {
    const { container } = render(<Divider tone="strong">Label</Divider>);
    const outer = container.firstElementChild as HTMLElement;
    const spans = outer.querySelectorAll('span');
    const left = spans[0] as HTMLElement;
    expect(left.className).toMatch(/border-border-strong/);
  });
});
