# Alert

Rich feedback component for status messages, warnings, success notices, errors and custom content.

## Import
```tsx
import { Alert } from '@xanui/ui';
```

## Usage
```tsx
<Alert title="Information" color="brand" icon="info">
  Your profile was updated successfully.
</Alert>
```

### Closable
```tsx
<Alert title="Session Expired" color="danger" icon="error" onClose={() => { /* ... */ }}>
  Please login again.
</Alert>
```

### Vertical layout
```tsx
<Alert direction="column" title="Congrats" color="success">
  You reached a new level.
</Alert>
```

## Props
| Name      | Type                | Default   | Description                                                    |
| --------- | ------------------- | --------- | -------------------------------------------------------------- |
| title     | string              | -         | Heading text or ReactElement. Supports breakpoint props.       |
| direction | 'row'               | 'row'     | Layout direction.                                              |
| variant   | 'fill'              | 'fill'    | Color template variant.                                        |
| color     | ColorTemplateColors | 'default' | Semantic color.                                                |
| icon      | 'info'              | inferred  | Icon type or ReactElement or false. If omitted will try color. |
| onClose   | () => void          | -         | Adds a close IconButton.                                       |
| children  | ReactNode           | -         | Body content.                                                  |

### Alert.confirm API
Imperative modal confirmation.
```tsx
Alert.confirm({
  title: 'Delete item',
  content: 'Are you sure?',
  color: 'danger',
  closeButton: true,
  onConfirm: ok => console.log(ok)
});
```
| Prop                | Description                         |
| ------------------- | ----------------------------------- |
| content             | Main text/content.                  |
| size                | xs                                  | sm                            | md                    | lg   | xl              | fullWidth | number | Modal width. |
| closeButton         | boolean                             | Show corner close icon.       |
| clickOutsideToClose | boolean                             | Allow outside click to close. |
| okButtonText        | string                              | Custom OK text.               |
| closeButtonText     | string                              | Custom close text.            |
| hideOkButton        | boolean                             | Hide OK.                      |
| hideCloseButton     | boolean                             | Hide Close.                   |
| buttonPlacement     | start                               | end                           | between               | full | Buttons layout. |
| variant             | text                                | fill                          | Button variant logic. |
| onConfirm           | (ok:boolean) => void                | Result callback.              |
| transition          | TransitionVariantTypes              | Modal animation.              |
| blurMode            | Modal backdrop blur.                |
| slotProps           | Customize internal modal / buttons. |

## Styling
Root class: `.alert`
- `.alert-icon`
- `.alert-content`
- `.alert-title`
- `.alert-close-button`

Use sx prop overrides or CSS with those class names.

## Accessibility
- Provide meaningful `title`.
- Icon buttons have accessible role and can receive focus.

## Best Practices
- Prefer semantic colors matching status.
- Keep messages concise.
