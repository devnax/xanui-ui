# useClickOutside

`useClickOutside` is a lightweight hook that provides a ref tied to a document-level listener. Whenever a pointer event occurs outside the referenced element the supplied callback fires.

## Basic Example

```tsx
import { useState } from 'react';
import { useClickOutside } from '@xanui/ui/useClickOutside';

export default function InlinePopover() {
  const [open, setOpen] = useState(true);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  if (!open) return null;
  return (
    <div ref={ref} className="popover">
      Popover content
    </div>
  );
}
```

## API

| Parameter        | Type         | Description                                                              |
| ---------------- | ------------ | ------------------------------------------------------------------------ |
| `onClickOutside` | `() => void` | Callback invoked whenever a click occurs outside the referenced element. |

The hook returns a mutable `ref` you should attach to the element you want to monitor.

## Usage Examples

### Multiple refs with custom elements

```tsx
import { useClickOutside } from '@xanui/ui/useClickOutside';

export default function ToastInspector({ onDismiss }: { onDismiss: () => void }) {
  const ref = useClickOutside<HTMLDivElement>(onDismiss);
  return (
    <section ref={ref} aria-live="polite">
      Inspect toast payloads here.
    </section>
  );
}
```

### Integrating with portals

Because the hook listens on `document`, it works even if the referenced element is portaled elsewhere in the DOM tree.

```tsx
import { useClickOutside } from '@xanui/ui/useClickOutside';
import Portal from '@xanui/ui/Portal';

export default function TooltipWithHook({ anchor }: { anchor: HTMLElement }) {
  const ref = useClickOutside<HTMLDivElement>(() => console.log('outside'));
  return (
    <Portal appendTo={document.body}>
      <div ref={ref} role="tooltip">
        Hover details
      </div>
    </Portal>
  );
}
```
