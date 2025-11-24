# Label

`Label` is a styled wrapper around the native `<label>` element that keeps inputs and helper icons aligned.

## Basic Example

Pair a label with an input to improve accessibility.

```tsx
import Label from '@xanui/ui/Label';
import Input from '@xanui/ui/Input';

export default function BasicLabel() {
    return (
        <Label htmlFor="email-input">
            Email
            <Input id="email-input" placeholder="name@example.com" />
        </Label>
    );
}
```

## Props

| Name         | Type               | Default             | Description                              |
| ------------ | ------------------ | ------------------- | ---------------------------------------- |
| `component`  | `TagComponentType` | `'label'`           | Underlying element.                      |
| `children`   | `ReactNode`        | —                   | Usually text plus an associated control. |
| `sx` / `sxr` | `CSSObject`        | inline-flex styling | Override gap, typography, etc.           |

## Usage Examples

### Label with tooltip icon
Drop icons or helper text directly inside; the inline flex layout keeps everything aligned.

```tsx
import Label from '@xanui/ui/Label';
import Tooltip from '@xanui/ui/Tooltip';
import InfoIcon from '@xanui/icons/Info';

export default function LabelWithTooltip() {
    return (
        <Label htmlFor="password">
            Password
            <Tooltip title="Use at least 12 characters.">
                <InfoIcon fontSize={14} />
            </Tooltip>
        </Label>
    );
}
```

### Horizontal control groups
Use `sxr` to distribute spacing when labelling grouped controls.

```tsx
import Label from '@xanui/ui/Label';
import Switch from '@xanui/ui/Switch';

export default function SwitchLabel() {
    return (
        <Label sxr={{ justifyContent: 'space-between', width: '100%' }}>
            Enable notifications
            <Switch />
        </Label>
    );
}
```

