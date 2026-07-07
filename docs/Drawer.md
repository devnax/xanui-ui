# Drawer

An overlay panel that slides in from an edge of the screen (left, right, top, or bottom).

## Import

```tsx
import { Drawer } from "@xanui/ui";
```

## Overview

`Drawer` is built on top of `Layer` (a full-viewport, fixed-position overlay with fade + blur support) and adds a sliding content panel positioned against one edge, plus an optional backdrop click-to-close behavior via `ClickOutside`. The slide direction is chosen automatically from `placement` (`fadeLeft`/`fadeRight`/`fadeUp`/`fadeDown` transition variants). `size` accepts either a raw pixel number or a named size (`xs`–`xl`, mapped to `220`–`620`px) and controls the panel's width (for `left`/`right`) or height (for `top`/`bottom`). Because it wraps `Layer`, it also inherits `Layer`'s `open`, `blur`/`blurMode`, `zIndex`, and enter/exit transition callbacks (minus `transition` and `slotProps`, which `Drawer` manages itself).

`Drawer` also exposes static helper methods for imperative, portal-rendered usage: `Drawer.open(children, props)` renders a drawer outside your component tree and returns `{ open, close }` controls; `Drawer.close()` unmounts it.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `placement` | `useBreakpointPropsType<"left" \| "right" \| "bottom" \| "top">` | `"left"` | Which edge the drawer slides in from. |
| `size` | `useBreakpointPropsType<number \| "xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` (360px) | Panel width (`left`/`right`) or height (`top`/`bottom`). Named sizes: `xs`=220, `sm`=280, `md`=360, `lg`=460, `xl`=620 (px). |
| `onClickOutside` | `() => void` | — | Called when the user clicks outside the drawer panel (on the backdrop). |
| `open` | `boolean` | — | *(inherited from `Layer`)* Whether the drawer is visible. |
| `slotProps` | `object` | — | See [Slots](#slots) below. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps`, plus `Layer`'s own props (`blur`, `blurMode`, `zIndex`, `onEnter`, `onEntered`, `onExit`, `onExited`) except `transition` and `slotProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (controlled)

```tsx
import { useState } from "react";
import { Drawer, Button, Text } from "@xanui/ui";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        open={open}
        placement="right"
        size="md"
        onClickOutside={() => setOpen(false)}
      >
        <Text p={2}>Drawer content goes here.</Text>
      </Drawer>
    </>
  );
}
```

### Imperative usage via `Drawer.open` / `Drawer.close`

```tsx
import { Drawer, Text, Button } from "@xanui/ui";

const controls = Drawer.open(
  <Text p={2}>Rendered outside the component tree.</Text>,
  { placement: "bottom", size: "sm" },
);

// later:
controls.open();
controls.close();
// or, to force-unmount any open imperative drawer:
Drawer.close();
```

## Slots

| Slot | Target | Notes |
|---|---|---|
| `layer` | The underlying `Layer` | `Partial<Omit<LayerProps, "children">>`; merged over the props `Drawer` derives (e.g. `transition`). |
| `root` | The outer full-viewport `Tag` (flex container positioning the panel) | `TagProps<"div">`. |
| `content` | The sliding panel `Tag` itself | `TagProps<"div">`. |
| `clickOutside` | The `ClickOutside` wrapper around the panel | Excludes `children` and `onClickOutside`. |

## Notes

- Built on [`Layer`](./core-concepts.md) (overlay/backdrop) and `ClickOutside`; `onClickOutside` on `Drawer` is wired straight into the internal `ClickOutside`.
- The panel background uses `surface.primary` with an `xl` shadow by default (overridable via `slotProps.content`).
- Related: `Modal` and `Menu` are other `Layer`-based overlay components in this library.
