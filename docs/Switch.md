# Switch

A toggle switch control, rendered as a track + sliding thumb over a visually-hidden native input.

## Import

```tsx
import { Switch } from "@xanui/ui";
```

## Overview

`Switch` renders three layered `Tag`s: an outer positioning wrapper, a track bar (`slotProps.track`) colored by `checked` state, and a circular thumb (`slotProps.thumb`) that translates across the track via CSS `transform` when toggled, plus a hidden (`display: none`) native `<input type="radio" readOnly>` carrying the actual `checked` value for form/ref purposes. Clicking anywhere in the outer wrapper (not just the thumb) toggles it. It supports both controlled (`checked`) and uncontrolled usage (internal `useState`, defaulting to `false`), and can render arbitrary content (e.g. a small icon) centered inside the thumb via the `icon` prop.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | internal `useState` (`false`) | Controlled checked state. |
| `onChange` | `(e: { target: { checked: boolean } }) => void` | toggles internal state | Change handler; receives a minimal synthetic-like event object, not a real `ChangeEvent`. |
| `size` | `useBreakpointPropsType<number \| "xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` (48px) | Overall switch width; height is always half of this. Named sizes map to `28/40/48/56/68` px. |
| `color` | `useBreakpointPropsType<Omit<UseColorTemplateColor, "default">>` | `"brand"` | Color token for the track when checked (`{color}.primary`); the unchecked track is always `paper.primary`. |
| `disabled` | `useBreakpointPropsType<boolean>` | — | Disables the click handler on the outer wrapper and is passed to the underlying `Tag`. |
| `trackSize` | `useBreakpointPropsType<number>` | `height + 6` | Track bar height in pixels. When it equals the default (`height + 6`), the thumb slides between 8%/92%; any custom `trackSize` widens the slide range to -10%/100% to keep the thumb flush against the track edges. |
| `icon` | `useBreakpointPropsType<ReactElement>` | — | Element rendered centered inside the thumb. |
| `slotProps` | `{ thumb?: TagProps; track?: TagProps }` | — | Per-part prop overrides. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps<"input">` (with `color`, `size`, `component`, `type`, `checked` omitted/replaced) — see [Core Concepts](./core-concepts.md).

## Slots

`slotProps` lets you pass extra props into the two internal parts:

| Slot | Type | Controls |
|---|---|---|
| `track` | `Omit<TagProps, "children">` | The background track bar `Tag`. |
| `thumb` | `Omit<TagProps, "children">` | The sliding circular thumb `Tag` (also hosts `icon`'s content). |

## Examples

### Basic usage (uncontrolled)

```tsx
import { Switch } from "@xanui/ui";

<Switch />
```

### Controlled, with size and color

```tsx
import { Switch } from "@xanui/ui";
import { useState } from "react";

const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  size="lg"
  color="success"
/>
```

### With an icon inside the thumb

```tsx
import { Switch } from "@xanui/ui";
import CheckIcon from "@xanui/icons/Check";
import { useState } from "react";

const [checked, setChecked] = useState(true);

<Switch
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  icon={<CheckIcon style={{ fontSize: 12 }} />}
/>
```

## Notes

- The hidden native input is `type="radio"` (not `"checkbox"`) in the current source — this appears to mirror `Checkbox`'s pattern but doesn't affect visible behavior since it's `readOnly` and hidden.
- The registered theme name is `"Switch"` via `useThemeComponent`.
- There is no `defaultChecked` prop — `Switch` only exposes `checked` (controlled); when `checked` is omitted it manages its own internal boolean state starting at `false`. To start pre-checked, drive it as controlled from a `useState(true)` as shown above.
