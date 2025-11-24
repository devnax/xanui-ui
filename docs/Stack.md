# Stack

`Stack` is a thin flexbox wrapper that defaults to `display: flex` with a column direction, making it useful for vertical grouping and spacing.

## Basic Example

```tsx
import Stack from '@xanui/ui/Stack';

export default function BasicStack() {
    return (
        <Stack gap={1} p={2} bgcolor="background.secondary">
            <strong>Title</strong>
            <span>Description text</span>
            <button>Action</button>
        </Stack>
    );
}
```

## Props

| Name            | Type                           | Default    | Description                                           |
| --------------- | ------------------------------ | ---------- | ----------------------------------------------------- |
| `component`     | `TagComponentType`             | `'div'`    | Underlying element rendered by the stack.             |
| `sx` / `sxr`    | `CSSObject`                    | —          | Custom styles merged with the base flex styles.       |
| `gap`           | `number \| string`             | —          | Space between children using the XanUI spacing scale. |
| `flexDirection` | `string \| Responsive<string>` | `'column'` | Override the default direction.                       |
| `children`      | `ReactNode`                    | —          | Items to arrange.                                     |
| `...rest`       | `TagProps`                     | —          | Additional flex, spacing, or native attributes.       |

## Usage Examples

### Horizontal stack
Switch to `row` direction for inline toolbars while keeping consistent gaps.

```tsx
import Stack from '@xanui/ui/Stack';

export default function Toolbar() {
    return (
        <Stack flexDirection="row" alignItems="center" gap={1}>
            <button>Undo</button>
            <button>Redo</button>
            <button>Save</button>
        </Stack>
    );
}
```

### Responsive alignment
Combine responsive props to adjust layout across breakpoints.

```tsx
import Stack from '@xanui/ui/Stack';

export default function ResponsiveStack() {
    return (
        <Stack
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={{ xs: 1, md: 2 }}
            alignItems={{ md: 'center' }}
        >
            <div>Item A</div>
            <div>Item B</div>
            <div>Item C</div>
        </Stack>
    );
}
```
