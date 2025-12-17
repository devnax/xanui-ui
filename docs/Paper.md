# Paper

`Paper` renders a styled container with padding, rounded corners, and background color suitable for cards, panels, or surface sections. It inherits the full XanUI `Tag` prop system so you can override spacing, colors, and semantic elements.

## Basic Example

```tsx
import Paper from '@xanui/ui/Paper';

export default function BasicPaper() {
    return (
        <Paper>
            <h3>Account summary</h3>
            <p>Keep your profile up to date to receive important notifications.</p>
        </Paper>
    );
}
```

## Props

| Name         | Type               | Default     | Description                                                            |
| ------------ | ------------------ | ----------- | ---------------------------------------------------------------------- |
| `component`  | `TagComponentType` | `'div'`     | Underlying element rendered by the paper surface.                      |
| `sx` / `sxr` | `CSSObject`        | —           | Custom styles merged with the default background, radius, and padding. |
| `baseClass`  | `string`           | `'default'` | CSS hook applied to the root element.                                  |
| `children`   | `ReactNode`        | —           | Content displayed inside the surface.                                  |
| `...rest`    | `TagProps`         | —           | Any other system or native HTML props (spacing, flex, events, etc.).   |

## Usage Examples

### Card with sections
Compose headings, body copy, and actions inside `Paper` to build a card-like block.

```tsx
import Paper from '@xanui/ui/Paper';
import Button from '@xanui/ui/Button';

export default function ProfileCard() {
    return (
        <Paper p={2} gap={1} display="flex" flexDirection="column">
            <h4>Profile completeness</h4>
            <p>Finish the remaining steps to unlock advanced features.</p>
            <Button size="small">Review steps</Button>
        </Paper>
    );
}
```

### Subtle inset surface
Override styling to match different themes or interactive states.

```tsx
import Paper from '@xanui/ui/Paper';

export default function InsetPaper() {
    return (
        <Paper
            component="section"
            bgcolor="common.primary"
            shadow={2}
            border="1px solid"
            borderColor="border.main"
        >
            <strong>Need help?</strong>
            <p>Contact support and share this reference code: #A1B2.</p>
        </Paper>
    );
}
```

