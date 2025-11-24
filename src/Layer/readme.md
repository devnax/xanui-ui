# Layer
Low-level overlay system powering Modal, Drawer, Toast and other floating components.

## Import
```tsx
import { Layer } from '@xanui/ui';
```

## Usage
```tsx
<Layer open transition="fade" slotProps={{ root:{ alignItems:'center', justifyContent:'center' } }}>
  <Card>Content</Card>
</Layer>
```

## Imperative API
```tsx
Layer.open('custom', <Card>Hi</Card>, { transition:'zoom' });
Layer.close('custom');
```

## Props (core)
| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| open           | boolean   | Visibility.                          |
| transition     | string    | Animation variant (e.g. fade, zoom). |
| blurMode       | string    | Backdrop blur option.                |
| slotProps.root | TagProps  | Root container styling.              |
| children       | ReactNode | Overlay content.                     |

## Best Practices
Use semantic higher-level components unless customizing unique behavior.
