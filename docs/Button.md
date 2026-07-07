# Button

A clickable button with color/variant theming, size presets, start/end icons, a loading spinner overlay, and skeleton loading support.

## Import

```tsx
import { Button } from "@xanui/ui";
```

## Overview

`Button` renders a `Tag component="button"`, deriving its background/text/hover colors from `useColorTemplate(color, variant)`. It registers with `useThemeComponent("Button", ...)` with defaults `{ variant: "fill", color: "brand", corner: "rounded", size: "md" }`, so themes can restyle every button globally. All of `startIcon`, `endIcon`, `color`, `variant`, `corner`, `size`, and `direction` accept responsive (`useBreakpointPropsType`) values. When `loading` is true, the button is disabled and a `CircleProgress` overlay covers its content (children remain in the DOM but visually obscured). When `skeleton` is true, it renders a `Skeleton` sized/shaped to match the button instead of the real button.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `startIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon rendered before `children`. |
| `endIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon rendered after `children`. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Passed to `useColorTemplate`. |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"fill"` | Passed to `useColorTemplate` — `"fill"`, `"outline"`, `"ghost"`, or `"text"`. |
| `corner` | `useBreakpointPropsType<"square" \| "rounded" \| "circle">` | `"rounded"` | `"square"` → no radius; `"rounded"` → size-dependent radius (`0.6`–`1.2`); `"circle"` → `100%` radius. |
| `size` | `useBreakpointPropsType<"xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` | Controls height, padding, gap, font size, icon size, and loading-spinner size. |
| `direction` | `useBreakpointPropsType<"row" \| "column">` | `"row"` | `"column"` stacks icon/label vertically and drops the fixed height in favor of vertical padding. |
| `loading` | `boolean` | — | Disables the button and overlays a centered `CircleProgress`. |
| `skeleton` | `boolean` | — | Renders a `Skeleton` (sized/shaped like the button) instead of the button. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (`color`, `size`, `direction` are omitted/overridden from the base `TagProps`) — see [Core Concepts](./core-concepts.md). Note: `disabled` defaults to `loading ?? false` when not explicitly set.

## Examples

### Basic usage

```tsx
import { Button } from "@xanui/ui";

<Button onClick={() => console.log("clicked")}>Save changes</Button>
```

### Sizes, variants, icons, and loading state

```tsx
import { useState } from "react";
import { Button } from "@xanui/ui";
import SaveIcon from "@xanui/icons/Save";

function SaveButton() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button size="sm" color="accent" variant="outline">
        Cancel
      </Button>

      <Button
        size="lg"
        color="success"
        variant="fill"
        corner="circle"
        startIcon={<SaveIcon />}
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await fetch("/api/save", { method: "POST" });
          setLoading(false);
        }}
      >
        Save
      </Button>
    </>
  );
}
```

## Slots

| Slot | Target | Notes |
|---|---|---|
| `loading` | The `CircleProgress` shown while `loading` | `Omit<CircleProgressProps, "color" \| "hideTrack" \| "size">`. |
| `skeleton` | The `Skeleton` rendered when `skeleton` is true | `Omit<SkeletonProps, "height" \| "width" \| "loading" \| "children">`. |

## Notes

- Uses `useColorTemplate` for color/variant styling and supports skeleton loading — see [Core Concepts](./core-concepts.md).
- Theming key: `"Button"` (via `useThemeComponent`).
- Related components: `IconButton`, `ButtonGroup`, `CircleProgress`.
