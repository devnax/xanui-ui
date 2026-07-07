# Core Concepts (`@xanui/core`)

`@xanui/ui` components are built on top of [`@xanui/core`](https://github.com/devnax/xanui-core). Every component in this library ultimately renders a `Tag`, and most accept the same base set of styling/theming props. This page documents the shared concepts once so individual component docs can stay focused on what's unique to them.

## The `Tag` primitive

`Tag` is the base primitive every component in `@xanui/ui` renders internally. It accepts CSS properties directly as props instead of `className`s.

```tsx
import { Tag } from "@xanui/core";

<Tag component="button" p={2} bgcolor="brand.primary" radius="md" hover={{ bgcolor: "brand.secondary" }}>
  Click me
</Tag>
```

- `component` — the HTML tag or component to render (default `"div"`).
- Numeric spacing props (`p`, `m`, `px`, `py`, `gap`, etc.) are multiplied by 8 (an 8px grid), or accept a theme spacing scale key (`"xs"`–`"xl"`).
- Color props (`bgcolor`, `color`, `borderColor`, ...) accept theme color tokens (see **Color tokens** below).
- `sx` / `sxr` — escape hatches for arbitrary style objects. `sxr` is merged first (lowest priority), `sx` is merged last (highest priority).
- `hover` — a style object applied under `&:hover`.
- `theme` — scoped CSS variable overrides for a subtree.
- `baseClass` — prefixes a stable class name as `xui-{baseClass}`, used as a theming/styling hook.
- Most props accept a **responsive object** keyed by breakpoint, e.g. `width={{ xs: "100%", md: "50%" }}`.
- Append `!` to a value to force `!important` (e.g. `bgcolor="brand.primary!"`).

Because `@xanui/ui` components extend `TagProps`, they inherit all of the above (spacing, color, layout, `sx`/`sxr`, `hover`, responsive props) in addition to their own component-specific props, unless a doc says a prop is explicitly omitted.

## Theming

### `createTheme` / `ThemeProvider`

```tsx
import { createTheme, ThemeProvider } from "@xanui/core";

const theme = createTheme({
  mode: "light", // "light" | "dark"
  colors: {
    neutral: "Gray",
    brand: "#2563EB",
    accent: "#7C3AED",
  },
});

<ThemeProvider theme={theme} isRoot>
  <App />
</ThemeProvider>;
```

### Color tokens

Colors are referenced as strings using dot notation:

- Structural: `neutral.50`–`neutral.950`, `surface.primary|secondary`, `paper.primary|secondary`, `paper.ghost.primary|secondary`, `text.primary|secondary`, `divider.primary|secondary`
- Variant (semantic): `brand`, `accent`, `info`, `success`, `warning`, `danger` — each with `.primary`, `.secondary`, `.contrast`, `.ghost`, `.ghost.secondary`

Many components in `@xanui/ui` expose a `color` prop typed as `UseColorTemplateColor` (one of the variant colors above, plus `"default"`).

### `useColorTemplate(color, variant)`

Used internally by components like `Button`, `Chip`, `Badge`, `IconButton` to derive consistent styling from a `color` + `variant` pair. Returns `{ main, hover }` style objects.

`variant` (`UseColorTemplateType`) is one of:

| Variant | Effect |
|---|---|
| `fill` | Solid background in `{color}.primary`, contrast text, hover to `{color}.secondary` |
| `outline` | Transparent background, border in `{color}.primary` |
| `ghost` | Background in `{color}.ghost`, text in `{color}.primary`, hover to `{color}.ghost.secondary` |
| `text` | Transparent background/border, colored text only |

### `useThemeComponent(name, props, defaults)`

Merges the props a consumer passes with component defaults, then applies any theme-registered transform for that component name. This is how a theme can globally restyle every `Button`, `Input`, etc. without touching call sites. Components that use this hook document their registered `name` and default prop values.

## Responsive props

### `useBreakpointPropsType<T>`

A prop typed as `useBreakpointPropsType<T>` accepts either a plain value of type `T`, or a breakpoint-keyed object, e.g.:

```tsx
<Button size={{ xs: "sm", md: "lg" }} />
```

Default breakpoints: `xs: 0`, `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280` (mobile-first — a value applies at its breakpoint and above, until overridden by a larger one).

### `useBreakpoint()`

```tsx
const bp = useBreakpoint();
bp.value;            // current breakpoint key, e.g. "md"
bp.is("md");
bp.isUp("md");
bp.isDown("md");
bp.isOrUp("md");
bp.isOrDown("md");
bp.isBetween("sm", "lg");
```

## Slots (`slotProps`)

Many composite components (e.g. `Button`, `Datatable`, `Select`) expose a `slotProps` object so you can pass extra props to internal sub-parts (a loading spinner, a skeleton, an internal `Input`, etc.) without forking the component. Each component's doc lists its available slots.

## Skeleton loading

Components that support a `skeleton` prop render a `Skeleton` placeholder (matching their own sizing) instead of their normal content — useful for loading states without layout shift.

## Transitions

Overlay-style components (`Modal`, `Drawer`, `Menu`, `Tooltip`, `Collapse`, `Toast`, ...) use `@xanui/core`'s `Transition` component / `useTransition` hook internally for enter/exit animations. Built-in variants include `fade`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `zoom`, `zoomOver`, `grow`, `collapseVertical`, `collapseHorizontal`.

## Further reading

Full `@xanui/core` documentation: https://github.com/devnax/xanui-core
