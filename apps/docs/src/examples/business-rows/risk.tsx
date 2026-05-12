/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card, RiskRow, Space, Title } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card padding="sm">
      <Title level={3} className="mb-tp-2">Risks (3)</Title>
      <Space direction="vertical" size="xs">
        <RiskRow
          message="Project Atlas is missing a billing method."
          actionHref="#"
          actionLabel="Add billing"
        />
        <RiskRow
          message="2 nodes have CPU > 80% for the last 1 hour."
          actionLabel="View nodes"
          onAction={() => alert('view')}
        />
        <RiskRow
          message="API key 'prod-api-x' has been unused for 90 days."
          actionHref="#"
          actionLabel="Review"
        />
      </Space>
    </Card>
  );
}
