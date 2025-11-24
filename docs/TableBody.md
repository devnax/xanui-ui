# TableBody

`TableBody` renders the `<tbody>` section of a XanUI `Table`, forwarding all native attributes for accessibility and styling.

## Basic Example

```tsx
import TableBody from '@xanui/ui/TableBody';
import TableRow from '@xanui/ui/TableRow';
import TableCell from '@xanui/ui/TableCell';

export default function OrdersBody() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>#1012</TableCell>
        <TableCell>Completed</TableCell>
        <TableCell>$240</TableCell>
      </TableRow>
    </TableBody>
  );
}
```

## Props

| Name        | Type                | Default   | Description                                |
| ----------- | ------------------- | --------- | ------------------------------------------ |
| `component` | `TagComponentType`  | `'tbody'` | Underlying DOM node.                       |
| `children`  | `ReactNode`         | —         | Table rows within the body.                |
| `...rest`   | `TagProps<'tbody'>` | —         | Any other HTML attributes or system props. |

## Usage Tips
- Apply ARIA roles or `data-*` attributes via `...rest` when hooking into automation.
- Pair with `TableHead`/`TableFooter` to keep table semantics intact.
