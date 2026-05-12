/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Result, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Result
      status="error"
      title="Pipeline failed"
      description="One or more steps did not complete successfully."
      extra={<><Button variant="secondary">Open logs</Button><Button variant="danger">Retry</Button></>}
    />
  );
}
