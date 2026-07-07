# TableCell

A table cell primitive that renders either a `<td>` or a `<th>`.

## Import

```tsx
import { TableCell } from "@xanui/ui";
```

## Overview

`TableCell` renders a `<td>` by default, or a `<th>` when the `th` prop is set. It applies baseline cell styles (`verticalAlign: "inherit"`, left-aligned text, inherited font size, `text.primary` color) via `sxr`, so they're easy to override with `sx`. Use `th` cells inside `TableHead`/`TableFooter` for header/summary cells, and plain cells inside `TableBody` for data.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `th` | `boolean` | `false` | When `true`, renders a `<th>` element instead of a `<td>`. |

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

### Header cell with colSpan

```tsx
import { TableRow, TableCell } from "@xanui/ui";

<TableRow>
  <TableCell th colSpan={2} textAlign="center">
    Account Details
  </TableCell>
</TableRow>
```

## Notes

- Meant to be composed with [Table](./Table.md), [TableRow](./TableRow.md), [TableHead](./TableHead.md), [TableBody](./TableBody.md), and [TableFooter](./TableFooter.md) — see the full composed example in [Table](./Table.md).
- `baseClass` is `"table-cell"` (renders as class `xui-table-cell`).
- Cell padding and borders (`p`, `borderBottom`/`border`, `borderColor`) are applied by the parent `Table` via `& td, & th` selectors driven by its `size` and `borderType` props, not by `TableCell` itself.
- Standard `<td>`/`<th>` HTML attributes like `colSpan` and `rowSpan` pass through via `TagProps`.
