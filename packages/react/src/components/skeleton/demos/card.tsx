/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Skeleton, Card, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card padding="md">
      <Space size="md" align="start">
        <Skeleton shape="circle" width={40} height={40} />
        <div className="flex-1 space-y-tp-2">
          <Skeleton shape="line" width="60%" />
          <Skeleton shape="line" width="80%" />
          <Skeleton shape="line" width="40%" />
        </div>
      </Space>
    </Card>
  );
}
