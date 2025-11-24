# Avatar

`Avatar` renders a circular profile photo, initials, or icon with automatic fallbacks and responsive sizing.

## Basic Example

Standard avatar that falls back to initials when the image fails to load.

```tsx
import Avatar from '@xanui/ui/Avatar';

export default function BasicAvatar() {
    return <Avatar src="/assets/users/nora.png" alt="Nora Perez" size={48} />;
}
```

## Props

| Name       | Type                                  | Default              | Description                                                   |
| ---------- | ------------------------------------- | -------------------- | ------------------------------------------------------------- |
| `size`     | `number` \| responsive                | `36`                 | Width, height, and border-radius applied to the avatar.       |
| `src`      | `string`                              | —                    | Image source passed to the internal `<img>`.                  |
| `alt`      | `string`                              | —                    | Accessible alt text and seed for the initials fallback.       |
| `children` | `ReactNode`                           | first letter \| icon | Custom fallback content displayed when the image cannot load. |
| `onError`  | `ReactEventHandler<HTMLImageElement>` | —                    | Triggered when the image fails; still shows fallback visuals. |

## Usage Examples

### Initials fallback
Let the component automatically derive initials from `alt` when no image is supplied.

```tsx
import Avatar from '@xanui/ui/Avatar';

export default function InitialsAvatar() {
    return <Avatar alt="Taylor Swift" size={56} />;
}
```

### Responsive sizing via breakpoint props
Provide an object to `size` to adapt avatars for compact vs. spacious layouts.

```tsx
import Avatar from '@xanui/ui/Avatar';

export default function ResponsiveAvatar() {
    return (
        <Avatar
            src="/assets/users/john.png"
            alt="John Carter"
            size={{ xs: 32, md: 48, xl: 64 }}
        />
    );
}
```