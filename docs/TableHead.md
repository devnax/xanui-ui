# TableHead

`TableHead` renders the `<thead>` portion of a table and is typically used for column labels.

## Basic Example

```tsx
import TableHead from '@xanui/ui/TableHead';
import TableRow from '@xanui/ui/TableRow';
import TableCell from '@xanui/ui/TableCell';

export default function OrdersHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell th scope="col">Order #</TableCell>
                <TableCell th scope="col">Customer</TableCell>
                <TableCell th scope="col">Status</TableCell>
            </TableRow>
        </TableHead>
    );
}
```

## Props

| Name        | Type                | Default   | Description                             |
| ----------- | ------------------- | --------- | --------------------------------------- |
| `component` | `TagComponentType`  | `'thead'` | Underlying element for the head region. |
| `children`  | `ReactNode`         | —         | Header rows.                            |
| `...rest`   | `TagProps<'thead'>` | —         | Additional HTML or styling props.       |

## Usage Tips
- Add `scope="col"` to header `TableCell` elements for better accessibility.
- Combine with `TableSortLabel` or icons to show sortable states.
