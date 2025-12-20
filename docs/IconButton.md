# IconButton

`IconButton` renders a square or circular button whose content is typically an icon. It shares the same color system as `Button` but is optimized for compact interactions.

## Basic Example

Simple icon button with the brand fill style.

```tsx
import IconButton from '@xanui/ui/IconButton';
import HomeIcon from '@xanui/icons/Home';

export default function BasicIconButton() {
    return (
        <IconButton>
            <HomeIcon />
        </IconButton>
    );
}
```

## Props

| Name       | Type                                       | Default    | Description                                   |
| ---------- | ------------------------------------------ | ---------- | --------------------------------------------- |
| `size`     | `number \| 'small' \| 'medium' \| 'large'` | `'medium'` | Sets the button's width/height (square).      |
| `color`    | `UseColorTemplateColor`                    | `'brand'`  | Palette token for the background/border.      |
| `variant`  | `UseColorTemplateType`                     | `'fill'`   | Visual style such as fill, outline, or text.  |
| `corner`   | `'square' \| 'rounded' \| 'circle'`        | `'circle'` | Border radius preset; circle produces a pill. |
| `children` | `ReactNode`                                | —          | Usually a single icon element.                |

## Usage Examples

### Ghost icon button
Use the `text` variant to get a minimal hit area suitable for toolbars.

```tsx
import IconButton from '@xanui/ui/IconButton';
import SettingsIcon from '@xanui/icons/Settings';

export default function GhostIconButton() {
    return (
        <IconButton variant="text" color="default" size="small">
            <SettingsIcon />
        </IconButton>
    );
}
```

### Responsive sizing
Provide responsive sizes for touch-friendly buttons on mobile that shrink on desktop.

```tsx
import IconButton from '@xanui/ui/IconButton';
import SearchIcon from '@xanui/icons/Search';

export default function ResponsiveIconButton() {
    return (
        <IconButton size={{ xs: 44, md: 34 }} corner="rounded">
            <SearchIcon />
        </IconButton>
    );
}
```
