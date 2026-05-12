/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Button, Card, Input, Tag, Avatar, AvatarGroup, Progress, Space, Title, Text } from '@talon-ui/react';

export default function HeroPreview() {
  const [name, setName] = useState('Talon UI');
  return (
    <Card padding="md" className="max-w-md mx-auto">
      <Space size="sm">
        <AvatarGroup max={3}>
          <Avatar fallback="AL" />
          <Avatar fallback="BR" />
          <Avatar fallback="CD" />
          <Avatar fallback="EF" />
        </AvatarGroup>
        <Space direction="vertical" size="xs">
          <Title level={3}>{name}</Title>
          <Tag tone="done" dot>Shipping</Tag>
        </Space>
      </Space>
      <div className="mt-tp-4 space-y-tp-3">
        <Input
          placeholder="Workspace name"
          value={name}
          onChange={(e) => setName(e.target.value || 'Talon UI')}
        />
        <div>
          <Text variant="caption" tone="secondary">Build progress</Text>
          <Progress value={92} status="success" />
        </div>
        <Space justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </Space>
      </div>
    </Card>
  );
}
