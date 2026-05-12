/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Checkbox, Space, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space direction="vertical" size="sm">
      <label className="inline-flex items-center gap-tp-2"><Checkbox /> <Text>Unchecked</Text></label>
      <label className="inline-flex items-center gap-tp-2"><Checkbox defaultChecked /> <Text>Checked</Text></label>
      <label className="inline-flex items-center gap-tp-2"><Checkbox checked="indeterminate" /> <Text>Indeterminate</Text></label>
      <label className="inline-flex items-center gap-tp-2 opacity-50"><Checkbox disabled /> <Text>Disabled</Text></label>
      <label className="inline-flex items-center gap-tp-2"><Checkbox tone="danger" defaultChecked /> <Text>Danger tone</Text></label>
    </Space>
  );
}
