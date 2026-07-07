# TableHead

A table header-group primitive (`<thead>`) used inside `Table`.

## Import

```tsx
import { TableHead } from "@xanui/ui";
```

## Overview

`TableHead` is a thin `Tag` wrapper rendering a `<thead>` element. It carries no styling logic of its own — its background/text color is driven by the parent `Table`'s `color`/`variant` props (which target `thead, tfoot` and `thead th, tfoot th` selectors). Use it to wrap one or more `TableRow`s containing header `TableCell`s (`th`).

## Props

`TableHeadProps` adds no props beyond `TagProps<T>` (default `T = "thead"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| _(none)_ | — | — | `TableHead` has no props of its own; it only forwards `TagProps`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { TableHead, TableRow, TableCell } from "@xanui/ui";

<TableHead>
  <TableRow>
    <TableCell th>Name</TableCell>
    <TableCell th>Role</TableCell>
  </TableRow>
</TableHead>
```

### Multi-row header

```tsx
import { TableHead, TableRow, TableCell } from "@xanui/ui";

<TableHead>
  <TableRow>
    <TableCell th colSpan={2}>Account</TableCell>
  </TableRow>
  <TableRow>
    <TableCell th>Name</TableCell>
    <TableCell th>Role</TableCell>
  </TableRow>
</TableHead>
```

## Notes

- Meant to be composed with [Table](./Table.md), [TableRow](./TableRow.md), [TableCell](./TableCell.md), [TableBody](./TableBody.md), and [TableFooter](./TableFooter.md) — see the full composed example in [Table](./Table.md).
- `baseClass` is `"table-head"` (renders as class `xui-table-head`).
- `Table` styles `& thead, & tfoot` and `& thead th, & tfoot th` based on its own `color`/`variant` props, so header coloring is normally controlled at the `Table` level.
