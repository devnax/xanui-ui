# Image

`Image` renders a responsive `<img>` with graceful fallbacks when loading fails.

## Basic Example

Show a product photo that falls back to the product initials.

```tsx
import Image from '@xanui/ui/Image';

export default function BasicImage() {
    return <Image src="/products/chair.png" alt="Office Chair" width={240} height={160} />;
}
```

## Props

| Name        | Type                 | Default      | Description                                                 |
| ----------- | -------------------- | ------------ | ----------------------------------------------------------- |
| `errorView` | `ReactElement`       | first letter | Custom fallback rendered when the source fails.             |
| `component` | `TagComponentType`   | `'img'`      | Element type (`img` normally, `div` when showing fallback). |
| `children`  | `ReactNode`          | —            | Fallback content used when no `errorView` is provided.      |
| `...rest`   | native `<img>` props | —            | Width, height, `objectFit`, `loading`, etc.                 |

## Usage Examples

### Custom error state
Display an icon and helper text whenever the image cannot load.

```tsx
import Image from '@xanui/ui/Image';
import BrokenImageIcon from '@xanui/icons/BrokenImage';

export default function ImageWithErrorView() {
    return (
        <Image
            src="/cdn/unknown.png"
            alt="Unknown"
            width={120}
            height={120}
            errorView={<BrokenImageIcon />}
        />
    );
}
```

### Avatar fallback using children
Provide text or emoji as children to render when the image fails.

```tsx
import Image from '@xanui/ui/Image';

export default function EmojiFallback() {
    return (
        <Image
            src="/avatars/missing.png"
            alt="Koala"
            width={64}
            height={64}
        >🐨</Image>
    );
}
```

