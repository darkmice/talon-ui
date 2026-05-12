/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Progress, Space, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space direction="vertical" size="md" className="w-72">
      <div><Text variant="caption" tone="secondary">Normal</Text><Progress value={50} /></div>
      <div><Text variant="caption" tone="secondary">Success</Text><Progress value={100} status="success" /></div>
      <div><Text variant="caption" tone="secondary">Warning</Text><Progress value={72} status="warning" /></div>
      <div><Text variant="caption" tone="secondary">Error</Text><Progress value={30} status="error" /></div>
    </Space>
  );
}
