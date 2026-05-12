/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Banner, Space } from '@talon-ui/react';

export default function Demo() {
  return (
    <Space direction="vertical" size="sm">
      <Banner tone="info" title="Info">Process started.</Banner>
      <Banner tone="success" title="Success">Deployment complete.</Banner>
      <Banner tone="warning" title="Warning">Quota at 85%.</Banner>
      <Banner tone="error" title="Error">Build failed — see logs.</Banner>
    </Space>
  );
}
