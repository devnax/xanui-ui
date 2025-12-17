# Container

`Container` centers page content and constrains it to theme breakpoints with automatic horizontal padding.

## Basic Example

Wrap page content to keep it comfortably aligned on large screens.

```tsx
import Container from '@xanui/ui/Container';

export default function BasicContainer() {
    return (
        <Container maxWidth="lg">
            <h1>Dashboard</h1>
            <p>All widgets stay within a readable width.</p>
        </Container>
    );
}
```

## Props

| Name        | Type                           | Default | Description                                                    |
| ----------- | ------------------------------ | ------- | -------------------------------------------------------------- |
| `maxWidth`  | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'lg'`  | Chooses the breakpoint width applied as the container maximum. |
| `component` | `TagComponentType`             | `'div'` | Semantic element for the container.                            |
| `children`  | `ReactNode`                    | —       | Content to render inside the constrained wrapper.              |

## Usage Examples

### Fluid on mobile, fixed on desktop
Provide responsive `maxWidth` values to keep layouts edge-to-edge on phones while staying centered later.

```tsx
import Container from '@xanui/ui/Container';

export default function ResponsiveContainer() {
    return (
        <Container maxWidth={{ xs: 'xs', lg: 'lg' }}>
            <p>The padding adjusts automatically to match the breakpoint.</p>
        </Container>
    );
}
```

### Section wrapper with custom padding
Augment the container with additional spacing or backgrounds using the `sx` prop.

```tsx
import Container from '@xanui/ui/Container';

export default function SectionWrapper() {
    return (
        <Container sxr={{ py: 6, bgcolor: 'common.secondary' }}>
            <h2>Pricing</h2>
            <p>Compare plans at a glance.</p>
        </Container>
    );
}
```

