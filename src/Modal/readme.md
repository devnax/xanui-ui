# Modal
Centered dialog for focused tasks or confirmations.

## Import
```tsx
import { Modal } from '@xanui/ui';
```

## Controlled
```tsx
<Modal open size="sm">Content</Modal>
```

## Imperative
```tsx
Modal.open('settings', <SettingsForm />, { size:'md' });
// Later
Modal.close('settings');
```

## Props
| Name            | Type                           | Default      | Description                     |
| --------------- | ------------------------------ | ------------ | ------------------------------- |
| size            | 'xs'                           | 'sm'         | 'md'                            | 'lg' | 'xl' | 'fullWidth' | number | 'xs' | Width preset or px. |
| slotProps.modal | TagProps                       | -            | Content Tag overrides (sx etc). |
| ...LayerProps   | Backdrop & transition control. |
| children        | ReactNode                      | Dialog body. |

## Accessibility
- Provide focus management and `aria-labelledby` via content heading.
- Keep actions clearly labeled.

## Best Practices
Avoid deep modal stacking; consider Drawer for wide content.
