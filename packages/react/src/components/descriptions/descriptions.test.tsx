/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Descriptions } from './descriptions.js';
import { DescriptionsItem } from './descriptions.js';

describe('Descriptions', () => {
  test('renders dl with provided DescriptionsItem children labels and values', () => {
    render(
      <Descriptions>
        <DescriptionsItem label="Name">Talon UI</DescriptionsItem>
        <DescriptionsItem label="Region">ap-east-1</DescriptionsItem>
      </Descriptions>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Talon UI')).toBeInTheDocument();
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('ap-east-1')).toBeInTheDocument();
  });

  test('columns=2 sets grid-template-columns: repeat(2, minmax(0, 1fr))', () => {
    const { container } = render(
      <Descriptions columns={2}>
        <DescriptionsItem label="A">1</DescriptionsItem>
        <DescriptionsItem label="B">2</DescriptionsItem>
      </Descriptions>,
    );
    const dl = container.firstElementChild as HTMLElement;
    expect(dl.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  });

  test('layout="vertical" stacks label above value (flex-col)', () => {
    const { container } = render(
      <Descriptions layout="vertical">
        <DescriptionsItem label="Latency">142 ms</DescriptionsItem>
      </Descriptions>,
    );
    const row = container.querySelector('div') as HTMLElement;
    expect(row.className).toMatch(/flex-col/);
  });

  test('mono=true applies font-mono class to the value dd', () => {
    const { container } = render(
      <Descriptions>
        <DescriptionsItem label="Run ID" mono>run-7f3a-001</DescriptionsItem>
      </Descriptions>,
    );
    const dd = container.querySelector('dd') as HTMLElement;
    expect(dd.className).toMatch(/font-mono/);
  });

  test('span=2 sets gridColumn span on that item', () => {
    const { container } = render(
      <Descriptions columns={2}>
        <DescriptionsItem label="Full Row" span={2}>wide content</DescriptionsItem>
      </Descriptions>,
    );
    const row = container.querySelector('div') as HTMLElement;
    expect(row.style.gridColumn).toBe('span 2 / span 2');
  });

  test('span is clamped to columns count', () => {
    const { container } = render(
      <Descriptions columns={2}>
        <DescriptionsItem label="Clamped" span={5}>value</DescriptionsItem>
      </Descriptions>,
    );
    const row = container.querySelector('div') as HTMLElement;
    expect(row.style.gridColumn).toBe('span 2 / span 2');
  });

  test('forwardRef points to the dl element', () => {
    const ref = createRef<HTMLDListElement>();
    const { container } = render(
      <Descriptions ref={ref}>
        <DescriptionsItem label="A">1</DescriptionsItem>
      </Descriptions>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(container.firstElementChild);
    expect((ref.current as HTMLElement).tagName).toBe('DL');
  });

  test('size="sm" applies min-h-7 to rows', () => {
    const { container } = render(
      <Descriptions size="sm">
        <DescriptionsItem label="A">1</DescriptionsItem>
      </Descriptions>,
    );
    const row = container.querySelector('div') as HTMLElement;
    expect(row.className).toMatch(/min-h-7/);
  });

  test('size="md" (default) applies min-h-8 to rows', () => {
    const { container } = render(
      <Descriptions>
        <DescriptionsItem label="A">1</DescriptionsItem>
      </Descriptions>,
    );
    const row = container.querySelector('div') as HTMLElement;
    expect(row.className).toMatch(/min-h-8/);
  });
});
