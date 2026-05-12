/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Skeleton, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space direction="vertical" size="sm">
      <Skeleton shape="line" width={240} />
      <Skeleton shape="line" width={180} />
      <Skeleton shape="line" width={120} />
    </Space>
  );
}
