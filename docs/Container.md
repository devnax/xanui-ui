# Container

A centered, max-width-constrained layout wrapper for page/section content.

## Import

```tsx
import { Container } from "@xanui/ui";
```

## Overview

`Container` centers its children horizontally (`mx: "auto"`), fills available width, and caps `max-width` at a named breakpoint size (`xs`, `sm`, `md`, or `lg`), reading the actual pixel value from the active theme's `breakpoints`. Below the chosen breakpoint the container is always full width (`100%`); at and above it, width is capped. It also applies a small default horizontal padding (`px: 2`). Use it as the outer wrapper for page content instead of hand-rolling `max-width` + `margin: auto` styles.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `maxWidth` | `useBreakpointPropsType<"lg" \| "md" \| "sm" \| "xs">` | `"lg"` | Named breakpoint key used to look up the theme's max-width value; the container stays `100%` wide below that breakpoint. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Container } from "@xanui/ui";

<Container>
  <h1>Page title</h1>
  <p>Body content constrained to the default "lg" max width.</p>
</Container>
```

### Custom / responsive max width

```tsx
import { Container } from "@xanui/ui";

<Container maxWidth="sm">
  <p>A narrower container, e.g. for a login form or article body.</p>
</Container>

// Responsive: narrower on small screens, wider from "md" up
<Container maxWidth={{ xs: "sm", md: "lg" }}>
  <p>Responsive max width.</p>
</Container>
```

## Notes

- `maxWidth` values map to the theme's `breakpoints` object (see [Core Concepts](./core-concepts.md) for the default breakpoint scale: `xs: 0`, `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`) — there is no `"xl"` option for `maxWidth` itself, only `xs`/`sm`/`md`/`lg`.
- Default padding (`px: 2`) and centering (`mx: auto`) are applied via `sxr`, so they can be overridden by passing your own `px`/`mx`/`sx`.
