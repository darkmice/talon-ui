/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Paragraph, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="space-y-tp-2">
      <Paragraph>This is the default body paragraph at 14 / 22 with normal spacing below.</Paragraph>
      <Text variant="body-strong">Body strong — 14 / 22 / 500.</Text>
      <Text variant="caption" tone="secondary">Caption — 12 / 18 / 400 secondary tone.</Text>
      <Text variant="mono-sm" nums>node-7f3a-001 · 12.34ms · 89.2%</Text>
    </div>
  );
}
