# TablePagination
Pagination control tailored for tables / datatables.

## Import
```tsx
import { TablePagination } from '@xanui/ui';
```

## Usage
```tsx
<TablePagination total={500} page={1} perpages={[10,25,50]} onChange={s => setState(s)} />
```

## Props
| Name          | Type                     | Description                   |
| ------------- | ------------------------ | ----------------------------- |
| total         | number                   | Total row count.              |
| page          | number                   | Current page index (1-based). |
| perpages      | number[]                 | Page size options.            |
| onChange      | ({page,perpage}) => void | Change handler.               |
| showFirstLast | boolean                  | Toggle first/last controls.   |
| showPerpage   | boolean                  | Toggle page size select.      |

## Best Practices
Keep perpage options limited; include 25 or 50 for large sets.
