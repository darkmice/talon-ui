/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Title } from './title.js';
import { Text } from './text.js';
import { Paragraph } from './paragraph.js';
import { Link } from './link.js';

describe('Title', () => {
  test('level={1} renders <h1> with text-h1 class', () => {
    const { container } = render(<Title level={1}>Heading</Title>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('H1');
    expect(el.className).toMatch(/text-h1/);
  });

  test('level="display" renders <h1> with text-display class', () => {
    const { container } = render(<Title level="display">Display</Title>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('H1');
    expect(el.className).toMatch(/text-display/);
  });

  test('level={3} tone="secondary" adds text-text-secondary', () => {
    const { container } = render(<Title level={3} tone="secondary">H3</Title>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('H3');
    expect(el.className).toMatch(/text-text-secondary/);
  });

  test('asChild renders child element with title classes', () => {
    const { container } = render(
      <Title asChild><a href="/x">hello</a></Title>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('A');
    expect(el.className).toMatch(/font-semibold/);
    expect(el.className).toMatch(/text-h1/);
  });

  test('forwardRef points to the heading element', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Title ref={ref}>Ref Title</Title>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  test('custom className is preserved', () => {
    const { container } = render(<Title className="custom-cls">H</Title>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/custom-cls/);
  });
});

describe('Text', () => {
  test('variant="caption" tone="tertiary" renders span with both classes', () => {
    const { container } = render(<Text variant="caption" tone="tertiary">cap</Text>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toMatch(/text-caption/);
    expect(el.className).toMatch(/text-text-tertiary/);
  });

  test('variant="mono-sm" nums renders with text-mono-sm font-mono tp-nums', () => {
    const { container } = render(<Text variant="mono-sm" nums>id-001</Text>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/text-mono-sm/);
    expect(el.className).toMatch(/font-mono/);
    expect(el.className).toMatch(/tp-nums/);
  });

  test('asChild renders child element with text classes', () => {
    const { container } = render(
      <Text asChild><strong>bold</strong></Text>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('STRONG');
    expect(el.className).toMatch(/text-body/);
  });

  test('forwardRef points to the span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Text ref={ref}>ref text</Text>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe('Paragraph', () => {
  test('spacing="loose" renders <p> with mb-tp-5', () => {
    const { container } = render(<Paragraph spacing="loose">text</Paragraph>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('P');
    expect(el.className).toMatch(/mb-tp-5/);
  });

  test('forwardRef points to the p element', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<Paragraph ref={ref}>ref para</Paragraph>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe('Link', () => {
  test('renders <a> with href and primary tone class', () => {
    const { container } = render(<Link href="/x">label</Link>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('A');
    expect(el.getAttribute('href')).toBe('/x');
    expect(el.className).toMatch(/text-primary-600/);
  });

  test('asChild renders child element with link classes', () => {
    const { container } = render(
      <Link asChild><span>span link</span></Link>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toMatch(/text-primary-600/);
  });

  test('tone="muted" adds text-text-secondary', () => {
    const { container } = render(<Link tone="muted">muted</Link>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/text-text-secondary/);
  });

  test('forwardRef points to the anchor element', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<Link ref={ref}>ref link</Link>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
