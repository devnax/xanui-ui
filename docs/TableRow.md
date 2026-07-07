# TableRow

A table row primitive (`<tr>`) used inside `TableHead`, `TableBody`, or `TableFooter`.

## Import

```tsx
import { TableRow } from "@xanui/ui";
```

## Overview

`TableRow` is a thin `Tag` wrapper rendering a `<tr>` element with `verticalAlign="middle"` applied by default (overridable, since it's spread before `...rest`). It carries no layout or color logic of its own — sizing, borders, and hover/zebra-striping are handled by the parent `Table`. Use it to group `TableCell` children into a row within `TableHead`, `TableBody`, or `TableFooter`.

## Props

`TableRowProps` adds no props beyond `TagProps<T>` (default `T = "tr"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| _(none)_ | — | — | `TableRow` has no props of its own; it only forwards `TagProps`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { TableRow, TableCell } from "@xanui/ui";

<TableRow>
  <TableCell>Alice</TableCell>
  <TableCell>Admin</TableCell>
</TableRow>
```

### Custom hover highlight

```tsx
import { TableRow, TableCell } from "@xanui/ui";

<TableRow hover={{ bgcolor: "accent.ghost.primary" }}>
  <TableCell>Bob</TableCell>
  <TableCell>Editor</TableCell>
</TableRow>
```

## Notes

- `TableRow` is meant to be composed with [Table](./Table.md), [TableHead](./TableHead.md), [TableBody](./TableBody.md), [TableFooter](./TableFooter.md), and [TableCell](./TableCell.md) — see the full composed example in [Table](./Table.md).
- `baseClass` is `"table-row"` (renders as class `xui-table-row`), useful as a theming hook.
- The parent `Table`'s `evenColor` and hover styles target `tbody tr:nth-child(even)` / `tbody tr:hover` directly, so per-row zebra/hover styling is normally configured on `Table`, not on individual `TableRow`s.
