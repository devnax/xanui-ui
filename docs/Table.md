# Table

`Table` wraps a semantic `<table>` inside a horizontal `Scrollbar`, providing theme-aware sections, zebra striping, and configurable borders.

## Basic Example

```tsx
import Table from '@xanui/ui/Table';
import TableHead from '@xanui/ui/TableHead';
import TableBody from '@xanui/ui/TableBody';
import TableRow from '@xanui/ui/TableRow';
import TableCell from '@xanui/ui/TableCell';

export default function BasicTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell th>ID</TableCell>
          <TableCell th>Name</TableCell>
          <TableCell th>Role</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>#1</TableCell>
          <TableCell>Ada Lovelace</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#2</TableCell>
          <TableCell>Alan Turing</TableCell>
          <TableCell>Researcher</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Props

| Name         | Type                                        | Default     | Description                                               |
| ------------ | ------------------------------------------- | ----------- | --------------------------------------------------------- |
| `size`       | `'small' \| 'medium' \| 'large' \| number`  | `'medium'`  | Controls padding and font sizing for cells.               |
| `color`      | `UseColorTemplateColor`                     | `'default'` | Applies theme colors to header/footer regions.            |
| `variant`    | `UseColorTemplateType` (except `'outline'`) | `'fill'`    | Determines how the color template is used.                |
| `borderType` | `'box' \| 'line' \| 'none'`                 | `'line'`    | Chooses between full grid borders, row dividers, or none. |
| `evenColor`  | `boolean`                                   | `false`     | Adds zebra striping to even rows.                         |
| `children`   | `ReactNode`                                 | —           | Table sections (`TableHead`, `TableBody`, etc.).          |
| `...rest`    | `TagProps<'table'>`                         | —           | Additional attributes merged onto the table element.      |

## Usage Examples

### Zebra striped table
Highlight alternating rows and soften borders for dense data.

```tsx
import Table from '@xanui/ui/Table';
// ...head/body imports

export default function ZebraTable() {
  return (
    <Table evenColor borderType="box" size="small">
      {/* head + body rows */}
    </Table>
  );
}
```

### Branded header table
Combine `color` and `variant` to brand table headers and hover states.

```tsx
import Table from '@xanui/ui/Table';

export default function ThemedTable() {
  return (
    <Table color="secondary" variant="alpha">
      {/* table sections */}
    </Table>
  );
}
```

