/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Skeleton, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space size="md" align="center">
      <Skeleton shape="circle" width={40} height={40} />
      <Skeleton shape="rect" width={120} height={80} />
      <Skeleton shape="line" width={140} />
    </Space>
  );
}
