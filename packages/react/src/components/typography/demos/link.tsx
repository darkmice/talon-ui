/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Link, Paragraph } from '@talon-ui/react';

export default function Demo() {
  return (
    <Paragraph>
      Visit <Link href="https://github.com/darkmice/talon-ui">the GitHub repo</Link> or read the{' '}
      <Link href="/getting-started/installation/" tone="muted">installation guide</Link>.
    </Paragraph>
  );
}
