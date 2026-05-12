/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card, Descriptions, DescriptionsItem, Tag } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card padding="md">
      <Descriptions>
        <DescriptionsItem label="Name">Talon UI</DescriptionsItem>
        <DescriptionsItem label="Status"><Tag tone="done">Online</Tag></DescriptionsItem>
        <DescriptionsItem label="Region">ap-east-1</DescriptionsItem>
        <DescriptionsItem label="Run ID" mono>run-7f3a-001</DescriptionsItem>
      </Descriptions>
    </Card>
  );
}
