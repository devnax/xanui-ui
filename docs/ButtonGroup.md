# ButtonGroup

`ButtonGroup` arranges multiple `Button` components into a single segmented control while normalizing colors, variants, and sizes.

## Basic Example

Evenly spaced buttons sharing a border and consistent styling.

```tsx
import Button from '@xanui/ui/Button';
import ButtonGroup from '@xanui/ui/ButtonGroup';

export default function BasicButtonGroup() {
    return (
        <ButtonGroup color="brand" variant="outline">
            <Button>Daily</Button>
            <Button>Weekly</Button>
            <Button>Monthly</Button>
        </ButtonGroup>
    );
}
```

## Props

| Name        | Type                                 | Default     | Description                                   |
| ----------- | ------------------------------------ | ----------- | --------------------------------------------- |
| `children`  | `ReactElement<ButtonProps>` \| array | —           | Buttons cloned with shared styling.           |
| `color`     | `ColorTemplateColors`                | inherit     | Color token propagated to each child button.  |
| `variant`   | `ColorTemplateType`                  | `'outline'` | Variant applied to every button in the group. |
| `size`      | `'small' \| 'medium' \| 'large'`     | `'medium'`  | Determines matched heights and spacing.       |
| `component` | `TagComponentType`                   | `'div'`     | Wrapper element for the group.                |

## Usage Examples

### Mixed actions with custom size
Leverage the `size` prop to render compact toolbar actions.

```tsx
import Button from '@xanui/ui/Button';
import ButtonGroup from '@xanui/ui/ButtonGroup';
import ListIcon from '@xanui/icons/List';
import GridIcon from '@xanui/icons/GridView';

export default function CompactGroup() {
    return (
        <ButtonGroup size="small" color="default">
            <Button startIcon={<ListIcon />}>List</Button>
            <Button startIcon={<GridIcon />}>Grid</Button>
        </ButtonGroup>
    );
}
```

### Responsive grouping
Switch the palette across breakpoints to fit dark or light layouts.

```tsx
import Button from '@xanui/ui/Button';
import ButtonGroup from '@xanui/ui/ButtonGroup';

export default function ResponsiveGroup() {
    return (
        <ButtonGroup color={{ xs: 'default', md: 'brand' }}>
            <Button>Profile</Button>
            <Button>Billing</Button>
            <Button>Security</Button>
        </ButtonGroup>
    );
}
```
