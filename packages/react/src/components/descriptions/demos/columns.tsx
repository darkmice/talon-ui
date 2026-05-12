/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card, Descriptions, DescriptionsItem } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card padding="md">
      <Descriptions columns={2}>
        <DescriptionsItem label="Workspace">talon-pilot</DescriptionsItem>
        <DescriptionsItem label="Plan">Enterprise</DescriptionsItem>
        <DescriptionsItem label="Owner">dark.lijin@gmail.com</DescriptionsItem>
        <DescriptionsItem label="Members">12</DescriptionsItem>
        <DescriptionsItem label="Created" mono>2026-04-01 14:23</DescriptionsItem>
        <DescriptionsItem label="API limit (mo)">1,000,000</DescriptionsItem>
      </Descriptions>
    </Card>
  );
}
