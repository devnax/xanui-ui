# TableCell
Cell container within Table rows/head.

## Import
```tsx
import { TableCell } from '@xanui/ui';
```

## Usage
```tsx
<TableCell align="right">42</TableCell>
```

## Props (summary)
| Name     | Type      | Description   |
| -------- | --------- | ------------- |
| align    | 'left'    | 'center'      | 'right'      | Text alignment. |
| width    | number    | string        | Fixed width. |
| children | ReactNode | Cell content. |

## Best Practices
Keep numeric data right-aligned; textual left-aligned.
