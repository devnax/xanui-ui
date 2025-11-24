# Datatable

`Datatable` renders tabular data with built-in selection, filters, search, pagination, row actions, and tab segmentation.

## Basic Example

Display a simple dataset with automatic pagination and selection.

```tsx
import Datatable from '@xanui/ui/Datatable';

const rows = [
  { id: 1, name: 'Alice', role: 'Designer' },
  { id: 2, name: 'Ben', role: 'Engineer' },
];

const columns = [
  { label: 'ID', field: 'id', width: 80 },
  { label: 'Name', field: 'name' },
  { label: 'Role', field: 'role' },
];

export default function BasicDatatable() {
  return <Datatable rows={rows} columns={columns} />;
}
```

## Props

| Name                   | Type                                     | Default             | Description                                                              |
| ---------------------- | ---------------------------------------- | ------------------- | ------------------------------------------------------------------------ |
| `rows`                 | `DataTableDefaultRow[]`                  | `[]`                | Array of data items. Provide a stable `id` for selection.                |
| `columns`              | `ColumnType[]`                           | `[]`                | Column descriptors (`label`, `field`, plus `TableColumnProps`).          |
| `tabs`                 | `{ label: string; value?: string }[]`    | —                   | Optional tab filters rendered above the header.                          |
| `defaultActiveTab`     | `string`                                 | first tab           | Sets the initially selected tab value.                                   |
| `rowAction`            | `({ row, state }) => RowActionType[]`    | —                   | Returns contextual action buttons for each row.                          |
| `renderRow`            | `(row, state) => Row`                    | identity            | Mutate or replace the default row render.                                |
| `disableRow`           | `(row, state) => boolean`                | `false`             | Skip selection for matching rows.                                        |
| `filters`              | `{ [group: string]: DatatableFilter[] }` | —                   | Declarative filter groups rendered above the table.                      |
| `totalCount`           | `number`                                 | `rows.length`       | Required when doing server-side pagination.                              |
| `page`                 | `number`                                 | `1`                 | Initial page index (1-based).                                            |
| `perpages`             | `number[]`                               | `[10, 25, 50, 100]` | Available page size options.                                             |
| `disablePagination`    | `boolean`                                | `false`             | Hides the pagination footer.                                             |
| `disableSearch`        | `boolean`                                | `false`             | Removes the search input.                                                |
| `disableSelect`        | `boolean`                                | `false`             | Turns off row selection checkboxes.                                      |
| `fixedHeader`          | `boolean`                                | `false`             | Makes the header sticky when the body scrolls.                           |
| `getState`             | `(state) => void`                        | —                   | Receives the internal selection/search/pagination state on every change. |
| `onSearch`             | `(text, state) => void`                  | —                   | Called when users type in the search box (use for server filtering).     |
| `onTabChange`          | `(tab, state) => void`                   | —                   | Notified when the active tab switches.                                   |
| `slotProps.search`     | `InputProps`                             | —                   | Customizes the search input.                                             |
| `slotProps.table`      | `TableProps`                             | —                   | Props forwarded to the internal `Table`.                                 |
| `slotProps.pagination` | `TablePaginationProps`                   | —                   | Overrides for the pagination controls.                                   |

## Usage Examples

### Server-powered search and pagination
Drive data from your API by listening to search and pagination state via `getState` and `onSearch`.

```tsx
import { useCallback, useMemo, useState } from 'react';
import Datatable from '@xanui/ui/Datatable';

export default function RemoteDatatable() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearch = useCallback(async (text, state) => {
    const { page, perpage } = state.paginationState;
    const response = await fetch(`/api/users?q=${text}&page=${page}&size=${perpage}`);
    const data = await response.json();
    setRows(data.items);
    setTotal(data.total);
  }, []);

  return (
    <Datatable
      rows={rows}
      columns={columns}
      totalCount={total}
      onSearch={handleSearch}
      getState={(state) => console.log('state changed', state)}
    />
  );
}
```

### Row actions and filters
Surface inline filters plus per-row actions for quick management workflows.

```tsx
import EditIcon from '@xanui/icons/Edit';
import DeleteIcon from '@xanui/icons/Delete';
import Datatable from '@xanui/ui/Datatable';

export default function ActionableDatatable() {
  return (
    <Datatable
      rows={rows}
      columns={columns}
      filters={{ status: [{ label: 'Active', value: 'active' }, { label: 'Pending', value: 'pending' }] }}
      rowAction={({ row }) => [
        { label: 'Edit', icon: <EditIcon />, onClick: () => editRow(row) },
        { label: 'Delete', icon: <DeleteIcon />, onClick: () => removeRow(row) },
      ]}
    />
  );
}
```
