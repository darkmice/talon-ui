/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Descriptions, DescriptionsItem } from './descriptions.js';

describe('Descriptions anatomy (design.md §6.18)', () => {
  test('Root is <dl> with grid gap-x-tp-6 gap-y-tp-2', () => {
    const { container } = render(
      <Descriptions>
        <DescriptionsItem label="Name">Talon UI</DescriptionsItem>
      </Descriptions>,
    );
    const dl = container.firstElementChild as HTMLElement;
    expect(dl.tagName).toBe('DL');
    const cls = dl.className;
    expect(cls).toMatch(/grid/);
    expect(cls).toMatch(/gap-x-tp-6/);
    expect(cls).toMatch(/gap-y-tp-2/);
  });

  test('Horizontal: each row has <dt class="text-caption text-text-secondary"> and <dd class="text-body text-text-primary">', () => {
    const { container } = render(
      <Descriptions layout="horizontal">
        <DescriptionsItem label="Status">Online</DescriptionsItem>
      </Descriptions>,
    );
    const dt = container.querySelector('dt') as HTMLElement;
    const dd = container.querySelector('dd') as HTMLElement;

    expect(dt).toBeInTheDocument();
    expect(dt.className).toMatch(/text-caption/);
    expect(dt.className).toMatch(/text-text-secondary/);

    expect(dd).toBeInTheDocument();
    expect(dd.className).toMatch(/text-body/);
    expect(dd.className).toMatch(/text-text-primary/);
  });

  test('Vertical layout: each row has flex-col class and dt before dd in DOM', () => {
    const { container } = render(
      <Descriptions layout="vertical">
        <DescriptionsItem label="Latency">142 ms</DescriptionsItem>
      </Descriptions>,
    );
    const row = container.querySelector('div') as HTMLElement;
    expect(row.className).toMatch(/flex-col/);

    const children = Array.from(row.children);
    const dtIndex = children.findIndex((el) => el.tagName === 'DT');
    const ddIndex = children.findIndex((el) => el.tagName === 'DD');
    expect(dtIndex).toBeLessThan(ddIndex);
  });

  test('Horizontal layout: row has flex items-baseline and dt has shrink-0 min-w-[120px]', () => {
    const { container } = render(
      <Descriptions layout="horizontal">
        <DescriptionsItem label="Name">Talon UI</DescriptionsItem>
      </Descriptions>,
    );
    const row = container.querySelector('div') as HTMLElement;
    expect(row.className).toMatch(/flex/);
    expect(row.className).toMatch(/items-baseline/);

    const dt = container.querySelector('dt') as HTMLElement;
    expect(dt.className).toMatch(/shrink-0/);
    expect(dt.className).toMatch(/min-w-\[120px\]/);
  });
});
