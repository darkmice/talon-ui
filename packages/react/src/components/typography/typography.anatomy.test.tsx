/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Title } from './title.js';
import { Text } from './text.js';
import { Paragraph } from './paragraph.js';
import { Link } from './link.js';

describe('Typography anatomy (design.md §3)', () => {
  test('default <Title> → <h1> with text-h1 font-semibold text-text-primary tracking-tight', () => {
    const { container } = render(<Title>Default title</Title>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('H1');
    const cls = el.className;
    expect(cls).toMatch(/text-h1/);
    expect(cls).toMatch(/font-semibold/);
    expect(cls).toMatch(/text-text-primary/);
    expect(cls).toMatch(/tracking-tight/);
  });

  test('<Title level="display"> → <h1> with text-display font-semibold', () => {
    const { container } = render(<Title level="display">Display</Title>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('H1');
    const cls = el.className;
    expect(cls).toMatch(/text-display/);
    expect(cls).toMatch(/font-semibold/);
  });

  test('<Text variant="body-strong"> → <span> with text-body-strong font-medium text-text-primary', () => {
    const { container } = render(<Text variant="body-strong">strong</Text>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('SPAN');
    const cls = el.className;
    expect(cls).toMatch(/text-body-strong/);
    expect(cls).toMatch(/font-medium/);
    expect(cls).toMatch(/text-text-primary/);
  });

  test('<Paragraph> → <p> with text-body text-text-primary mb-tp-3 leading-\\[22px\\]', () => {
    const { container } = render(<Paragraph>para</Paragraph>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('P');
    const cls = el.className;
    expect(cls).toMatch(/text-body/);
    expect(cls).toMatch(/text-text-primary/);
    expect(cls).toMatch(/mb-tp-3/);
    expect(cls).toMatch(/leading-\[22px\]/);
  });

  test('<Link> default → <a> with text-primary-600 hover:text-primary-700', () => {
    const { container } = render(<Link href="#">link</Link>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('A');
    const cls = el.className;
    expect(cls).toMatch(/text-primary-600/);
    expect(cls).toMatch(/hover:text-primary-700/);
  });
});
