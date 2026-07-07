# Datatable

A fully-featured, **controlled** data table: sortable/selectable columns, row actions, tabs, search, a `DataFilter`-powered filter drawer, pagination, and skeleton loading — all driven by a single `state` object and `onChange` callback.

## Import

```tsx
import { Datatable, type DatatableProps, type DatatableState } from "@xanui/ui";
```

## Overview

`Datatable` is built from several internal sub-parts — `TableHead` (header row, select-all checkbox, sort toggles), `Row` (per-row checkbox, cells, row-action menu), `Table`/`TableArea` (the actual `<table>`), `SelectedBox` (bulk-action bar shown once rows are selected), and `FilterBox` (tabs, search input, and a filter-icon button opening a `Drawer` with a [`DataFilter`](./DataFilter.md)) — composed inside a [`ViewBox`](./core-concepts.md). These are internal implementation details; the public surface is the props below.

**Datatable is a controlled component and does not filter, search, sort, or paginate your data itself.** You pass in `state` (page, search text, active tab, sort directions, filter values) and `rows`, and `Datatable` calls `onChange` with the *next* state whenever the user interacts (types in search, clicks a sort arrow, changes page, picks a filter, switches tab, (de)selects rows). It's your responsibility to derive the `rows` you pass in from that state (e.g. by re-querying an API or filtering an in-memory array) — `Datatable` only renders whatever `rows` you give it for the current render.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `DataTableDefaultRow[]` (`{ id?: number, [key: string]: any }[]`) | — | **Required.** The rows to render for the *current* page/filter/sort — already sliced/filtered/sorted by you according to `state`. |
| `columns` | `DatatableColumnType[]` | — | **Required.** `{ label: string, field?: string, sortable?: boolean, ...cellProps }[]` — `field` defaults to `label` if omitted; extra keys are passed through as `TagProps<"td">` (e.g. `width`, `textAlign`) on both header and body cells. |
| `tabs` | `DatatableTabsProps[]` (`{ label: string, value?: string }[]`) | — | Renders a `Tabs`/`Tab` row above the table; `state.tab` defaults to the first tab's `value` (or lowercased `label`). |
| `rowAction` | `(props: { row: DataTableDefaultRow \| null, state: DatatableState }) => DatatableRowActionType[]` | — | Returns the action buttons for a row's kebab menu (`row` is the raw row) or, when `row` is `null`, the bulk-action buttons shown in `SelectedBox` while rows are selected. `DatatableRowActionType` is `Omit<IconButtonProps, "children"> & { label: string, icon: ReactElement }`. |
| `renderRow` | `(row: DataTableDefaultRow, state: DatatableState) => DataTableDefaultRow` | — | Transforms a (deep-cloned) row before rendering — e.g. to format a value or wrap it in a custom element. Does not mutate your original `rows` array. |
| `disableRow` | `(row: DataTableDefaultRow, state: DatatableState) => boolean \| void` | — | Marks a row's checkbox/selection as disabled. |
| `pagination` | `{ total?: number; perpages?: number[] }` | `perpages: [30, 50, 100]` | `total` is the full record count (falls back to `rows.length` if omitted); `perpages` are the selectable page-size options. |
| `state` | `DatatableStatePartial` | `{}` | Controlled state: `{ selected?, selectAll?, pagination?, tab?, search?, sortable?, filters? }`. Any omitted field falls back to a sensible default (see [State shape](#state-shape)). |
| `onChange` | `(state: DatatableState) => void` | — | **Required in practice** — called with the full next state on every interaction. The prop is typed optional, but the implementation calls it unconditionally with no guard, so omitting it throws at runtime as soon as the user interacts with the table. |
| `filters` | `DataFilterOption[]` | — | Same shape as [`DataFilter`](./DataFilter.md)'s `options` — renders a filter-icon button that opens a right-hand `Drawer` containing a `DataFilter` bound to `state.filters`. |
| `fixedHeader` | `boolean` | `false` | Makes `<thead>` sticky (`position: sticky; top: 0`) within the scrollable body. |
| `hidePagination` | `boolean` | `false` | Hides the `TablePagination` footer. |
| `hideSearch` | `boolean` | `false` | Hides the search `Input`. |
| `hideCheckbox` | `boolean` | `false` | Hides the selection checkbox column entirely. |
| `skeleton` | `boolean \| number` | `false` | Loading placeholder mode. `true` renders a full page (`perpages[0]`) of skeleton rows; a number renders that many. Internally forces `hideCheckbox: true` and clears `rowAction` for the duration. |
| `compact` | `boolean` | `false` | Smaller row/checkbox sizing (`Table` size `"sm"` instead of `"md"`). |
| `slotProps` | `object` | — | See [Slots](#slots) below. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `ViewBoxProps`/`TagProps` (`children`, `rows`, and `onChange` are omitted from the inherited `ViewBoxProps` in favor of `Datatable`'s own) — see [Core Concepts](./core-concepts.md). Note that `Datatable` builds its own `startContent` internally (tabs/search/filters + the bulk-selection bar), so a `startContent` you pass through the inherited `ViewBoxProps` is overridden rather than merged.

### State shape

```ts
type DatatableState = {
  selected: number[];               // selected row ids
  selectAll: boolean;
  pagination: { page: number; perpage: number; from: number; to: number };
  tab: string;
  search: string;
  sortable: { [field: string]: "asc" | "desc" };
  filters: { [key: string]: any }; // matches DataFilter's value shape
};
```

## Examples

### Basic usage

```tsx
import { useState } from "react";
import { Datatable, type DatatableState } from "@xanui/ui";

const allRows = [
  { id: 1, name: "Ada Lovelace", role: "Engineer" },
  { id: 2, name: "Alan Turing", role: "Researcher" },
  // ...
];

function Example() {
  const [state, setState] = useState<Partial<DatatableState>>({});

  return (
    <Datatable
      rows={allRows}
      columns={[
        { label: "Name", field: "name", sortable: true },
        { label: "Role", field: "role" },
      ]}
      state={state}
      onChange={setState}
      pagination={{ total: allRows.length }}
    />
  );
}
```

### Tabs, search-driven filtering, row actions, and a filter drawer

```tsx
import { useMemo, useState } from "react";
import { Datatable, type DatatableState } from "@xanui/ui";
import EditOutlined from "@xanui/icons/EditOutlined";
import DeleteOutline from "@xanui/icons/DeleteOutline";

function Example({ allRows }: { allRows: any[] }) {
  const [state, setState] = useState<Partial<DatatableState>>({});

  // Consumer is responsible for deriving the visible rows from state:
  const rows = useMemo(() => {
    let r = allRows;
    if (state.tab) r = r.filter((row) => row.status === state.tab);
    if (state.search) {
      r = r.filter((row) =>
        row.name.toLowerCase().includes(state.search!.toLowerCase()),
      );
    }
    return r;
  }, [allRows, state.tab, state.search]);

  return (
    <Datatable
      rows={rows}
      columns={[
        { label: "Name", field: "name", sortable: true },
        { label: "Status", field: "status" },
      ]}
      tabs={[{ label: "Active", value: "active" }, { label: "Archived", value: "archived" }]}
      filters={[{ type: "text", key: "name", label: "Name" }]}
      rowAction={({ row, state }) =>
        row
          ? [
              { label: "Edit", icon: <EditOutlined />, onClick: () => console.log("edit", row.id) },
              { label: "Delete", icon: <DeleteOutline />, color: "danger", onClick: () => console.log("delete", row.id) },
            ]
          : [{ label: "Bulk delete", icon: <DeleteOutline />, onClick: () => console.log("delete", state.selected) }]
      }
      state={state}
      onChange={setState}
      pagination={{ total: rows.length, perpages: [10, 25, 50] }}
      fixedHeader
      compact
    />
  );
}
```

### Loading state

```tsx
<Datatable
  rows={[]}
  columns={[{ label: "Name" }, { label: "Role" }]}
  onChange={() => {}}
  skeleton // or e.g. skeleton={5} for a specific row count
/>
```

## Slots

| Slot | Target | Notes |
|---|---|---|
| `search` | The header search `Input` | Excludes `value`, `onChange` (bound to `state.search`). |
| `table` | The underlying `Table` | Excludes `children`. |
| `pagination` | The footer `TablePagination` | Full `TablePaginationProps` — merged over the props `Datatable` derives (`total`, `page`, `perpage`, `perpages`, `onChange`). |
| `scrollbar` | *(inherited from `ViewBox`)* the internal `Scrollbar` wrapping table content | Excludes `children`. |

## Notes

- **Not self-filtering:** as noted above, `rows` you pass in is rendered as-is — `state.search`, `state.tab`, `state.sortable`, and `state.filters` only tell you *what the user asked for*; applying them to your data source is up to you.
- **Falsy cell values render blank:** `Row` renders a cell's content only `if (row[field])` is truthy — a `0`, `false`, or `""` value in a row will show as an empty cell rather than the literal value. Format such values (e.g. via `renderRow`) into a truthy representation (like the string `"0"`) if you need them visible.
- **`rowAction` visibility-check quirk:** to decide whether to render the actions column at all, both `TableHead` and `Row` call `rowAction(rows[0])` directly (passing the raw first row as the argument) rather than the documented `{ row, state }` shape used for the actual per-row menu (`rowAction({ row: rawRow, state })`). If your `rowAction` implementation assumes it always receives `{ row, state }` and destructures eagerly, this preliminary check call will pass it a bare row object instead, which can behave unexpectedly (e.g. `row`/`state` being `undefined` inside that call). Guard defensively in `rowAction` if this matters for your use case.
- `renderRow` receives a `structuredClone` of each row, so any `ReactElement`/function values already on your rows won't survive being passed through `renderRow` in `structuredClone`-incompatible cases — keep row data plain/serializable if you rely on `renderRow`.
- Related: [`DataFilter`](./DataFilter.md) (used for `filters`), `Drawer` (hosts the filter panel), `TablePagination`, `Tabs`/`Tab`.
