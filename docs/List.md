# List

`List` provides themed styling and hover/selection logic for groups of `ListItem` components.

## Basic Example

Vertical navigation list with hover accents.

```tsx
import List from '@xanui/ui/List';
import ListItem from '@xanui/ui/ListItem';

export default function BasicList() {
    return (
        <List>
            <ListItem selected>Dashboard</ListItem>
            <ListItem>Projects</ListItem>
            <ListItem>Settings</ListItem>
        </List>
    );
}
```

## Props

| Name           | Type                  | Default     | Description                                           |
| -------------- | --------------------- | ----------- | ----------------------------------------------------- |
| `color`        | `ColorTemplateColors` | `'brand'`   | Color palette applied to selected list items.         |
| `variant`      | `ColorTemplateType`   | `'fill'`    | Visual style for selected rows (fill, outline, etc.). |
| `hoverColor`   | `ColorTemplateColors` | `'default'` | Palette token used on hover states.                   |
| `hoverVariant` | `ColorTemplateType`   | `'alpha'`   | How hovered rows are tinted.                          |
| `component`    | `TagComponentType`    | `'ul'`      | Underlying element for the list.                      |

## Usage Examples

### Menu with outline hover
Use outline variant to keep borders visible while hovering.

```tsx
import List from '@xanui/ui/List';
import ListItem from '@xanui/ui/ListItem';

export default function OutlineMenu() {
    return (
        <List variant="outline" hoverVariant="outline" hoverColor="brand">
            <ListItem>Profile</ListItem>
            <ListItem>Billing</ListItem>
            <ListItem>Security</ListItem>
        </List>
    );
}
```

### Mixed palette per breakpoint
Adjust the selected color for light vs dark sections.

```tsx
import List from '@xanui/ui/List';

export default function ResponsiveList({ scheme }: { scheme: 'light' | 'dark' }) {
    return (
        <List color={scheme === 'dark' ? 'default' : 'brand'}>
            {/* ListItem children */}
        </List>
    );
}
```
