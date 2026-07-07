# Text

A themed text/typography primitive for paragraphs and headings.

## Import

```tsx
import { Text } from "@xanui/ui";
```

## Overview

`Text` renders a `<p>` by default, applying `fontSize`, `lineHeight`, and `fontWeight` all derived from a single `variant` typography token, plus `text.primary` color. If `variant` is one of the heading tokens (`"h1"`–`"h6"`), `Text` automatically renders that heading element (`<h1>`–`<h6>`) instead of `<p>`. `variant` supports responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `useBreakpointPropsType<TypographyRefTypes>` (`"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"`) | `"md"` | Typography scale token. Drives `fontSize`, `lineHeight`, and `fontWeight` together. When it starts with `"h"`, the component tag renders as that heading element instead of `"p"`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Text } from "@xanui/ui";

<Text>Default body text (variant "md").</Text>
<Text color="text.secondary">Secondary supporting text.</Text>
```

### Headings and responsive sizing

```tsx
import { Text } from "@xanui/ui";

<Text variant="h2">Section title</Text>
<Text variant={{ xs: "sm", md: "lg" }}>
  Smaller on mobile, larger on desktop.
</Text>
```

## Notes

- `component` can still be overridden explicitly (e.g. `component="span"`) via `TagProps` — but note it's set before `...props` is spread, so an explicit `component` prop passed in overrides the `variant`-derived tag.
- `baseClass` is `"text"` (renders as class `xui-text`).
- Used internally by several components (e.g. [TablePagination](./TablePagination.md)) for small captions like "PER PAGE" and "of N" labels.
