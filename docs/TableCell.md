# TableCell

`TableCell` renders either a `<td>` or `<th>` element with XanUI styling hooks.

## Basic Example

```tsx
import TableCell from '@xanui/ui/TableCell';

export default function PriceCell() {
	return <TableCell sx={{ textAlign: 'right' }}>$128.00</TableCell>;
}
```

## Props

| Name        | Type               | Default | Description                                                       |
| ----------- | ------------------ | ------- | ----------------------------------------------------------------- |
| `th`        | `boolean`          | `false` | Renders a header cell (`<th>`) instead of `<td>`.                 |
| `component` | `TagComponentType` | `'td'`  | Override the underlying element.                                  |
| `children`  | `ReactNode`        | —       | Cell contents.                                                    |
| `...rest`   | `TagProps<'td'>`   | —       | Alignment, width, and other native attributes passed to the cell. |

## Usage Tips
- Apply `scope="col"` via `...rest` when the cell functions as a column header.
- Use `sx` or spacing props to align numeric content or clamp width.
