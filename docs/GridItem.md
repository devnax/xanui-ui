# GridItem

`GridItem` works with `GridContainer` to create responsive 12-column layouts using percentage-based widths per breakpoint.

## Basic Example

Split the row into two halves on desktop and full width on mobile.

```tsx
import GridContainer from '@xanui/ui/GridContainer';
import GridItem from '@xanui/ui/GridItem';

export default function BasicGridItem() {
    return (
        <GridContainer>
            <GridItem xs={12} md={6}>Left</GridItem>
            <GridItem xs={12} md={6}>Right</GridItem>
        </GridContainer>
    );
}
```

## Props

| Name                         | Type               | Default | Description                                                                                        |
| ---------------------------- | ------------------ | ------- | -------------------------------------------------------------------------------------------------- |
| `xs`, `sm`, `md`, `lg`, `xl` | `number (1-12)`    | —       | Number of columns the item should span at each breakpoint. Converted to percentages automatically. |
| `component`                  | `TagComponentType` | `'div'` | Underlying element.                                                                                |
| `children`                   | `ReactNode`        | —       | Content inside the grid cell.                                                                      |

## Usage Examples

### Combining varying spans
Mix column spans to create more complex layouts.

```tsx
import GridContainer from '@xanui/ui/GridContainer';
import GridItem from '@xanui/ui/GridItem';

export default function MixedGrid() {
    return (
        <GridContainer>
            <GridItem xs={12} md={8}>Content</GridItem>
            <GridItem xs={12} md={4}>Sidebar</GridItem>
            <GridItem xs={12} md={3}>Card A</GridItem>
            <GridItem xs={12} md={3}>Card B</GridItem>
            <GridItem xs={12} md={3}>Card C</GridItem>
            <GridItem xs={12} md={3}>Card D</GridItem>
        </GridContainer>
    );
}
```

### Semantic elements per item
Render headings, articles, or other semantic tags while keeping the grid sizing intact.

```tsx
import GridItem from '@xanui/ui/GridItem';

export default function ArticleGrid({ article }) {
    return (
        <GridItem component="article" xs={12} sm={6} lg={4}>
            <h3>{article.title}</h3>
        </GridItem>
    );
}
```

