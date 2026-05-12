/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Stepper, Button, Space } from '@talon-ui/react';

export default function Demo() {
  const [current, setCurrent] = useState(2);
  return (
    <Space direction="vertical" size="md">
      <Stepper
        current={current}
        onStepClick={(i) => setCurrent(i)}
        steps={[
          { title: 'Prep' },
          { title: 'Validate' },
          { title: 'Deploy', status: 'error' },
          { title: 'Wrap-up' },
        ]}
      />
      <Space>
        <Button size="sm" variant="secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>Back</Button>
        <Button size="sm" onClick={() => setCurrent((c) => c + 1)}>Next</Button>
      </Space>
    </Space>
  );
}
