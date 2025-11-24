# Portal

`Portal` teleports its children into a different DOM node while preserving the active XanUI theme. Use it for modals, menus, tooltips, or anything that should break out of the current stacking context.

## Basic Example

```tsx
import Portal from '@xanui/ui/Portal';

export default function BasicPortal() {
  return (
    <Portal appendTo={document.body}>
      <div className="floating-widget">I'm rendered next to &lt;body&gt;</div>
    </Portal>
  );
}
```

## Props

| Name        | Type               | Default         | Description                                                              |
| ----------- | ------------------ | --------------- | ------------------------------------------------------------------------ |
| `appendTo`  | `HTMLElement`      | `document.body` | Parent node the portal element is appended to.                           |
| `container` | `HTMLElement`      | —               | Use an existing DOM element instead of creating one.                     |
| `component` | `TagComponentType` | `'div'`         | Tag used when creating a new container.                                  |
| `children`  | `ReactNode`        | —               | Content rendered inside the portal.                                      |
| `...rest`   | `TagProps`         | —               | Attributes applied to the container element (class, data-* attrs, etc.). |

## Usage Examples

### Modal rendering
Guarantee your modal content sits at the document root to avoid clipping or z-index conflicts.

```tsx
import Portal from '@xanui/ui/Portal';
import Paper from '@xanui/ui/Paper';

export default function ModalPortal({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <Portal className="modal-root">
      <div className="backdrop" />
      <Paper position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" p={3}>
        <h3>Modal title</h3>
        <p>Portaled content lives outside your layout but keeps the same theme.</p>
      </Paper>
    </Portal>
  );
}
```

### Reuse an existing container
Bind the portal to a predetermined node (useful for micro-frontends or embedded widgets).

```tsx
import Portal from '@xanui/ui/Portal';

const target = document.getElementById('hud-root')!;

export default function HudPortal() {
  return (
    <Portal container={target} component="span">
      <span className="hud-indicator">Connected</span>
    </Portal>
  );
}
```
