# ClickOutside
Utility wrapper triggering a callback when user clicks outside its children.

## Import
```tsx
import { ClickOutside } from '@xanui/ui';
```

## Usage
```tsx
<ClickOutside onClickOutside={() => setOpen(false)}>
  <Panel />
</ClickOutside>
```

## Props
| Name           | Type       | Description                      |
| -------------- | ---------- | -------------------------------- |
| onClickOutside | () => void | Fired on outside click or touch. |
| children       | ReactNode  | Wrapped content.                 |

## Behavior
- Listens to document events and compares target.

## Best Practices
Use to close menus, popovers, dialogs. Avoid nesting many layers unnecessarily.
