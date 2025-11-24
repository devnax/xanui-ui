# Drawer

`Drawer` presents contextual navigation or content by sliding in from any screen edge. It can be controlled declaratively or opened imperatively through helper methods.

## Basic Example

Left-aligned drawer that closes when users click outside the panel.

```tsx
import { useState } from 'react';
import Drawer from '@xanui/ui/Drawer';

export default function BasicDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open menu</button>
      <Drawer open={open} placement="left" onClickOutside={() => setOpen(false)}>
        <nav>Navigation links</nav>
      </Drawer>
    </>
  );
}
```

## Props

| Name              | Type                                       | Default    | Description                                                |
| ----------------- | ------------------------------------------ | ---------- | ---------------------------------------------------------- |
| `placement`       | `'left' \| 'right' \| 'top' \| 'bottom'`   | `'left'`   | Edge of the viewport from which the drawer appears.        |
| `open`            | `boolean`                                  | `true`     | Controls whether the drawer is visible (controlled usage). |
| `size`            | `number \| 'small' \| 'medium' \| 'large'` | `'medium'` | Pixel width/height of the panel depending on placement.    |
| `onClickOutside`  | `() => void`                               | no-op      | Invoked when the backdrop is clicked.                      |
| `slotProps.root`  | `TagProps<'div'>`                          | —          | Overrides for the root flex container.                     |
| `slotProps.layer` | `LayerProps`                               | —          | Props passed down to the underlying `Layer`.               |
| `children`        | `ReactNode`                                | —          | Content rendered inside the drawer panel.                  |

## Usage Examples

### Imperative open/close helpers
Trigger a drawer without managing local state using the static helpers.

```tsx
import Drawer from '@xanui/ui/Drawer';

export function openSettingsDrawer() {
  Drawer.open(<div>Settings form</div>, { placement: 'right', size: 360 });
}

export function closeSettingsDrawer() {
  Drawer.close();
}
```

### Responsive sizing and placement
Swap the drawer side and width per breakpoint.

```tsx
import Drawer from '@xanui/ui/Drawer';

export default function ResponsiveDrawer({ open }: { open: boolean }) {
  return (
    <Drawer
      open={open}
      placement={{ xs: 'bottom', md: 'right' }}
      size={{ xs: 'large', md: 420 }}
    >
      <p>Responsive content goes here.</p>
    </Drawer>
  );
}
```
