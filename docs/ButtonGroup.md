# ButtonGroup

Groups a row of `Button` elements into a single visually-connected, bordered cluster.

## Import

```tsx
import { ButtonGroup } from "@xanui/ui";
```

## Overview

`ButtonGroup` clones each `Button` child and forces `flex: "0 0 auto"`, `minWidth: 0`, `corner: "square"`, plus the group's own `color`, `variant`, and `size` onto every child — so you don't set those props on each `Button` individually. It renders a bordered, `overflow: hidden` `Tag` and adds an internal divider (`borderRight`) between children via `sxr`. It's registered with `useThemeComponent("ButtonGroup", ...)` with defaults `{ size: "xs", variant: "outline", color: "default" }` (the component itself then falls back to `size: "md"`, `variant: "outline"`, `color: "default"` at render time). All three props (`color`, `variant`, `size`) accept responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactElement<ButtonProps> \| ReactElement<ButtonProps>[]` | — | One or more `Button` elements; each is cloned with group-level `color`, `variant`, `size`, `corner="square"`, `flex: "0 0 auto"`, `minWidth: 0`. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"default"` | Applied to every child `Button`. Also controls the group's own border color (`"default"` → `paper.secondary`, otherwise `` `${color}.secondary` ``). |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"outline"` | Applied to every child `Button` (`"fill" \| "outline" \| "ghost" \| "text"`). |
| `size` | `useBreakpointPropsType<"xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` | Applied to every child `Button` and also sets the group's own height (`xs`=30, `sm`=38, `md`=46, `lg`=52, `xl`=60). |

Note: `size` is otherwise typed on `TagProps` as a CSS-style value, but `ButtonGroup` omits it and re-types it as one of the fixed size keys above.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { ButtonGroup, Button } from "@xanui/ui";

<ButtonGroup>
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
</ButtonGroup>
```

### Color, variant and size

```tsx
import { ButtonGroup, Button } from "@xanui/ui";

<ButtonGroup color="brand" variant="fill" size="lg">
  <Button onClick={() => console.log("left")}>Left</Button>
  <Button onClick={() => console.log("center")}>Center</Button>
  <Button onClick={() => console.log("right")}>Right</Button>
</ButtonGroup>
```

### Responsive size

```tsx
<ButtonGroup size={{ xs: "xs", md: "md", lg: "lg" }} color="accent">
  <Button>A</Button>
  <Button>B</Button>
</ButtonGroup>
```

## Notes

- `ButtonGroup` only clones direct `ReactElement<ButtonProps>` children — non-`Button` children (or fragments/arrays wrapping them) won't receive the injected props correctly.
- Border color and the inter-button divider come from the same `color` value, so a `"default"` group is bordered with `paper.secondary`.
- See [Button](./Button.md) for the full set of props each cloned child ultimately receives.
