# IconButton

A circular (by default) button sized to wrap a single icon, with the same color/variant theming as other interactive components.

## Import

```tsx
import { IconButton } from "@xanui/ui";
```

## Overview

`IconButton` renders a `<button>` `Tag` sized purely by its `size` prop (a fixed pixel number, or a `"xs"`–`"xl"` preset that maps to both a button size and a matching icon font-size). It uses `useColorTemplate(color, variant)` (see [Core Concepts](./core-concepts.md)) to derive background/text/hover styling from the `color` + `variant` pair, and `useCorner(corner)` to control the border radius (`square`, `rounded`, or `circle`). It reads defaults through `useThemeComponent("IconButton", props, {})`, so a theme can globally override `size`/`color`/`variant`/`corner` for every `IconButton`. `size`, `color`, `variant`, and `corner` all accept a responsive breakpoint object via `useBreakpointPropsType`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `useBreakpointPropsType<number \| "xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` | Button diameter. A named size (`xs`=24, `sm`=30, `md`=38, `lg`=46, `xl`=56 px, each with a matching icon font-size) or a raw pixel number (icon size then derives as `max(14, size * 0.46)`). |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Semantic color token passed to `useColorTemplate`. |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"text"` | Visual style (`fill`, `outline`, `ghost`, `text`) passed to `useColorTemplate`. |
| `corner` | `useBreakpointPropsType<"square" \| "rounded" \| "circle">` | `"circle"` | Corner rounding, via `useCorner`. |

Note: `IconButton` omits `color` and `size` from the inherited `TagProps` (`Omit<TagProps<T>, "color" | "size">`) and redefines them with the meanings above.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { IconButton } from "@xanui/ui";
import Close from "@xanui/icons/Close";

<IconButton onClick={() => console.log("clicked")}>
  <Close />
</IconButton>
```

### Sizes, colors, and variants

```tsx
import { IconButton } from "@xanui/ui";
import Delete from "@xanui/icons/Delete";

<>
  <IconButton size="sm" color="danger" variant="fill">
    <Delete />
  </IconButton>
  <IconButton size="lg" color="success" variant="outline" corner="rounded">
    <Delete />
  </IconButton>
  <IconButton size={{ xs: "sm", md: "xl" }} color="accent" variant="ghost" corner="square">
    <Delete />
  </IconButton>
</>
```

## Notes

- Renders `baseClass="icon-button"` on its root `Tag`.
- Registered under the `"IconButton"` key with `useThemeComponent`, so themes can globally set defaults for `size`/`color`/`variant`/`corner`.
- Custom `hover` styles passed via props are merged on top of the `useColorTemplate` hover styles rather than replacing them.
