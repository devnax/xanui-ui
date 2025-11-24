# TableRow

`TableRow` renders a `<tr>` element with XanUI styling props.

## Basic Example

```tsx
import TableRow from '@xanui/ui/TableRow';
import TableCell from '@xanui/ui/TableCell';

export default function UserRow({ user }) {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
    </TableRow>
  );
}
```

## Props

| Name        | Type               | Default | Description                                             |
| ----------- | ------------------ | ------- | ------------------------------------------------------- |
| `component` | `TagComponentType` | `'tr'`  | Underlying row element.                                 |
| `children`  | `ReactNode`        | —       | Cells within the row.                                   |
| `...rest`   | `TagProps<'tr'>`   | —       | Additional attributes (ARIA roles, hover styles, etc.). |

## Usage Tips
- Combine with `sx` to highlight selected rows or to add hover states.
- Supply `onClick` to make rows interactive in data tables.
