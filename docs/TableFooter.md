# TableFooter

`TableFooter` renders the `<tfoot>` section of a table and is ideal for summary rows or pagination controls.

## Basic Example

```tsx
import TableFooter from '@xanui/ui/TableFooter';
import TableRow from '@xanui/ui/TableRow';
import TableCell from '@xanui/ui/TableCell';

export default function SummaryFooter() {
  return (
    <TableFooter>
      <TableRow>
        <TableCell th>Total</TableCell>
        <TableCell colSpan={2} sx={{ textAlign: 'right' }}>
          $4,200
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
```

## Props

| Name        | Type                | Default   | Description                                  |
| ----------- | ------------------- | --------- | -------------------------------------------- |
| `component` | `TagComponentType`  | `'tfoot'` | Underlying DOM node rendered.                |
| `children`  | `ReactNode`         | —         | Footer rows.                                 |
| `...rest`   | `TagProps<'tfoot'>` | —         | Additional HTML attributes or styling hooks. |

## Usage Tips
- Place pagination controls or totals inside `TableFooter` to keep semantics intact.
- Use `colSpan` on `TableCell` children to span across multiple columns.
