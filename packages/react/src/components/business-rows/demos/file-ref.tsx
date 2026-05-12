/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card, FileRefRow, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card padding="sm">
      <Space direction="vertical" size="xs">
        <FileRefRow path="packages/react/src/components/button/button.tsx" timestamp="2h ago" />
        <FileRefRow path="apps/docs/src/content/docs/components/button.mdx" timestamp="3h ago" href="https://example.com" />
        <FileRefRow path="packages/tokens/src/tokens.css" timestamp="yesterday" />
      </Space>
    </Card>
  );
}
