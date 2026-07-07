# DataFilter

A configuration-driven filter panel — renders a set of typed filter controls (text, number, ranges, select, multi-select, date, date-range) from a declarative `options` array and reports the combined filter state as a single object.

## Import

```tsx
import { DataFilter } from "@xanui/ui";

// Individual filter controls and types are also exported directly:
import {
  SelectFilter,
  MultiSelectFilter,
  NumberFilter,
  NumberRangeFilter,
  TextFilter,
  DateFilter,
  DateRangeFilter,
  type DataFilterOption,
  type DataFilterProps,
} from "@xanui/ui";
```

## Overview

`DataFilter` takes an array of `options` — each describing one filter's `type`, `key`, and `label` (plus `options` for select/multi-select) — and renders the matching control for each. Every control follows the same interaction pattern: a header row with the label plus an "add" button (opens the control, e.g. a date picker `Menu` or number inputs) and, once a value is set, a "clear" button; values are shown as removable `Chip`s (select/multi-select/date) or inline inputs (text/number/number-range/date-range). `DataFilter` itself is stateless/controlled — it holds no state, just maps `value` (keyed by each option's `key`) to the right sub-control and calls `onChange` with the whole updated map whenever any one filter changes. It's used internally by [`Datatable`](./Datatable.md) to build the drawer opened from the filter icon, but works standalone anywhere you need this filter-bar UI.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `DataFilterOption[]` | — | **Required.** The list of filters to render, in order. See [Filter types](#filter-types) below. |
| `value` | `{ [key: string]: any }` | `{}` | Current value map, keyed by each option's `key`. |
| `onChange` | `(state: { [key: string]: any }) => void` | `() => {}` | Called with the full updated value map whenever any individual filter changes. |
| `inline` | `boolean` | `false` | When `true`, filters lay out in a wrapping row (each fixed at `width: 300`); when `false` (default), they stack vertically at full width. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (`children` and `value` are omitted from the inherited `TagProps` in favor of `DataFilter`'s own) — see [Core Concepts](./core-concepts.md).

## Filter types

Every option shares `type`, `key` (used as the field name in `value`/`onChange`), and `label`. `select`/`multi-select` additionally require `options: { label: string, value: string }[]`.

| `type` | Value shape | Control | Notes |
|---|---|---|---|
| `"text"` | `string \| null` | `TextFilter` | Plain text `Input`. "Add" sets an empty string to reveal the input. |
| `"number"` | `number \| null` | `NumberFilter` | Single `InputNumber`. "Add" sets `0` to reveal the input. |
| `"number-range"` | `[number, number] \| null` | `NumberRangeFilter` | Two `InputNumber`s ("Min"/"Max"). "Add" sets `[0, 0]`. |
| `"select"` | `string \| null` | `SelectFilter` | Single choice from `options`, picked via a `Menu` + `List`/`ListItem`/`Checkbox`; shown as one `Chip`. |
| `"multi-select"` | `string[]` | `MultiSelectFilter` | Multiple choices from `options`, same `Menu`/`List` picker; each choice shown as its own `Chip`. |
| `"date"` | `string \| null` (ISO string) | `DateFilter` | Single date via a `Menu` + `Calendar`; shown as one `Chip` with a localized date. |
| `"date-range"` | `[string, string] \| null` (ISO strings) | `DateRangeFilter` | Two `CalendarInput`s (from/to). "Add" seeds both with today's date. |

## Examples

### Basic usage

```tsx
import { useState } from "react";
import { DataFilter, type DataFilterOption } from "@xanui/ui";

const options: DataFilterOption[] = [
  { type: "text", key: "name", label: "Name" },
  { type: "number-range", key: "price", label: "Price" },
  {
    type: "select",
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Archived", value: "archived" },
    ],
  },
];

function Example() {
  const [value, setValue] = useState<{ [key: string]: any }>({});
  return <DataFilter options={options} value={value} onChange={setValue} />;
}
```

### Inline layout with multi-select and date filters

```tsx
import { useState } from "react";
import { DataFilter, type DataFilterOption } from "@xanui/ui";

const options: DataFilterOption[] = [
  {
    type: "multi-select",
    key: "tags",
    label: "Tags",
    options: [
      { label: "Featured", value: "featured" },
      { label: "New", value: "new" },
      { label: "Sale", value: "sale" },
    ],
  },
  { type: "date", key: "createdAt", label: "Created" },
  { type: "date-range", key: "activeBetween", label: "Active between" },
];

function Example() {
  const [value, setValue] = useState<{ [key: string]: any }>({});
  return <DataFilter inline options={options} value={value} onChange={setValue} />;
}
```

## Notes

- `DataFilter` renders each filter's own container styling (`bgcolor: "paper.primary"`, padding, radius) — you generally don't need to add spacing between filters yourself; the panel already applies `gap: 1` and its own padding/radius.
- Individual filter components (`TextFilter`, `SelectFilter`, etc.) are exported directly if you need to render a single filter control outside the composite panel.
- [`Datatable`](./Datatable.md)'s `filters` prop accepts the same `DataFilterOption[]` shape and renders a `DataFilter` inside a side `Drawer`.
