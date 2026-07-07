# Table

The root `<table>` primitive that provides shared sizing, coloring, borders, and zebra/hover styling for a composed table.

## Import

```tsx
import { Table } from "@xanui/ui";
```

## Overview

`Table` renders a `<table>` wrapped in a `Scrollbar` (for horizontal overflow on small screens), and pushes down cell padding, border, and header/footer background/text-color styles onto its `TableHead`, `TableBody`, `TableFooter`, `TableRow`, and `TableCell` descendants via CSS selectors (`& thead, & tfoot`, `& td, & th`, `& tbody tr:hover`, etc.) — the child components themselves stay unstyled and purely structural. `size`, `color`, `variant`, `borderType`, and `evenColor` all support responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `evenColor` | `useBreakpointPropsType<boolean>` | `undefined` (off) | When truthy, applies a ghost background tint to even `tbody` rows (zebra striping), colored per `color`/`variant`. |
| `size` | `useBreakpointPropsType<"xs" \| "sm" \| "md" \| "lg" \| "xl" \| number>` | `"md"` | Controls cell padding. Named sizes map to a padding multiplier (`xs` 0.4, `sm` 0.6, `md` 1, `lg` 1.4, `xl` 1.6); a raw number is used as-is. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"default"` | Color token driving `thead`/`tfoot` background and text color (via `useColorTemplate`), and the zebra/hover ghost tint. |
| `variant` | `useBreakpointPropsType<Omit<UseColorTemplateType, "outline">>` | `"fill"` | Color-template variant (`"fill" \| "ghost" \| "text"`) applied to `thead`/`tfoot`. Note `"outline"` is excluded from `Table`'s type (unlike other components). |
| `borderType` | `useBreakpointPropsType<"box" \| "line" \| "none">` | `"line"` | `"line"` draws a bottom border under each cell; `"box"` draws a full border around every cell (with outer edges cleaned up so the table reads as one boxed grid); `"none"` removes cell borders entirely. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (note: its own `color` and `size` are redeclared, overriding the inherited `Tag` versions) — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Table, TableHead, TableBody, TableRow, TableCell } from "@xanui/ui";

<Table>
  <TableHead>
    <TableRow>
      <TableCell th>Name</TableCell>
      <TableCell th>Role</TableCell>
    </TableRow>
  </TableHead>
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
</Table>
```

### Full composed example (Table + TableHead + TableBody + TableFooter + TableRow + TableCell)

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
} from "@xanui/ui";

const invoices = [
  { id: 1, customer: "Alice", amount: "$400" },
  { id: 2, customer: "Bob", amount: "$850" },
];

<Table
  size="md"
  color="brand"
  variant="ghost"
  borderType="box"
  evenColor
>
  <TableHead>
    <TableRow>
      <TableCell th>ID</TableCell>
      <TableCell th>Customer</TableCell>
      <TableCell th>Amount</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {invoices.map((inv) => (
      <TableRow key={inv.id}>
        <TableCell>{inv.id}</TableCell>
        <TableCell>{inv.customer}</TableCell>
        <TableCell>{inv.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell th colSpan={2}>
        Total
      </TableCell>
      <TableCell th>$1,250</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

## Notes

- `Table` is the composition root for [TableHead](./TableHead.md), [TableBody](./TableBody.md), [TableFooter](./TableFooter.md), [TableRow](./TableRow.md), and [TableCell](./TableCell.md) — those components are purely structural and inherit all their visual styling (padding, borders, header/footer background, hover, zebra striping) from `Table`'s CSS.
- Internally wraps its `<table>` in a [Scrollbar](./Scrollbar.md) with `overflowY: hidden`, so wide tables scroll horizontally instead of breaking layout.
- `baseClass` is `"table"` (renders as class `xui-table`).
- For a higher-level, data-driven table with built-in pagination/sorting/filtering, see `Datatable` (documented separately), which likely composes `Table` and [TablePagination](./TablePagination.md) internally.
