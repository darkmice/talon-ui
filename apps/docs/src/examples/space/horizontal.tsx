/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Button, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space size="md" align="center">
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Reset</Button>
    </Space>
  );
}
