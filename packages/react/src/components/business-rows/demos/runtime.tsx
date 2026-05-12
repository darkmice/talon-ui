/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card, RuntimeRow, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card padding="sm">
      <Space direction="vertical" size="xs">
        <RuntimeRow name="runner-east-01" status="online" engine="bun 1.2" leases={6} cpu={42} memory={61} />
        <RuntimeRow name="runner-west-02" status="idle" engine="node 20" leases={0} cpu={3} memory={28} />
        <RuntimeRow name="runner-asia-03" status="offline" engine="deno 2" />
      </Space>
    </Card>
  );
}
