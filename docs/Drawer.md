# Drawer

`Drawer` presents contextual navigation or content by sliding in from any screen edge. It wraps the panel with `ClickOutside` so `onClickOutside` fires automatically whenever users interact outside of the sheet.

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

| Name              | Type                                       | Default    | Description                                                                 |
| ----------------- | ------------------------------------------ | ---------- | --------------------------------------------------------------------------- |
| `open`            | `boolean`                                  | `false`    | Controls whether the drawer is visible (controlled usage).                  |
| `placement`       | `'left' \| 'right' \| 'top' \| 'bottom'`   | `'left'`   | Edge of the viewport from which the drawer appears.                         |
| `size`            | `number \| 'small' \| 'medium' \| 'large'` | `'medium'` | Width/height of the panel depending on placement (presets map to px sizes). |
| `onClickOutside`  | `() => void`                               | no-op      | Fired automatically via the embedded `ClickOutside` wrapper.                |
| `slotProps.root`  | `TagProps<'div'>`                          | —          | Styles for the flex container that positions the drawer.                    |
| `slotProps.layer` | `LayerProps`                               | —          | Pass props to the underlying `Layer` (blur, transition, z-index, etc.).     |
| `children`        | `ReactNode`                                | —          | Content rendered inside the drawer panel.                                   |

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
