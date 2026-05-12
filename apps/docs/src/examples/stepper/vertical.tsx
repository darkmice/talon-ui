/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Stepper } from '@talon-ui/react';

export default function Demo() {
  return (
    <Stepper
      orientation="vertical"
      current={1}
      steps={[
        { title: 'Profile', description: 'Avatar, name, role' },
        { title: 'Team', description: 'Pick or create a team' },
        { title: 'Billing', description: 'Add a payment method' },
        { title: 'Welcome', description: 'Confetti time' },
      ]}
    />
  );
}
