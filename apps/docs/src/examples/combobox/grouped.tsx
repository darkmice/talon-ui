/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

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
  return (
    <div className="max-w-xs">
      <Combobox defaultValue="postgres">
        <ComboboxTrigger>
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Search engines..." />
          <ComboboxList>
            <ComboboxEmpty>No engine found.</ComboboxEmpty>
            <ComboboxGroup heading="Relational">
              <ComboboxItem value="postgres">PostgreSQL</ComboboxItem>
              <ComboboxItem value="mysql">MySQL</ComboboxItem>
              <ComboboxItem value="sqlite">SQLite</ComboboxItem>
            </ComboboxGroup>
            <ComboboxGroup heading="Document">
              <ComboboxItem value="mongo">MongoDB</ComboboxItem>
              <ComboboxItem value="couch">CouchDB</ComboboxItem>
            </ComboboxGroup>
            <ComboboxGroup heading="Key-value">
              <ComboboxItem value="redis">Redis</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
