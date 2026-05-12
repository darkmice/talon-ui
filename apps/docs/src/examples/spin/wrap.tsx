/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Spin, Card, Button, Text } from '@talon-ui/react';

export default function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="space-y-tp-2">
      <Button size="sm" onClick={() => setLoading((v) => !v)}>{loading ? 'Stop' : 'Start'} loading</Button>
      <Spin spinning={loading}>
        <Card padding="md">
          <Text>This card is wrapped in a Spin. When loading, the overlay shows on top.</Text>
        </Card>
      </Spin>
    </div>
  );
}
