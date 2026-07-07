# useClickOutside

A hook that returns a ref and invokes a callback whenever a `mousedown` occurs outside the referenced element.

> **This is an internal utility and is not currently exported from the `@xanui/ui` package root.** It is also not currently used anywhere else in this package's source — the `ClickOutside` component implements the same `mousedown`/`contains` logic inline rather than using this hook. It is documented here for contributors reading the source, but it is not part of the public API today.

## Import

```tsx
// Not exported from "@xanui/ui" — internal relative import only:
import { useClickOutside } from "../useClickOutside";
```

## Overview

Attach the returned ref to the element you want to treat as the "inside" boundary. On every `mousedown` anywhere in the document, the hook checks whether the click target is contained within that element; if not, it calls your `onClickOutside` callback. The document listener is added on mount and cleaned up on unmount (and re-attached if `onClickOutside` changes identity).

## Props / Signature

```tsx
function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void
): React.RefObject<T | null>
```

| Parameter / Return | Type | Description |
|---|---|---|
| `onClickOutside` | `() => void` | Called on any `mousedown` whose target is not contained within the ref'd element. Included in the effect's dependency array, so passing an inline arrow function re-subscribes the listener every render (an inline callback is not memoized by the hook itself). |
| **Returns** | `React.RefObject<T \| null>` | Attach this to the DOM element that defines the "inside" boundary. If the ref isn't attached yet (`ref.current` is `null`), the handler is a no-op for that event. |

## Examples

Close a custom dropdown when clicking elsewhere:

```tsx
import { useClickOutside } from "../useClickOutside";
import { useState } from "react";

const Dropdown = () => {
  const [open, setOpen] = useState(true);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  if (!open) return null;
  return <div ref={ref}>Dropdown content</div>;
};
```

Using a stable callback to avoid re-subscribing every render:

```tsx
import { useClickOutside } from "../useClickOutside";
import { useCallback, useState } from "react";

const [open, setOpen] = useState(true);
const close = useCallback(() => setOpen(false), []);
const ref = useClickOutside<HTMLElement>(close);
```

## Notes

- Internal-only: not exported from `src/index.tsx`, and not currently imported by any other file in `src/` — `ClickOutside` (`src/ClickOutside/index.tsx`) reimplements the same `document.addEventListener("mousedown", ...)` / `.contains()` check directly instead of using this hook.
- Uses `mousedown`, not `click` — the callback fires before a corresponding `mouseup`/`click` completes.
- No `capture` phase is used, and there's no allowance for excluding secondary elements (e.g. a trigger button) — for that, prefer the `ClickOutside` component, which has its own such support via `Portal`/target-based composition in this library's overlay components (`Menu`, etc.).
