# Alert

`Alert` surfaces contextual feedback and status updates with semantic coloring, optional titles, and inline dismissal.

## Basic Example

Stacked alert with automatic icon selection and text content.

```tsx
import Alert from '@xanui/ui/Alert';

export default function BasicAlert() {
  return (
    <Alert title="Information" color="brand" direction="column">
      Your profile was updated successfully.
    </Alert>
  );
}
```

## Props

| Name        | Type                                                                   | Default     | Description                                                                       |
| ----------- | ---------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `title`     | `string \| ReactElement`                                               | —           | Heading text placed above the body; accepts responsive values.                    |
| `direction` | `'row' \| 'column'`                                                    | `'row'`     | Controls whether icon and content flow horizontally or vertically.                |
| `variant`   | `UseColorTemplateType`                                                 | `'fill'`    | Chooses the background/text relationship for the selected color.                  |
| `color`     | `UseColorTemplateColor`                                                | `'default'` | Semantic palette token; also selects a matching icon when `icon` is not provided. |
| `icon`      | `'info' \| 'warning' \| 'success' \| 'error' \| false \| ReactElement` | inferred    | Overrides the default icon or hides it with `false`.                              |
| `onClose`   | `() => void`                                                           | —           | Shows a dismiss button and triggers the provided handler.                         |
| `slotProps` | `{ closeButton?: IconButtonProps }`                                    | —           | Customize the internal close button or other structural nodes.                    |
| `children`  | `ReactNode`                                                            | —           | Main descriptive content of the alert.                                            |

## Usage Examples

### Inline dismissible alert
Allow people to hide an alert after acting on the message.

```tsx
import { useState } from 'react';
import Alert from '@xanui/ui/Alert';

export default function ClosableAlert() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <Alert
      title="Session expired"
      color="error"
      icon="error"
      onClose={() => setOpen(false)}
    >
      Please sign in again to keep working.
    </Alert>
  );
}
```

### Modal confirmation helper
Use the imperative helper to ask for confirmation without hand wiring a modal.

```tsx
import Alert from '@xanui/ui/Alert';

export function showDeleteConfirm() {
  Alert.confirm({
    title: 'Delete item',
    content: 'This action cannot be undone.',
    color: 'error',
    closeButton: true,
    okButtonText: 'Delete',
    closeButtonText: 'Cancel',
    onConfirm: (approved) => {
      if (approved) {
        // proceed with destructive task
      }
    },
  });
}
```
