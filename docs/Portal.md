# Portal

Renders its children into a detached DOM node (appended to `document.body` by default) while preserving the ambient theme context.

## Import

```tsx
import { Portal } from "@xanui/ui";
```

## Overview

`@xanui/ui`'s `Portal` is a **distinct component from `@xanui/core`'s `Portal`** — it does not wrap or re-export it. The core package's `Portal` is an SSR-safe component that accepts a `container` (an `HTMLElement` *or* a query-selector string) and auto-creates a `div` if none is given. This package's `Portal` instead:

- Always creates (or reuses a passed-in) `HTMLElement` container via `document.createElement("div")`, tagged with the class `xui-portal`, and appends it to `appendTo` (default `document.body`).
- Reads the current theme with `useTheme()` and re-wraps `children` in its own `<ThemeProvider theme={theme}>` — this is the key behavior: because a portaled subtree is rendered into a DOM node outside the normal React tree's parent element, wrapping it in the ambient theme ensures CSS variables/theme context still apply correctly.
- Removes the created container from the DOM on unmount.
- Is a client-only component (`"use client"`, and reads `document` directly at render time) — it is **not** SSR-safe on its own.

It is used internally by [`Menu`](./Menu.md) (via a `slotProps.portal` slot) to render dropdown/menu content outside normal DOM flow (avoiding clipping by `overflow: hidden` ancestors, z-index stacking issues, etc.), and is available directly for building custom overlay components.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content to render into the portal. |
| `appendTo` | `HTMLElement` | `document.body` | The parent DOM node the portal's container `div` is appended to. |
| `container` | `HTMLElement` | auto-created `div` | Use an existing DOM element as the portal target instead of creating a new one. |

`Portal` does **not** extend `TagProps` — it takes only the props above (it renders no `Tag` of its own; it hands `children` straight to `ReactDOM.createPortal`).

## Examples

### Basic usage

```tsx
import { Portal } from "@xanui/ui";

<div>
  <p>Rendered in place.</p>
  <Portal>
    <p>Rendered at the end of document.body.</p>
  </Portal>
</div>
```

### Custom target container

```tsx
import { Portal } from "@xanui/ui";
import { useRef } from "react";

const containerRef = useRef<HTMLDivElement>(null);

<div>
  <div id="overlay-root" ref={containerRef} />
  <Portal appendTo={containerRef.current!}>
    <div>Appended inside #overlay-root instead of document.body.</div>
  </Portal>
</div>
```

## Notes

- Not to be confused with `Portal` exported from `@xanui/core` — that one takes a `container` prop typed as `HTMLElement | string` and is SSR-safe; this one takes `appendTo`/`container` (both `HTMLElement` only) and re-applies the theme.
- Used internally by [Menu](./Menu.md)'s `slotProps.portal` to escape overflow/z-index constraints of the trigger's ancestors.
- Because it re-establishes a `ThemeProvider`, theme-scoped CSS variables continue to resolve correctly for portaled content even though it lives outside the normal DOM parent chain.
