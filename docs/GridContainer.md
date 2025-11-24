# GridContainer

`GridContainer` is a flex-based wrapper that lays out `GridItem` components (or any children) with wrap support and full-width coverage.

## Basic Example

Distribute several grid items across rows.

```tsx
import GridContainer from '@xanui/ui/GridContainer';
import GridItem from '@xanui/ui/GridItem';

export default function BasicGrid() {
    return (
        <GridContainer gap={2}>
            <GridItem flex={1}>A</GridItem>
            <GridItem flex={1}>B</GridItem>
            <GridItem flex={1}>C</GridItem>
        </GridContainer>
    );
}
```

## Props

| Name         | Type               | Default               | Description                                             |
| ------------ | ------------------ | --------------------- | ------------------------------------------------------- |
| `component`  | `TagComponentType` | `'div'`               | Underlying element rendered for the container.          |
| `sx` / `sxr` | `CSSObject`        | display flex row wrap | Style overrides for spacing, gaps, etc.                 |
| `children`   | `ReactNode`        | —                     | Typically `GridItem` components, but any content works. |

## Usage Examples

### Responsive gap control
Adjust the spacing between items based on breakpoints to keep layouts breathable.

```tsx
import GridContainer from '@xanui/ui/GridContainer';

export default function ResponsiveGapGrid({ children }) {
    return (
        <GridContainer sxr={{ gap: { xs: 1, md: 3 } }}>
            {children}
        </GridContainer>
    );
}
```

### Nested containers
Combine multiple containers to create complex grids with independent wrapping behaviors.

```tsx
import GridContainer from '@xanui/ui/GridContainer';
import GridItem from '@xanui/ui/GridItem';

export default function NestedGrid() {
    return (
        <GridContainer>
            <GridItem flexBasis="100%">
                <GridContainer>
                    <GridItem flex={1}>Header left</GridItem>
                    <GridItem flex={1}>Header right</GridItem>
                </GridContainer>
            </GridItem>
            <GridItem flex={1}>Sidebar</GridItem>
            <GridItem flex={3}>Content</GridItem>
        </GridContainer>
    );
}
```

