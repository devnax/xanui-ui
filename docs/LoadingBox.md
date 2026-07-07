# LoadingBox

Wraps any content and overlays a centered spinner (`CircleProgress`) on top of it while `loading` is true.

## Import

```tsx
import { LoadingBox } from "@xanui/ui";
```

## Overview

`LoadingBox` renders an `inline-block`, `overflow: hidden`, relatively-positioned `Tag` around its children. When `loading` is `true`, it stacks an absolutely-positioned overlay `Tag` (centered flex) containing a [`CircleProgress`](./CircleProgress.md) (with `hideTrack`) on top of the content, and marks the content wrapper `disabled` to prevent interaction underneath. It's useful for keeping a button, card, or form section visible but non-interactive/obscured while an async action runs, without unmounting it. Uses `useThemeComponent("LoadingBox", ...)` for theme-level defaults and `useBreakpointProps` so `color` accepts a responsive object.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `loading` | `boolean` | — | When `true`, renders the spinner overlay and disables the wrapped content. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Color passed to the internal `CircleProgress`. |
| `slotProps.CircleProgress` | `Omit<CircleProgressProps, "value">` | — | Extra props forwarded to the internal `CircleProgress` (e.g. size, thickness). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note `color` is re-typed here (omitted from base `TagProps`, redeclared as above).

## Examples

### Basic usage

```tsx
import { LoadingBox, Card, Text } from "@xanui/ui";
import { useState } from "react";

const [loading, setLoading] = useState(false);

<LoadingBox loading={loading}>
  <Card p={3}>
    <Text>This content stays visible but is obscured while loading.</Text>
  </Card>
</LoadingBox>
```

### Custom color and spinner size via slotProps

```tsx
import { LoadingBox, Button } from "@xanui/ui";

<LoadingBox loading={isSubmitting} color="success" slotProps={{ CircleProgress: { size: 32 } }}>
  <Button fullWidth>Submit</Button>
</LoadingBox>
```

## Slots

| Slot | Applies to | Purpose |
|---|---|---|
| `CircleProgress` | The internal spinner shown while `loading` | Pass any `CircleProgress` prop except `value` (e.g. `size`, `thickness`, `strokeWidth`). |

## Notes

- The wrapped children are rendered in a `Tag` with the `disabled` attribute set while `loading`, but this only affects elements that respect the HTML `disabled` attribute (e.g. `<button>`, `<input>`) — plain content is only visually obscured, not made non-interactive, unless it's itself a disable-aware control.
- Content does not unmount during loading, so layout doesn't shift when the state toggles.
- See [CircleProgress](./CircleProgress.md) for the spinner's own props.
