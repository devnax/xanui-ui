# Datatable
Feature-rich data presentation with selection, filtering, pagination.

## Import
```tsx
import { Datatable } from '@xanui/ui';
```

## Basic
```tsx
<Datatable
  rows={[{ id:1, name:'Alice' }]}
  columns={[{ label:'ID', field:'id' }, { label:'Name', field:'name' }]}
/>
```

## Props (core)
| Name                 | Type                                | Description                                               |
| -------------------- | ----------------------------------- | --------------------------------------------------------- |
| rows                 | DataTableDefaultRow[]               | Data records. Each may contain id.                        |
| columns              | ColumnType[]                        | Column definitions (label, field, plus TableColumnProps). |
| tabs                 | {label,value?}[]                    | Optional top tabs for segmentation.                       |
| defaultActiveTab     | string                              | Initial tab value.                                        |
| rowAction            | ({row,state}) => RowActionType[]    | Dynamic action buttons per row.                           |
| renderRow            | (row,state) => Row                  | Mutate/extend row before render.                          |
| disableRow           | (row,state) => boolean              | Disable selection for a row.                              |
| totalCount           | number                              | When using server pagination.                             |
| page                 | number                              | Initial page.                                             |
| perpages             | number[]                            | Page size options.                                        |
| getState             | (state) => void                     | Observe internal state.                                   |
| onSearch             | (text,state) => void                | Server search handler.                                    |
| onTabChange          | (tab,state) => void                 | Tab change callback.                                      |
| filters              | { [key:string]: DatatableFilter[] } | Filter groups.                                            |
| fixedHeader          | boolean                             | Stick header on scroll.                                   |
| disablePagination    | boolean                             | Hide pagination section.                                  |
| disableSearch        | boolean                             | Hide search input.                                        |
| disableSelect        | boolean                             | Remove selection feature.                                 |
| slotProps.search     | InputProps                          | Customize search input.                                   |
| slotProps.table      | TableProps                          | Pass-through to inner Table.                              |
| slotProps.pagination | TablePaginationProps                | Pagination overrides.                                     |

## Internal State
Expose with `getState` for integration.
```ts
state = {
  selectedIds: number[];
  selectAll: boolean;
  paginationState: { page, perpage };
  activeTab: string;
  search: string;
}
```

## Row Actions
```tsx
rowAction={({row}) => [
  { label:'Edit', icon:<EditIcon />, onClick:() => openEdit(row) }
]}
```

## Styling
Root class: `.datatable`
Sub-elements: `.datatable-header` etc.

## Best Practices
- For large datasets enable server pagination & search.
- Always supply stable numeric `id` for selection.
