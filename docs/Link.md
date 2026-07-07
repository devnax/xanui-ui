# Link

A styled anchor (or polymorphic) element with sensible defaults for underline behavior, external-link safety, and active/disabled states.

## Import

```tsx
import { Link } from "@xanui/ui";
```

## Overview

`Link` renders a `Tag` (defaulting to `component="a"`) with automatic handling for external URLs: if `external` isn't explicitly set, it's inferred from whether `href` starts with `http://`/`https://`, and when the link is external and `target="_blank"`, `rel` automatically defaults to `"noopener noreferrer"` (unless you pass your own `rel`). It also supports `isActive`/`isDisabled` flags that toggle `data-active`/`data-disabled` attributes and `aria-disabled`, useful for styling active nav links or disabled links via CSS without extra logic. Underline behavior is controlled declaratively via the `underline` prop rather than raw CSS.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `component` | `TagComponentType` | `"a"` | Element/component to render as. |
| `href` | `string` | — | Link target URL. |
| `target` | `React.HTMLAttributeAnchorTarget` | — | Anchor `target` attribute (e.g. `"_blank"`). Forced to `"_blank"` when the link is resolved as external. |
| `rel` | `string` | — | Anchor `rel` attribute. Auto-defaults to `"noopener noreferrer"` for external links opened in a new tab. |
| `underline` | `"none" \| "hover" \| "always"` | `"hover"` | Controls text-decoration: always on, never, or only on hover. |
| `external` | `boolean` | inferred from `href` | Forces external-link treatment (new-tab-safe `rel`). If omitted, inferred by testing `href` against `/^https?:\/\//`. |
| `isActive` | `boolean` | — | Marks the link as active; sets `data-active` attribute for styling. |
| `isDisabled` | `boolean` | — | Disables the link visually (cursor `not-allowed`, `opacity: 0.6`) and sets `aria-disabled`/`data-disabled`. Does not prevent navigation on its own. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Link } from "@xanui/ui";

<Link href="/about">About us</Link>
```

### External link, active nav item, and disabled state

```tsx
import { Link } from "@xanui/ui";

<Link href="https://example.com" target="_blank">
  Visit example.com
</Link>

<Link href="/dashboard" isActive underline="always">
  Dashboard
</Link>

<Link href="/settings" isDisabled>
  Settings (coming soon)
</Link>
```

## Notes

- `isDisabled` only sets attributes/styling — it does not remove `href` or block clicks/keyboard navigation, so pair it with your own click-guard if strict prevention is required.
- `component` can be swapped (e.g. to a router's `Link`) since it's forwarded straight to the underlying `Tag`.
- Focus styling includes a visible `outline` on `:focus-visible` using the `--color-primary` CSS variable.
