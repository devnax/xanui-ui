# TableBody

A table body-group primitive (`<tbody>`) used inside `Table`.

## Import

```tsx
import { TableBody } from "@xanui/ui";
```

## Overview

`TableBody` is a thin `Tag` wrapper rendering a `<tbody>` element. It holds the data `TableRow`s of a table. The parent `Table`'s `evenColor` prop (zebra striping) and row-hover background both target `tbody tr` selectors, so those behaviors apply specifically to rows inside `TableBody` (not `TableHead`/`TableFooter`).

## Props

`TableBodyProps` adds no props beyond `TagProps<T>` (default `T = "tbody"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| _(none)_ | — | — | `TableBody` has no props of its own; it only forwards `TagProps`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { TableBody, TableRow, TableCell } from "@xanui/ui";

<TableBody>
  <TableRow>
    <TableCell>Alice</TableCell>
    <TableCell>Admin</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>Bob</TableCell>
    <TableCell>Editor</TableCell>
  </TableRow>
</TableBody>
```

### Rendering rows from data

```tsx
import { TableBody, TableRow, TableCell } from "@xanui/ui";

const users = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" },
];

<TableBody>
  {users.map((u) => (
    <TableRow key={u.id}>
      <TableCell>{u.name}</TableCell>
      <TableCell>{u.role}</TableCell>
    </TableRow>
  ))}
</TableBody>
```

## Notes

- Meant to be composed with [Table](./Table.md), [TableRow](./TableRow.md), [TableCell](./TableCell.md), [TableHead](./TableHead.md), and [TableFooter](./TableFooter.md) — see the full composed example in [Table](./Table.md).
- `baseClass` is `"table-body"` (renders as class `xui-table-body`).
- `Table`'s `evenColor` prop stripes `tbody tr:nth-child(even)`, and hovering any `tbody tr` applies the color template's ghost background — both are configured on `Table`, not `TableBody`.
