# RangeSlider

A draggable slider for picking a single numeric value or a range (two handles), built from plain `Tag` elements with custom pointer-drag logic (no native `<input type="range">`).

## Import

```tsx
import { RangeSlider } from "@xanui/ui";
```

## Overview

`RangeSlider` renders a track `Tag` plus one absolutely-positioned thumb `Tag` per value in its internal value array. Passing a single number (or `defaultValue`/`value` as a number) renders one thumb; passing an array of two numbers renders two thumbs and highlights the segment between the lowest and highest value (a true "range" slider). Dragging is implemented manually: `mousedown` on a thumb arms a ref-tracked "active handle," and global `mousemove`/`mouseup` listeners on `window` update that handle's value while the mouse is down. Clicking anywhere on the track jumps the *closest* thumb to that position. It supports both controlled (`value`) and uncontrolled (`defaultValue`) usage, `min`/`max`/`step` clamping, and a custom `thumbContent` renderer for labeling thumbs (e.g. showing the current value in a tooltip-like bubble).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| number[]` | — | Controlled value(s). A single number renders one thumb; an array renders one thumb per entry (e.g. `[20, 80]` for a range). |
| `defaultValue` | `number \| number[]` | `[min]` | Initial value(s) for uncontrolled usage. |
| `onChange` | `(value: number \| number[]) => void` | — | Called with the updated value(s) whenever a thumb moves (drag or click-to-jump). Returns a single number if there's one thumb, an array otherwise. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Increment values snap to. |
| `disabled` | `boolean` | — | Disables click/drag interaction and shows a `not-allowed` cursor. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Color token for the filled track segment and thumbs (resolves to `{color}.primary`). |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Preset controlling track thickness and default thumb size (`xs`: track 2px/thumb 8px, up to `xl`: track 16px/thumb 32px). |
| `thumbSize` | `number` | preset from `size` | Explicit thumb diameter in pixels, overriding the `size` preset. |
| `thumbContent` | `(props: { value: number }) => ReactElement` | — | Renders custom content inside each thumb; receives the thumb's position as a `value` (percentage 0–100, **not** the raw min/max-scaled value). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (single value)

```tsx
import { RangeSlider } from "@xanui/ui";
import { useState } from "react";

const [value, setValue] = useState(30);

<RangeSlider value={value} onChange={(v) => setValue(v as number)} />
```

### Range with two handles

```tsx
import { RangeSlider } from "@xanui/ui";
import { useState } from "react";

const [range, setRange] = useState<number[]>([20, 80]);

<RangeSlider
  value={range}
  onChange={(v) => setRange(v as number[])}
  min={0}
  max={100}
  step={5}
  color="success"
  size="md"
/>
```

### Custom thumb content

```tsx
import { RangeSlider } from "@xanui/ui";

<RangeSlider
  defaultValue={50}
  thumbSize={28}
  thumbContent={({ value }) => (
    <span style={{ fontSize: 10 }}>{Math.round(value)}</span>
  )}
/>
```

## Notes

- **Caveat in `thumbContent`**: the `value` passed to the renderer is the thumb's position as a **percentage** (0–100), not the actual scaled `min`–`max` value — compute the real value yourself from state if you need to display it.
- The registered theme name is `"RangeSlider"` via `useThemeComponent`.
- No keyboard interaction (arrow keys) is implemented — dragging/clicking with a mouse (or touch, if the browser maps touch to mouse events) is the only input method in the current source.
- There is no `orientation` prop — the slider is always horizontal.
