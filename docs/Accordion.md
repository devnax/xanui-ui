# Accordion

A collapsible header/content panel — clicking the header (or an icon) toggles a `Collapse` region open and closed.

## Import

```tsx
import { Accordion } from "@xanui/ui";
```

## Overview

`Accordion` composes `List` + `ListItem` (for the header) with `Collapse` (for the content), and can run either controlled (`expand`) or uncontrolled (`defaultExpand`, with internal state). It registers with `useThemeComponent("Accordion", ...)` with defaults `{ color: "brand", variant: "ghost", onClick: () => toggle }`, so themes can globally restyle every `Accordion`. `title`, `subtitle`, icons, `color`, `variant`, `expandIconPlacement`, and `expandAction` all accept responsive (`useBreakpointPropsType`) values. The expand chevron rotates 180° via a CSS `transform` transition unless you supply your own `expandIcon`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `expand` | `boolean` | — | Controlled expanded state. When omitted, the component manages its own state internally. |
| `defaultExpand` | `boolean` | `false` | Initial expanded state for uncontrolled usage. |
| `onClick` | `() => void` | toggles internal state | Called when the header (or expand icon, depending on `expandAction`) is clicked. |
| `title` | `useBreakpointPropsType<ReactElement \| string>` | — | Header title content (rendered inside the `ListItem`). |
| `subtitle` | `useBreakpointPropsType<ReactElement \| string>` | — | Header subtitle, passed to `ListItem`'s `subtitle`. |
| `startIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon shown before the title. |
| `endIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon shown after the title. |
| `expandIcon` | `useBreakpointPropsType<ReactElement>` | chevron (`ExpandMore`, rotates 180°) | Custom expand indicator. When provided, it does not rotate automatically. |
| `expandIconPlacement` | `useBreakpointPropsType<"start" \| "end">` | `"end"` (via placement logic) | Whether the expand icon renders next to `startIcon` or `endIcon`. |
| `expandAction` | `useBreakpointPropsType<"header" \| "icon">` | header click toggles | When `"icon"`, only clicking the expand-icon container toggles the panel; the header itself becomes non-interactive (`cursor: initial`). |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Passed through to the header `List`'s `color`. |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"ghost"` | Passed through to the header `List`'s `variant`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Accordion } from "@xanui/ui";

<Accordion title="What is your refund policy?">
  We offer a 30-day money-back guarantee on all plans.
</Accordion>
```

### Controlled, with subtitle and custom icon placement

```tsx
import { useState } from "react";
import { Accordion } from "@xanui/ui";
import StarIcon from "@xanui/icons/Star";

function FAQItem() {
  const [expand, setExpand] = useState(false);

  return (
    <Accordion
      expand={expand}
      onClick={() => setExpand(!expand)}
      title="Premium support"
      subtitle="Included with Pro plans"
      startIcon={<StarIcon />}
      expandIconPlacement="start"
      color="accent"
      variant="fill"
    >
      Pro plan subscribers get priority email and chat support.
    </Accordion>
  );
}
```

## Slots

`slotProps` lets you reach into the internal parts:

| Slot | Target | Notes |
|---|---|---|
| `header` | The header `List` | Excludes `children`, `color`, `variant`, `hoverColor`, `hoverVariant`, `className`. |
| `headerContent` | The header `ListItem` | Excludes `children`, `subtitle`, `selected`, `startIcon`, `endIcon`, `onClick`, `className` (these are managed internally). |
| `collaps` | The `Collapse` wrapping the content | Excludes `children`, `open`. |
| `content` | The `Tag` wrapping `children` inside the collapse | Excludes `children`. |
| `expandIconContainer` | The `Tag` wrapping the expand icon | Excludes `children`, `className`. |

## Notes

- Internally composed from [`Collapse`](./Collapse.md), `List`, and `ListItem` — their behavior (e.g. `Collapse` animation) applies here too.
- `color`/`variant` here drive the header's `List` styling, not a `useColorTemplate` call directly on `Accordion` itself.
- Theming key: `"Accordion"` (via `useThemeComponent`).
