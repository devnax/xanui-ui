# ClickOutside

Detects mouse clicks (`mousedown`) outside of its single child and invokes a callback.

## Import

```tsx
import { ClickOutside } from "@xanui/ui";
```

## Overview

`ClickOutside` wraps a single child element in an inline-block `Tag` (`component="div"` by default) and attaches a document-level `mousedown` listener. If the click target isn't contained within the wrapped element, `onClickOutside` fires. It's commonly used to close popovers, dropdowns, and menus (`CalendarInput`, for example, wraps its `Calendar` popup in `ClickOutside`). It does not use `useThemeComponent` or `useColorTemplate` — it's a plain behavioral wrapper.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onClickOutside` | `(e: MouseEvent) => void` | — | **Required.** Called on any `mousedown` whose target is not inside the wrapped child. |
| `children` | `React.ReactElement` | — | **Required.** A single element to monitor; internally ref-merged so the click boundary matches its DOM node. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { ClickOutside } from "@xanui/ui";
import { useState } from "react";

const [open, setOpen] = useState(true);

{open && (
  <ClickOutside onClickOutside={() => setOpen(false)}>
    <div style={{ padding: 16, border: "1px solid #ccc" }}>
      Click anywhere outside to close me.
    </div>
  </ClickOutside>
)}
```

### Closing a custom dropdown

```tsx
import { ClickOutside, Card, Text } from "@xanui/ui";
import { useState } from "react";

const [open, setOpen] = useState(false);

<div style={{ position: "relative" }}>
  <button onClick={() => setOpen((o) => !o)}>Toggle</button>
  {open && (
    <ClickOutside onClickOutside={() => setOpen(false)}>
      <Card sx={{ position: "absolute", top: 40 }}>
        <Text>Dropdown content</Text>
      </Card>
    </ClickOutside>
  )}
</div>
```

## Notes

- The listener is attached on `mousedown`, not `click` — it fires before a subsequent `click` on an outside element completes.
- Forwards a `ref`, merged internally with its own tracking ref via `useMergeRefs`, so parents can still access the wrapped DOM node.
- Used internally by [CalendarInput](./CalendarInput.md) to dismiss its calendar popup.
