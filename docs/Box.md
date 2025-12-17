# Box

`Box` is the foundational layout primitive. It renders a `Tag`-powered element that accepts the complete style system along with native HTML attributes.

## Basic Example

Container with spacing, border radius, and typography helpers.

```tsx
import Box from '@xanui/ui/Box';

export default function BasicBox() {
    return (
        <Box p={3} radius={2} bgcolor="common.secondary">
            Drop anything inside this flexible container.
        </Box>
    );
}
```

## Props

| Name         | Type               | Default | Description                                      |
| ------------ | ------------------ | ------- | ------------------------------------------------ |
| `component`  | `TagComponentType` | `'div'` | Underlying HTML tag to render.                   |
| `sx` / `sxr` | `CSSObject`        | —       | Fine-grained styling via the XanUI style system. |
| `baseClass`  | `string`           | `'box'` | CSS class prefix for styling hooks.              |
| `children`   | `ReactNode`        | —       | Content placed inside the container.             |
| `...rest`    | native props       | —       | Any other HTML attributes supported by `Tag`.    |

## Usage Examples

### Semantic element
Render a semantic element such as `section` or `nav` while keeping the same styling surface.

```tsx
import Box from '@xanui/ui/Box';

export default function SectionBox() {
    return (
        <Box component="section" aria-labelledby="profile-heading" px={4} py={3} shadow={1}>
            <h2 id="profile-heading">Profile</h2>
            <p>Update your contact information and preferences.</p>
        </Box>
    );
}
```

### Responsive layout helper
Combine flex props with responsive values to orchestrate adaptive layouts.

```tsx
import Box from '@xanui/ui/Box';

export default function ResponsiveBox() {
    return (
        <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={2}
            p={2}
            bgcolor="common.primary"
        >
            <Box flex={1}>Panel A</Box>
            <Box flex={1}>Panel B</Box>
        </Box>
    );
}
```
