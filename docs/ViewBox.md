# ViewBox

A flex layout container with an optional fixed start/end section around a scrollable middle content area.

## Import

```tsx
import { ViewBox } from "@xanui/ui";
```

## Overview

`ViewBox` is a common "app shell" layout primitive: a header/sidebar (`startContent`) and footer/sidebar (`endContent`) that stay put, wrapped around a `Scrollbar`-scrollable content region in between. It can lay out vertically (`startContent` on top, `endContent` on bottom) or horizontally (`horizental` — side-by-side) by toggling the internal flex direction. It's a good fit for chat windows, panel layouts, or any "sticky top/bottom, scrollable middle" UI.

Like all components in this package, it renders a `Tag` and accepts every `TagProps` — see [Core Concepts](./core-concepts.md).

## Props / Signature

```tsx
type ViewBoxProps<T extends TagComponentType = "div"> = TagProps<T> & {
  startContent?: useBreakpointPropsType<ReactElement>;
  endContent?: useBreakpointPropsType<ReactElement>;
  horizental?: useBreakpointPropsType<boolean>;
  slotProps?: {
    scrollbar?: Omit<ScrollbarProps, "children">;
  };
};
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `startContent` | `useBreakpointPropsType<ReactElement>` | — | Content pinned before the scrollable area (top, or left when `horizental`). Rendered inside its own `Tag` (`baseClass="viewbox-start-content"`), only if truthy. |
| `endContent` | `useBreakpointPropsType<ReactElement>` | — | Content pinned after the scrollable area (bottom, or right when `horizental`). Rendered inside its own `Tag` (`baseClass="viewbox-end-content"`), only if truthy. |
| `horizental` | `useBreakpointPropsType<boolean>` | `false` | Note: spelled `horizental` (not `horizontal`) in source. When `true`, lays out `startContent` / scroll area / `endContent` in a row instead of a column. |
| `slotProps.scrollbar` | `Omit<ScrollbarProps, "children">` | — | Extra props for the internal `Scrollbar` wrapping `children`; its `sx` is merged with ViewBox's own default flex styling. |
| `children` | `ReactNode` | — | The scrollable content, rendered inside the internal `Scrollbar`. |

Also accepts every prop from `TagProps<T>` (spacing, color, `sx`/`sxr`, responsive props, etc.) — see [Core Concepts](./core-concepts.md). `ViewBox` also participates in `useThemeComponent` under the name `"ViewBox"`, so a theme can register global default props for it.

## Examples

Vertical layout with a header and footer around scrollable content:

```tsx
import { ViewBox, Text, Button } from "@xanui/ui";

<ViewBox height="100vh" startContent={<Text variant="lg">Chat</Text>} endContent={<Button fullWidth>Send</Button>}>
  {messages.map((m) => (
    <Text key={m.id}>{m.text}</Text>
  ))}
</ViewBox>
```

Horizontal layout (e.g. a sidebar + scrollable main area) with custom scrollbar props:

```tsx
import { ViewBox } from "@xanui/ui";

<ViewBox
  horizental
  width="100%"
  startContent={<SidebarNav />}
  slotProps={{ scrollbar: { sx: { px: 2 } } }}
>
  <MainPanelContent />
</ViewBox>
```

## Notes

- Public API — exported as `ViewBox` from `@xanui/ui`.
- Uses this package's `Scrollbar` component internally for the scrollable middle region (`className="viewbox-content"`).
- `startContent`/`endContent` wrapper `Tag`s use `flexBox` + `flexDirection` matching `horizental`, so multiple children passed as `startContent`/`endContent` (e.g. a `<>fragment</>`) lay out consistently with the overall orientation.
- Forwarded via `React.forwardRef`, so a `ref` reaches the outer `Tag`.
