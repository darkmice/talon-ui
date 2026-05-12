/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card, Descriptions, DescriptionsItem } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card padding="md">
      <Descriptions layout="vertical" columns={3}>
        <DescriptionsItem label="Latency">142 ms</DescriptionsItem>
        <DescriptionsItem label="Throughput">52 / s</DescriptionsItem>
        <DescriptionsItem label="Errors">3</DescriptionsItem>
      </Descriptions>
    </Card>
  );
}
