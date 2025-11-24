# Portal
Renders children into a DOM node outside the parent hierarchy, preserving theme.

## Import
```tsx
import { Portal } from '@xanui/ui';
```

## Usage
```tsx
<Portal appendTo={document.body}>
  <FloatingWidget />
</Portal>
```

## Props
| Name      | Type        | Description                                      |
| --------- | ----------- | ------------------------------------------------ |
| appendTo  | HTMLElement | Container to append created node (default body). |
| container | HTMLElement | Use existing element instead of creating.        |
| component | string      | Element tag to create (default div).             |
| children  | ReactNode   | Portaled content.                                |

## Behavior
- Creates element on mount, removes on unmount.
- Theme is reapplied inside portal.

## Best Practices
Use for overlays, tooltips, menus to escape overflow or stacking contexts.
