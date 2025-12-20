# Scrollbar

`Scrollbar` wraps content with a custom-styled scroll container that exposes helper methods (`scrollTo`, `scrollToTop`, `scrollToBottom`) and emits scroll-end events.

## Basic Example

```tsx
import Scrollbar from '@xanui/ui/Scrollbar';

export default function BasicScrollbar() {
  return (
    <Scrollbar height={280} width={360} p={2} bgcolor="background.primary">
      <LongList />
    </Scrollbar>
  );
}
```

## Props

| Name          | Type                                       | Default                             | Description                                                        |
| ------------- | ------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------ |
| `thumbSize`   | `number`                                   | `10`                                | Thickness of the scrollbar track for both axes.                    |
| `thumbColor`  | `string`                                   | `var(--color-divider)`              | Color applied to the scroll thumb.                                 |
| `trackColor`  | `string`                                   | `var(--color-background-secondary)` | Background color beneath the thumb.                                |
| `onScrollEnd` | `(event: UIEvent<HTMLDivElement>) => void` | —                                   | Fires when the user reaches the bottom edge.                       |
| `children`    | `ReactNode`                                | —                                   | Content that should scroll.                                        |
| `...rest`     | `TagProps`                                 | —                                   | Layout, spacing, and native attributes forwarded to the container. |

## Usage Examples

### Scroll-to-bottom detection
Trigger data loading or analytic events once the scrollbar reaches the end.

```tsx
import Scrollbar from '@xanui/ui/Scrollbar';

export default function InfiniteList({ onReachEnd }: { onReachEnd: () => void }) {
  return (
    <Scrollbar height={320} onScrollEnd={onReachEnd} px={2} py={1} gap={1} display="flex" flexDirection="column">
      {/* list items */}
    </Scrollbar>
  );
}
```

### Programmatic scrolling
Use the exposed methods on the forwarded ref to jump to positions.

```tsx
import { useRef } from 'react';
import Scrollbar, { ScrollbarProps } from '@xanui/ui/Scrollbar';

export default function ScrollControls() {
  const ref = useRef<ScrollbarProps['ref']>(null);

  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => (ref as any).scrollToTop()}>Top</button>
        <button onClick={() => (ref as any).scrollToBottom()}>Bottom</button>
      </div>
      <Scrollbar ref={ref as any} height={240}>
        <LongContent />
      </Scrollbar>
    </>
  );
}
```

