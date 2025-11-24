# ViewBox

`ViewBox` is a flex container that reserves areas before and after the scrollable region, perfect for headers/footers or side rails. Content scrolls within an internal `Scrollbar`.

## Basic Example

```tsx
import ViewBox from '@xanui/ui/ViewBox';

export default function PanelView() {
  return (
    <ViewBox
      startContent={<header style={{ padding: 16 }}>Filters</header>}
      endContent={<footer style={{ padding: 16 }}>Summary</footer>}
      height={420}
    >
      <section style={{ padding: 16 }}>Scrollable body content...</section>
    </ViewBox>
  );
}
```

## Props

| Name                  | Type             | Default | Description                                                     |
| --------------------- | ---------------- | ------- | --------------------------------------------------------------- |
| `startContent`        | `ReactElement`   | —       | Content rendered before the scrollable region (top or left).    |
| `endContent`          | `ReactElement`   | —       | Content rendered after the scrollable region (bottom or right). |
| `horizental`          | `boolean`        | `false` | Switches layout to horizontal (left/right).                     |
| `slotProps.scrollbar` | `ScrollbarProps` | —       | Customizes the inner `Scrollbar`.                               |
| `children`            | `ReactNode`      | —       | Main scrollable content.                                        |
| `...rest`             | `TagProps`       | —       | Additional layout props applied to the root container.          |

## Usage Examples

### Horizontal view with sidebar
Turn on `horizental` to position start/end content beside the scrollable area.

```tsx
import ViewBox from '@xanui/ui/ViewBox';

export default function SidebarLayout() {
  return (
    <ViewBox horizental startContent={<nav>Menu</nav>} endContent={<aside>Summary</aside>}>
      <article>Long-form content lives here.</article>
    </ViewBox>
  );
}
```

### Custom scrollbar padding
Override the internal scrollbar styles via `slotProps`.

```tsx
import ViewBox from '@xanui/ui/ViewBox';

export default function RelaxedViewBox() {
  return (
    <ViewBox slotProps={{ scrollbar: { style: { padding: 24 } } }}>
      <div>Content with generous spacing.</div>
    </ViewBox>
  );
}
```
