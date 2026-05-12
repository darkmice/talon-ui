/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Result, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Result
      status="404"
      description="The page you're looking for doesn't exist."
      extra={<Button>Back to home</Button>}
    />
  );
}
