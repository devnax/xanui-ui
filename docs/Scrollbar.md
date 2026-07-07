# Scrollbar

A scrollable `Tag` container with a customizable (WebKit) scrollbar appearance and imperative scroll controls.

## Import

```tsx
import { Scrollbar } from "@xanui/ui";
```

## Overview

`Scrollbar` renders a `Tag` (default full width/height, `overflow: auto`) and injects `::-webkit-scrollbar`/`::-webkit-scrollbar-thumb`/`::-webkit-scrollbar-track` styles via `sxr` to control scrollbar `size`, `thumbColor`, and `trackColor` — note these only take visual effect in WebKit-based browsers (Chrome, Edge, Safari); other browsers fall back to their native scrollbar. It exposes an imperative handle via `ref` (`scrollTo`, `scrollToTop`, `scrollToBottom`, all smooth-scrolling) using `useImperativeHandle`, and an `onScrollEnd` convenience callback that fires when the user has scrolled to (within 1px of) the bottom, in addition to the normal `onScroll` handler which is composed rather than overwritten.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `6` | Scrollbar width/height in pixels (`::-webkit-scrollbar`). |
| `thumbColor` | `TagProps["color"]` | — | Color of the scrollbar thumb. When set, also adds a hover rule that fades the thumb to transparent (`opacity: 0`) on hover — this is the source's actual (likely unintended) behavior, not a highlight-on-hover effect. |
| `trackColor` | `TagProps["color"]` | — | Color of the scrollbar track. |
| `onScrollEnd` | `(e: UIEvent<HTMLDivElement>) => void` | — | Called on scroll events where the container has reached its bottom (`scrollHeight - scrollTop <= clientHeight + 1`). |
| `children` | `ReactNode` | — | Scrollable content. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note `onScroll` (a standard `Tag`/DOM prop) is also supported and is composed with `onScrollEnd` rather than replaced.

## Imperative handle (`ref`)

```ts
type ScrollbarHandle = {
  scrollTo: (pos: number) => void;      // scrollTop, smooth
  scrollToBottom: () => void;           // smooth scroll to scrollHeight
  scrollToTop: () => void;              // smooth scroll to 0
};
```

## Examples

### Basic usage

```tsx
import { Scrollbar } from "@xanui/ui";

<Scrollbar height={300} size={8} thumbColor="neutral.400">
  <div style={{ height: 1000 }}>Long content...</div>
</Scrollbar>
```

### Imperative scroll control + infinite-scroll style loading

```tsx
import { Scrollbar, ScrollbarHandle } from "@xanui/ui";
import { useRef } from "react";

const ref = useRef<ScrollbarHandle>(null);

<>
  <button onClick={() => ref.current?.scrollToBottom()}>Jump to bottom</button>
  <Scrollbar
    ref={ref}
    height={400}
    onScrollEnd={() => console.log("reached bottom — load more")}
  >
    <div style={{ height: 2000 }}>Feed content...</div>
  </Scrollbar>
</>
```

## Notes

- Custom scrollbar styling (`size`, `thumbColor`, `trackColor`) only applies in WebKit-based browsers; Firefox and other engines will show their default scrollbar.
- `baseClass="scrollbar"` is applied for theming/CSS hooks.
- The registered theme name is `"Scrollbar"` via `useThemeComponent`.
