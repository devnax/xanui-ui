# Collapse

An animated vertical-collapse container — toggles its content between hidden (height `0`) and fully visible.

## Import

```tsx
// NOTE: the current published export name is "Collaps" (missing the final "e"),
// not "Collapse". This is very likely a typo in src/index.tsx, but it is the
// real name you must import today — `Collapse` does not exist as an export.
import { Collaps as Collapse } from "@xanui/ui";
```

> **Naming discrepancy:** the component's source folder and component name are `Collapse` (see `src/Collapse/index.tsx`), but `src/index.tsx` exports it as `export { default as Collaps } from "./Collapse"` — no `Collapse` export exists in the package today. Import it as `Collaps` (optionally aliasing it to `Collapse` locally, as above) until this is fixed upstream.

## Overview

`Collapse` wraps `@xanui/core`'s `Transition` component with the `collapseVertical` variant to animate content in and out of view, then renders an `overflow: hidden` `Tag` around the children. It's a low-level building block — [`Accordion`](./Accordion.md) is built on top of it for the common header/content pattern. Because it's a thin wrapper over `Transition`, it accepts (and forwards) most `TransitionProps` (minus `variant` and `children`, which are fixed/supplied internally).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Whether the content is expanded (visible) or collapsed. |
| `ease` | `TransitionProps["ease"]` | — | Easing curve forwarded to the underlying `Transition`. |
| `easing` | `TransitionProps["easing"]` | `"standard"` | Named easing preset forwarded to `Transition`. |
| `duration` | `TransitionProps["duration"]` | — | Animation duration forwarded to `Transition`. |
| `delay` | `TransitionProps["delay"]` | — | Animation delay forwarded to `Transition`. |
| `onStart` | `TransitionProps["onStart"]` | — | Called when the enter/exit transition starts. |
| `onFinish` | `TransitionProps["onFinish"]` | — | Called when the enter/exit transition finishes. |
| `onEnter` | `TransitionProps["onEnter"]` | — | Called when the enter transition starts. |
| `onEntered` | `TransitionProps["onEntered"]` | — | Called when the enter transition finishes. |
| `onExit` | `TransitionProps["onExit"]` | — | Called when the exit transition starts. |
| `onExited` | `TransitionProps["onExited"]` | — | Called when the exit transition finishes. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { useState } from "react";
import { Collaps as Collapse, Button } from "@xanui/ui";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Toggle</Button>
      <Collapse open={open}>
        <p>This content animates open and closed.</p>
      </Collapse>
    </>
  );
}
```

### With transition callbacks and custom duration

```tsx
import { Collaps as Collapse } from "@xanui/ui";

<Collapse
  open={isOpen}
  duration={400}
  easing="standard"
  onEntered={() => console.log("fully open")}
  onExited={() => console.log("fully closed")}
  bgcolor="paper.primary"
  radius="md"
>
  <div style={{ padding: 16 }}>Panel content</div>
</Collapse>
```

## Notes

- Uses `useThemeComponent("Collapse", ...)` internally, so a theme can register default props/behavior under the `"Collapse"` key even though the public export is misspelled `Collaps`.
- `initialTransition` is forced to `false` internally, so the very first render does not animate — it snaps directly to the `open` state.
- Renders `baseClass="collapse"` on its root `Tag` (correct spelling), useful as a CSS/theming hook regardless of the JS export name.
- See [`Accordion`](./Accordion.md) for a ready-made header + `Collapse` pattern, and [Core Concepts § Transitions](./core-concepts.md) for the list of built-in transition variants.
