/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Statistic, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space size="lg">
      <Statistic label="Revenue (mo)" value={12480.5} precision={2} prefix="$" delta={1340} />
      <Statistic label="Errors" value={32} delta={-12} />
    </Space>
  );
}
