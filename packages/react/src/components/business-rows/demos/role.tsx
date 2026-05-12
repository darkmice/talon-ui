/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card, RoleRow, Space } from '@talon-ui/react';

const members = [
  { id: '1', name: 'Ada' }, { id: '2', name: 'Brian' }, { id: '3', name: 'Carmen' },
  { id: '4', name: 'Dorothy' }, { id: '5', name: 'Edsger' },
];

export default function Demo() {
  return (
    <Card padding="sm">
      <Space direction="vertical" size="xs">
        <RoleRow name="Owners" members={members.slice(0, 2)} manageHref="#" />
        <RoleRow name="Maintainers" members={members.slice(0, 5)} manageHref="#" />
        <RoleRow name="Viewers" members={[]} />
      </Space>
    </Card>
  );
}
