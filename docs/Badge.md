# Badge

`Badge` augments any child element with a compact status dot or pill counter that respects color templates and placement options.

## Basic Example

Show a numeric badge on top of an avatar.

```tsx
import Avatar from '@xanui/ui/Avatar';
import Badge from '@xanui/ui/Badge';

export default function BasicBadge() {
    return (
        <Badge content={7}>
            <Avatar src="/assets/users/nora.png" alt="Nora" />
        </Badge>
    );
}
```

## Props

| Name                   | Type                                                           | Default       | Description                                                                      |
| ---------------------- | -------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------- |
| `content`              | `number \| ReactElement`                                       | —             | Content displayed inside the badge. Numbers greater than `99` collapse to `99+`. |
| `color`                | `ColorTemplateColors`                                          | `'danger'`    | Tone applied to the badge pill.                                                  |
| `placement`            | `'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom'` | `'right-top'` | Defines which corner the badge sticks to.                                        |
| `visible`              | `boolean`                                                      | `true`        | Allows toggling the badge without removing the child.                            |
| `slotProps.transition` | `TransitionProps`                                              | —             | Animation configuration for showing or hiding the badge.                         |
| `children`             | `ReactNode`                                                    | —             | Element that receives the badge overlay.                                         |

## Usage Examples

### Dot indicator
Hide `content` to render a subtle dot that tracks presence or status.

```tsx
import Badge from '@xanui/ui/Badge';

export default function DotBadge() {
    return (
        <Badge color="success">
            <span className="status-chip">Online</span>
        </Badge>
    );
}
```

### Responsive placement
Switch placement based on breakpoint props to maintain alignment within different layouts.

```tsx
import Badge from '@xanui/ui/Badge';

export default function ResponsivePlacement() {
    return (
        <Badge
            content={<span>Live</span>}
            placement={{ xs: 'right-top', md: 'left-bottom' }}
        >
            <div className="video-thumb" />
        </Badge>
    );
}
```
