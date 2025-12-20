# Checkbox

`Checkbox` renders a custom icon-based checkbox that syncs with the XanUI styling system while keeping an underlying native input for accessibility.

## Basic Example

Controlled checkbox that toggles selection from local state.

```tsx
import { useState } from 'react';
import Checkbox from '@xanui/ui/Checkbox';

export default function BasicCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
        <Checkbox checked={checked} onChange={() => setChecked((prev) => !prev)} />
    );
}
```

## Props

| Name            | Type                                       | Default         | Description                                                              |
| --------------- | ------------------------------------------ | --------------- | ------------------------------------------------------------------------ |
| `checked`       | `boolean`                                  | uncontrolled    | Indicates whether the checkbox is selected.                              |
| `onChange`      | `() => void`                               | toggle internal | Invoked when the visual checkbox is clicked.                             |
| `checkIcon`     | `ReactElement`                             | material check  | Icon shown when checked; accepts responsive props.                       |
| `uncheckIcon`   | `ReactElement`                             | outline square  | Icon shown when unchecked.                                               |
| `indeterminate` | `boolean`                                  | `false`         | Displays the indeterminate icon and locks the checkbox in a third state. |
| `size`          | `number \| 'small' \| 'medium' \| 'large'` | `'medium'`      | Controls icon size and interactive area.                                 |
| `color`         | `UseColorTemplateColor`                    | `'brand'`       | Accent color for the checked icon.                                       |

## Usage Examples

### Indeterminate state
Use when a parent checkbox represents a collection of partially selected items.

```tsx
import Checkbox from '@xanui/ui/Checkbox';

export default function IndeterminateCheckbox() {
    return <Checkbox indeterminate color="warning" />;
}
```

### Custom icons and responsive sizing
Swap the icons for custom artwork and resize based on breakpoints.

```tsx
import Checkbox from '@xanui/ui/Checkbox';
import HeartFilled from '@xanui/icons/Favorite';
import HeartOutline from '@xanui/icons/FavoriteBorder';

export default function FavoriteCheckbox() {
    return (
        <Checkbox
            color="error"
            size={{ xs: 28, md: 36 }}
            checkIcon={<HeartFilled />}
            uncheckIcon={<HeartOutline />}
        />
    );
}
```

