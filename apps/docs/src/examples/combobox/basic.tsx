/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
} from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState<string>();
  return (
    <div className="max-w-xs">
      <Combobox value={v} onValueChange={setV}>
        <ComboboxTrigger>
          <ComboboxValue placeholder="Pick a framework..." />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Filter frameworks..." />
          <ComboboxList>
            <ComboboxEmpty>Nothing matched.</ComboboxEmpty>
            <ComboboxGroup heading="Frontend">
              <ComboboxItem value="react">React</ComboboxItem>
              <ComboboxItem value="vue">Vue</ComboboxItem>
              <ComboboxItem value="svelte">Svelte</ComboboxItem>
              <ComboboxItem value="solid">Solid</ComboboxItem>
              <ComboboxItem value="qwik">Qwik</ComboboxItem>
              <ComboboxItem value="astro">Astro</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
