# TablePagination

`TablePagination` renders a compact pager with previous/next buttons and an optional per-page selector for tables.

## Basic Example

```tsx
import { useState } from 'react';
import TablePagination from '@xanui/ui/TablePagination';

export default function BasicPagination() {
	const [state, setState] = useState({ page: 1, perpage: 30, from: 1, to: 30 });

	return (
		<TablePagination
			total={240}
			page={state.page}
			perpages={[10, 30, 50]}
			onChange={(next) => setState(next)}
		/>
	);
}
```

## Props

| Name               | Type                                    | Default         | Description                                                               |
| ------------------ | --------------------------------------- | --------------- | ------------------------------------------------------------------------- |
| `page`             | `number`                                | —               | Current 1-based page index.                                               |
| `total`            | `number`                                | —               | Total number of rows in the dataset.                                      |
| `perpages`         | `number[]`                              | `[30, 50, 100]` | Available page-size options; first item seeds the initial per-page value. |
| `color`            | `UseColorTemplateColor`                 | `'default'`     | Color for navigation buttons.                                             |
| `variant`          | `UseColorTemplateType`                  | `'fill'`        | Button variant for navigation controls.                                   |
| `onChange`         | `({ page, perpage, from, to }) => void` | —               | Fired when page or per-page changes.                                      |
| `slotProps.button` | `IconButtonProps`                       | —               | Props merged into the prev/next buttons.                                  |
| `slotProps.select` | `SelectProps`                           | —               | Props merged into the per-page select control.                            |
| `...rest`          | `TagProps`                              | —               | Layout props applied to the pagination wrapper.                           |

## Usage Examples

### Pagination with hidden per-page chooser
Omit or pass an empty `perpages` array to lock the page size.

```tsx
import TablePagination from '@xanui/ui/TablePagination';

export default function FixedSizePager({ page, onChange }: { page: number; onChange: TablePaginationProps['onChange'] }) {
	return <TablePagination total={500} page={page} perpages={[]} onChange={onChange} />;
}
```

### Custom button styling
Leverage `slotProps.button` to match brand guidelines.

```tsx
import TablePagination from '@xanui/ui/TablePagination';

export default function OutlinedPager(props) {
	return (
		<TablePagination
			{...props}
			color="primary"
			variant="outline"
			slotProps={{ button: { radius: 2, size: 36 } }}
		/>
	);
}
```
