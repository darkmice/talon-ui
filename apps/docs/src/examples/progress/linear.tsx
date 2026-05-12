/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Progress, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space direction="vertical" size="sm" className="w-72">
      <Progress value={20} />
      <Progress value={68} />
      <Progress value={100} status="success" />
    </Space>
  );
}
