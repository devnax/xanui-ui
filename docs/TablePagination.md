# TablePagination

A standalone pagination control (page navigation + per-page selector + "x-y of total" summary) typically used alongside a `Table`.

## Import

```tsx
import { TablePagination } from "@xanui/ui";
```

## Overview

`TablePagination` is a controlled component: you pass the current `page` and the `total` item count, and it computes page "chunks" (`from`/`to`/`page`/`perpage`) internally via `useMemo`. It renders (left to right) an optional per-page `Select`, a "`from`-`to` of `total`" summary built from [Text](./Text.md), and previous/next `IconButton`s — calling `onChange` with the new `TablePaginationState` whenever the user changes the page or the per-page count. It renders nothing (`<></>`) if `total` produces zero chunks.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | — (required) | The current 1-based page number. Falls back to chunk `1` if the given page doesn't exist. |
| `total` | `number` | — (required) | Total number of items across all pages. |
| `perpage` | `number` | first entry of `perpages` | Items per page. |
| `perpages` | `number[]` | `[30, 50, 100]` | Options shown in the per-page `Select`. The per-page selector is only rendered when `perpages` has at least one entry. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"default"` | Color token passed to the prev/next `IconButton`s. |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"fill"` | Color-template variant passed to the prev/next `IconButton`s. |
| `onChange` | `(state: TablePaginationState) => void` | `undefined` | Called with `{ page, perpage, from, to }` when the page changes (prev/next click) or the per-page value changes (in which case `page` resets to `1`). |
| `slotProps` | `{ button?: Omit<IconButtonProps, "children" \| "color" \| "variant">; select?: Omit<SelectProps, "value" \| "onChange" \| "children"> }` | `{}` | Extra props forwarded to the internal prev/next `IconButton`s and the per-page `Select`. |

`TablePaginationState` shape: `{ page: number; perpage: number; from: number; to: number }`.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (`children` and `onChange` are omitted/redeclared) — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { useState } from "react";
import { TablePagination, TablePaginationState } from "@xanui/ui";

function Example() {
  const [state, setState] = useState<TablePaginationState>({
    page: 1,
    perpage: 30,
    from: 1,
    to: 30,
  });

  return (
    <TablePagination
      page={state.page}
      total={128}
      perpage={state.perpage}
      onChange={setState}
    />
  );
}
```

### Custom per-page options and colored buttons

```tsx
import { useState } from "react";
import { TablePagination, TablePaginationState } from "@xanui/ui";

function Example() {
  const [state, setState] = useState<TablePaginationState>({
    page: 1,
    perpage: 10,
    from: 1,
    to: 10,
  });

  return (
    <TablePagination
      page={state.page}
      total={57}
      perpage={state.perpage}
      onChange={setState}
      color="brand"
      variant="ghost"
      slotProps={{
        select: { width: 90 },
      }}
    />
  );
}
```

## Slots

`TablePagination` exposes a `slotProps` object:

| Slot | Applies to | Notes |
|---|---|---|
| `button` | The previous and next `IconButton`s | `color` and `variant` are always driven by `TablePagination`'s own props (omitted from this slot's type), so only pass other `IconButtonProps` here (e.g. `size`, `sx`). |
| `select` | The per-page `Select` | `value`, `onChange`, and `children` are managed internally and omitted from this slot's type. |

## Notes

- Used alongside [Table](./Table.md) to paginate its rows; likely used internally by `Datatable` (documented separately) for its built-in pagination UI.
- The per-page `Select`/label row (`"PER PAGE"`) only renders when `perpages.length >= 1` — since the default `perpages` array is non-empty, it shows by default; pass `perpages={[]}` to hide it (though `perpage` still needs a value from a non-empty array to compute chunks correctly).
- `baseClass` is `"table-pagination"`, with the per-page group and navigation group tagged `"table-pagination-perpage"` and `"table-pagination-navigation"` respectively — useful theming/styling hooks.
- Uses `@xanui/icons`' `KeyboardArrowLeft`/`KeyboardArrowRight` icons for the prev/next buttons.
