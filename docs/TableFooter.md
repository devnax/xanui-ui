# TableFooter

A table footer-group primitive (`<tfoot>`) used inside `Table`.

## Import

```tsx
import { TableFooter } from "@xanui/ui";
```

## Overview

`TableFooter` is a thin `Tag` wrapper rendering a `<tfoot>` element. Like `TableHead`, it has no styling logic of its own — the parent `Table`'s `color`/`variant` props style `thead, tfoot` and `thead th, tfoot th` the same way. Use it for summary/total rows at the bottom of a table.

## Props

`TableFooterProps` adds no props beyond `TagProps<T>` (default `T = "tfoot"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| _(none)_ | — | — | `TableFooter` has no props of its own; it only forwards `TagProps`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { TableFooter, TableRow, TableCell } from "@xanui/ui";

<TableFooter>
  <TableRow>
    <TableCell th>Total</TableCell>
    <TableCell th>$1,250</TableCell>
  </TableRow>
</TableFooter>
```

### Footer with plain (non-header) cells

```tsx
import { TableFooter, TableRow, TableCell } from "@xanui/ui";

<TableFooter>
  <TableRow>
    <TableCell colSpan={2}>Showing 1-10 of 42 results</TableCell>
  </TableRow>
</TableFooter>
```

## Notes

- Meant to be composed with [Table](./Table.md), [TableRow](./TableRow.md), [TableCell](./TableCell.md), [TableHead](./TableHead.md), and [TableBody](./TableBody.md) — see the full composed example in [Table](./Table.md).
- `baseClass` is `"table-footer"` (renders as class `xui-table-footer`).
- Because `Table`'s CSS treats `thead` and `tfoot` identically (same background/text color rules), a `TableFooter` visually matches the `TableHead` styling by default unless overridden.
