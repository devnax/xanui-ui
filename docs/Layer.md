# Layer

A fixed, full-viewport overlay layer with built-in enter/exit transitions, optional blur backdrop, and click-outside dismissal — the low-level building block behind overlay components like modals/drawers.

## Import

```tsx
import { Layer } from "@xanui/ui";
```

## Overview

`Layer` renders a `position: fixed` `Tag` covering the full viewport (`top/left/bottom/right: 0`), stacked at `1500 + zIndex`. The overlay itself fades in/out (`Transition` with `variant="fade"`, `easing="smooth"`), and wraps `children` in a second `Transition` (default `variant="zoomOver"`) that only unmounts (`onExited`) once both transitions finish. If `blur` is set, a backdrop blur (or a flat `paper.ghost.primary` background when `blurMode="transparent"`, or on browsers without `backdropFilter` support) is applied via the internal `useBlurCss` hook. If `onClickOutside` is provided, `children` are wrapped in [`ClickOutside`](./ClickOutside.md) so clicks outside the content dismiss the layer. Props resolve through `useThemeComponent("Layer", props, {})`. Beyond the component form, `Layer.open(children, props)` provides an imperative API that mounts a `Layer` instance via `Renderar` without needing it in your JSX tree.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | **Required.** Whether the layer is shown. Toggling triggers the enter/exit transitions; the layer only unmounts its content after the exit transition finishes. |
| `children` | `ReactNode` | — | **Required.** Overlay content. |
| `transition` | `TransitionProps["variant"]` | `"zoomOver"` | Transition variant used for the content (the backdrop itself always uses `"fade"`). |
| `zIndex` | `number` | `0` | Added to the base `z-index` of `1500`. |
| `blur` | `useBreakpointPropsType<number>` | — | Backdrop blur intensity (`0`-`100`, mapped to `0`–`10px` of `backdrop-filter: blur`). |
| `blurMode` | `useBreakpointPropsType<"blur" \| "transparent">` | — | Forces a flat translucent background (`"transparent"`) instead of an actual blur, regardless of browser support. |
| `onClickOutside` | `() => void` | — | When set, wraps `children` in [`ClickOutside`](./ClickOutside.md) so clicking outside of it fires this callback. |
| `onEnter` / `onEntered` / `onExit` / `onExited` | `TransitionProps["onEnter"\|"onEntered"\|"onExit"\|"onExited"]` | — | Lifecycle callbacks for the content transition. |
| `slotProps` | see [Slots](#slots) | — | Extra props merged into internal sub-parts. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (component form)

```tsx
import { useState } from "react";
import { Layer, Button, Card } from "@xanui/ui";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open overlay</Button>
      <Layer open={open} onClickOutside={() => setOpen(false)} blur={40}>
        <Card sx={{ maxWidth: 400, margin: "10vh auto" }}>
          Overlay content
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Card>
      </Layer>
    </>
  );
}
```

### Imperative API

```tsx
import { Layer, Button, Card } from "@xanui/ui";

const instance = Layer.open(
  ({ close }) => (
    <Card sx={{ maxWidth: 400, margin: "10vh auto" }}>
      Imperatively opened content
      <Button onClick={() => close()}>Close</Button>
    </Card>
  ),
  { transition: "slideUp", blur: 30, onClickOutside: () => instance.close() }
);

// later, from anywhere:
instance.close();
```

## Slots

| Slot | Controls |
|---|---|
| `root` | The fixed, full-viewport `Tag` (`baseClass="layer"`). |
| `transition` | Props forwarded to the inner content `Transition` (e.g. `duration`, `delay`, `easing`) — `duration`/`delay` here also apply to the outer fade transition. |
| `clickOutside` | Props forwarded to the internal [`ClickOutside`](./ClickOutside.md) wrapper, only rendered when `onClickOutside` is set. |

Note: a `content` key is declared in the `slotProps` type but is not currently wired up anywhere in the implementation — passing it has no effect.

## Notes

- Renders `baseClass="layer"` on the root `Tag`.
- `Layer.open(children, props)` is a static imperative helper: `children` can be a `ReactNode` or a render function receiving `{ open, close }`, and it mounts/unmounts the layer via `Renderar` (outside your component tree) — useful for confirm dialogs or toasts triggered from non-component code.
- The outer backdrop fade transition forces `initialTransition={false}` and `exitOnUnmount`, so it never animates on first mount and is removed from the DOM only after fully exiting.
- See [Core Concepts § Transitions](./core-concepts.md) for the full list of built-in transition variants.
