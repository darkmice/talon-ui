/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Progress, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space size="md" align="center">
      <Progress type="circle" size="sm" value={42} />
      <Progress type="circle" size="md" value={68} />
      <Progress type="circle" size="lg" value={100} status="success" />
    </Space>
  );
}
