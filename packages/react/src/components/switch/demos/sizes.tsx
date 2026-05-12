/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Space, Switch, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space direction="vertical" size="sm">
      <label className="inline-flex items-center gap-tp-2"><Switch size="sm" defaultChecked /> <Text>Small (sm)</Text></label>
      <label className="inline-flex items-center gap-tp-2"><Switch size="md" defaultChecked /> <Text>Medium (md, default)</Text></label>
      <label className="inline-flex items-center gap-tp-2"><Switch tone="danger" defaultChecked /> <Text>Danger tone</Text></label>
      <label className="inline-flex items-center gap-tp-2 opacity-50"><Switch disabled /> <Text>Disabled</Text></label>
    </Space>
  );
}
