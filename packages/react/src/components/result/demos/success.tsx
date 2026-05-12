/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Result, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Result
      status="success"
      title="Deployment complete"
      description="Your changes are live at production.example.com."
      extra={<><Button variant="secondary">View deploy</Button><Button>Go to dashboard</Button></>}
    />
  );
}
