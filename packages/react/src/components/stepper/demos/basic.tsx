/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Stepper } from '@talon-ui/react';

export default function Demo() {
  return (
    <Stepper
      current={2}
      steps={[
        { title: 'Repository' },
        { title: 'Build' },
        { title: 'Deploy' },
        { title: 'Verify' },
      ]}
    />
  );
}
