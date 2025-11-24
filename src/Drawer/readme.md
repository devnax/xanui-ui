# Drawer
Slide-in panel for navigation or contextual content.

## Import
```tsx
import { Drawer } from '@xanui/ui';
```

## Controlled
```tsx
<Drawer open={open} placement="left" size="medium" onClickOutside={() => setOpen(false)}>
  <MenuContent />
</Drawer>
```

## Imperative
```tsx
Drawer.open(<MenuContent />, { placement:'right' });
// Later
Drawer.close();
```

## Props
| Name            | Type       | Default        | Description                 |
| --------------- | ---------- | -------------- | --------------------------- |
| placement       | 'left'     | 'right'        | 'top'                       | 'bottom' | 'left'   | Origin side. |
| open            | boolean    | true           | Visibility (controlled).    |
| size            | number     | 'small'        | 'medium'                    | 'large'  | 'medium' | Panel size.  |
| onClickOutside  | () => void | -              | Fired on backdrop click.    |
| slotProps.root  | TagProps   | -              | Root container overrides.   |
| slotProps.layer | LayerProps | -              | Underlying Layer overrides. |
| children        | ReactNode  | Panel content. |

## Styling
Classes: `.drawer`, `.drawer-content`.

## Best Practices
- Keep focusable elements inside for accessibility.
- Close on route change for nav drawers.
