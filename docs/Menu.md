# Menu

`Menu` anchors floating content to any DOM element and positions it using smart placement plus transitions.

## Basic Example

Attach the menu to a button element and close it when clicking outside.

```tsx
import { useRef, useState } from 'react';
import Menu from '@xanui/ui/Menu';
import List from '@xanui/ui/List';
import ListItem from '@xanui/ui/ListItem';

export default function BasicMenu() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>Open menu</button>
            <Menu
                target={open ? buttonRef.current ?? undefined : undefined}
                placement="bottom-left"
                onClickOutside={() => setOpen(false)}
            >
                <List>
                    <ListItem>Profile</ListItem>
                    <ListItem>Logout</ListItem>
                </List>
            </Menu>
        </>
    );
}
```

## Props

| Name                   | Type                       | Default                              | Description                                                                              |
| ---------------------- | -------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------- |
| `target`               | `HTMLElement \| undefined` | `undefined`                          | The DOM element the menu should align against. Presence of a target controls visibility. |
| `placement`            | `PlacementTypes`           | `'bottom-left'`                      | Defines which side of the target the menu appears on.                                    |
| `zIndex`               | `number`                   | `0`                                  | Added to the global base z-index.                                                        |
| `onClickOutside`       | `() => void`               | —                                    | Called when the user clicks outside the menu content.                                    |
| `slotProps.transition` | `TransitionProps`          | `{ variant: 'grow', duration: 200 }` | Customize the enter/exit animation.                                                      |
| `slotProps.portal`     | `PortalProps`              | —                                    | Override the portal container.                                                           |
| `slotProps.content`    | `TagProps<'div'>`          | —                                    | Style overrides for the menu surface.                                                    |

## Usage Examples

### Responsive placement
Flip the menu side based on breakpoints.

```tsx
import Menu from '@xanui/ui/Menu';

export default function ResponsiveMenu({ anchor }) {
    return (
        <Menu
            target={anchor}
            placement={{ xs: 'bottom-left', md: 'bottom-right' }}
        >
            {/* menu items */}
        </Menu>
    );
}
```

### Custom transition and content styling
Adjust the animation variant and drop shadow for visual polish.

```tsx
import Menu from '@xanui/ui/Menu';

export default function StyledMenu({ target, onClose }) {
    return (
        <Menu
            target={target}
            onClickOutside={onClose}
            slotProps={{
                transition: { variant: 'zoom', duration: 120 },
                content: { sx: { radius: 2, shadow: 8 } },
            }}
        >
            {/* menu */}
        </Menu>
    );
}
```