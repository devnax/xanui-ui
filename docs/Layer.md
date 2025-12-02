# Layer

`Layer` is the primitive overlay engine used by `Modal`, `Drawer`, and other surfaces. It renders content inside a fixed container with a configurable blur, transition, and click-outside handling.

## Basic Example

Render custom overlay content with fade and blur while controlling visibility via local state.

```tsx
import { useState } from 'react';
import Layer from '@xanui/ui/Layer';

export default function BasicLayer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Layer</button>
      <Layer open={open} blur={40} blurMode="blur" onClickOutside={() => setOpen(false)}>
        <div className="overlay-card">Hello from Layer</div>
      </Layer>
    </>
  );
}
```

## Props

| Name                   | Type                                         | Default      | Description                                                                   |
| ---------------------- | -------------------------------------------- | ------------ | ----------------------------------------------------------------------------- |
| `open`                 | `boolean`                                    | `false`      | Controls whether the overlay is mounted and animated in.                      |
| `transition`           | `TransitionProps['variant']`                 | `'zoomOver'` | Variant passed to the inner `Transition`.                                     |
| `blur`                 | `number`                                     | `0`          | Amount of backdrop blur/overlay opacity.                                      |
| `blurMode`             | `'blur' \| 'transparent'`                    | `'blur'`     | Determines whether a CSS blur is used or a translucent background is applied. |
| `zIndex`               | `number`                                     | `0`          | Offset added to the base Layer z-index (1500).                                |
| `onClickOutside`       | `() => void`                                 | —            | Called when users click outside the rendered children.                        |
| `onOpen` / `onOpened`  | `() => void`                                 | —            | Lifecycle hooks triggered when the transition starts or finishes opening.     |
| `onClose` / `onClosed` | `() => void`                                 | —            | Lifecycle hooks triggered when the transition starts or finishes closing.     |
| `slotProps.root`       | `TagProps<'div'>`                            | —            | Styles for the full-screen backdrop container.                                |
| `slotProps.transition` | `Omit<TransitionProps, 'open' \| 'variant'>` | —            | Overrides for the nested transition animation.                                |
| `children`             | `ReactNode`                                  | —            | Overlay content.                                                              |

## Usage Examples

### Imperative overlays
Open and close overlays programmatically when a global experience does not warrant local state.

```tsx
import Layer from '@xanui/ui/Layer';

export function showAnnouncement() {
  const handle = Layer.open(
    <div className="announce">Big news!</div>,
    { transition: 'zoomOver', onClickOutside: () => handle.close() }
  );
  return handle;
}
```

### Bottom sheet positioning
Adjust the transition timing and root alignment using slot props.

```tsx
import Layer from '@xanui/ui/Layer';

export default function BottomSheet({ open, onClose }) {
  return (
    <Layer
      open={open}
      transition="fadeUp"
      onClickOutside={onClose}
      slotProps={{
        root: { sx: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center' } },
        transition: { duration: 200 },
      }}
    >
      <div className="sheet">Sheet content</div>
    </Layer>
  );
}
```

````
# Layer

`Layer` is the primitive overlay engine used by `Modal`, `Drawer`, and `Toast`. It renders content inside a portal with backdrop handling, transitions, and optional blur.

## Basic Example

Render custom overlay content with fade and blur while controlling visibility via local state.

```tsx
import { useState } from 'react';
import Layer from '@xanui/ui/Layer';

export default function BasicLayer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Layer</button>
      <Layer open={open} blur={40} blurMode="blur" onClickOutside={() => setOpen(false)}>
        <div className="overlay-card">Hello from Layer</div>
      </Layer>
    </>
  );
}
```

## Props

| Name                   | Type                         | Default      | Description                                                                   |
| ---------------------- | ---------------------------- | ------------ | ----------------------------------------------------------------------------- |
| `open`                 | `boolean`                    | `false`      | Controls whether the overlay is mounted and animated in.                      |
| `transition`           | `TransitionProps['variant']` | `'zoomOver'` | Variant passed to the inner `Transition`.                                     |
| `blur`                 | `number`                     | `0`          | Amount of backdrop blur/overlay opacity.                                      |
| `blurMode`             | `'blur' \| 'transparent'`    | `'blur'`     | Determines whether a CSS blur is used or a translucent background is applied. |
| `onClickOutside`       | `() => void`                 | —            | Called when users click outside the content.                                  |
| `slotProps.root`       | `TagProps<'div'>`            | —            | Styles for the full-screen backdrop container.                                |
| `slotProps.transition` | `TransitionProps`            | —            | Overrides for the nested transition animation.                                |
| `slotProps.portal`     | `PortalProps`                | —            | Customize the portal target.                                                  |
| `slotProps.content`    | `TagProps<'div'>`            | —            | Styles applied to the immediate content wrapper.                              |

## Usage Examples

### Imperative overlays
Open and close overlays programmatically by id when you do not need local state.

```tsx
import Layer from '@xanui/ui/Layer';

export function showAnnouncement() {
  Layer.open('announcement', <div className="announce">Big news!</div>, { transition: 'zoom' });
}

export function hideAnnouncement() {
  Layer.close('announcement');
}
```

### Custom placement and timing
Adjust the transition delay and root alignment using slot props.

```tsx
import Layer from '@xanui/ui/Layer';

export default function BottomSheet({ open, onClose }) {
  return (
    <Layer
      open={open}
      transition="fadeUp"
      onClickOutside={onClose}
      slotProps={{
        root: { sx: { display: 'flex', alignItems: 'flex-end' } },
        transition: { duration: 200 },
      }}
    >
      <div className="sheet">Sheet content</div>
    </Layer>
  );
}
```
