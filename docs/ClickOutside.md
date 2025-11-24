# ClickOutside

`ClickOutside` listens for document clicks and invokes a callback whenever the user interacts outside of the wrapped content.

## Basic Example

Close a dropdown when users click anywhere else on the page.

```tsx
import { useState } from 'react';
import ClickOutside from '@xanui/ui/ClickOutside';

export default function BasicClickOutside() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <ClickOutside onClickOutside={() => setOpen(false)}>
      <div className="dropdown-panel">Panel content</div>
    </ClickOutside>
  );
}
```

## Props

| Name             | Type               | Default | Description                                                    |
| ---------------- | ------------------ | ------- | -------------------------------------------------------------- |
| `onClickOutside` | `() => void`       | —       | Fired when a pointer event occurs outside the wrapped element. |
| `component`      | `TagComponentType` | `'div'` | Underlying element rendered for the wrapper.                   |
| `children`       | `ReactNode`        | —       | Content that should stay open until an outside click happens.  |

## Usage Examples

### Controlled popover dismissal
Pair `ClickOutside` with a `Menu` or `Popover` to close floating surfaces.

```tsx
import ClickOutside from '@xanui/ui/ClickOutside';
import Menu from '@xanui/ui/Menu';

export default function MenuWithDismiss({ anchor, onClose }) {
  return (
    <Menu target={anchor} placement="bottom-left">
      <ClickOutside onClickOutside={onClose}>
        <div className="menu-content">...</div>
      </ClickOutside>
    </Menu>
  );
}
```

### Custom element wrapper
Render a semantic element (e.g., `section`) while still listening for outside events.

```tsx
import ClickOutside from '@xanui/ui/ClickOutside';

export default function InlineDialog({ onDismiss }) {
  return (
    <ClickOutside component="section" onClickOutside={onDismiss}>
      <p>Press escape or click elsewhere to close.</p>
    </ClickOutside>
  );
}
```
