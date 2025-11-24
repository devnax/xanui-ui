# Input

`Input` offers a styled text field with start/end icons, helper text, error states, and multiline support.

## Basic Example

Standard input with helper text and validation.

```tsx
import Input from '@xanui/ui/Input';

export default function BasicInput() {
    return (
        <Input
            placeholder="Your email"
            helperText="We never share this"
            color="brand"
        />
    );
}
```

## Props

| Name                         | Type                               | Default      | Description                                        |
| ---------------------------- | ---------------------------------- | ------------ | -------------------------------------------------- |
| `startIcon` / `endIcon`      | `ReactElement`                     | —            | Optional icons rendered inside the container.      |
| `iconPlacement`              | `'start' \| 'center' \| 'end'`     | auto         | Aligns icons vertically when multiline/responsive. |
| `color`                      | `ColorTemplateColors`              | `'brand'`    | Accent color for focus state.                      |
| `variant`                    | `'fill' \| 'outline' \| 'text'`    | `'fill'`     | Container treatment.                               |
| `focused`                    | `boolean`                          | uncontrolled | Force focus style externally.                      |
| `containerRef`               | `MutableRefObject<HTMLDivElement>` | —            | Access the wrapping container element.             |
| `error`                      | `boolean`                          | `false`      | Applies error styling.                             |
| `helperText`                 | `string`                           | —            | Text displayed below the field.                    |
| `multiline`                  | `boolean`                          | `false`      | Renders a `<textarea>` instead of `<input>`.       |
| `size`                       | `'small' \| 'medium' \| 'large'`   | `'medium'`   | Controls height and font size.                     |
| `rows`, `minRows`, `maxRows` | `number`                           | —            | Row handling when `multiline` is true.             |
| `slotProps.container`        | `TagProps<'div'>`                  | —            | Overrides for the outer container.                 |

## Usage Examples

### Multiline auto-resizing input
Enable `multiline` to transform the input into an auto-growing textarea.

```tsx
import Input from '@xanui/ui/Input';

export default function MultilineInput() {
    return (
        <Input
            multiline
            minRows={3}
            maxRows={8}
            placeholder="Add your notes"
            helperText="Supports markdown"
        />
    );
}
```

### Icon adornments and error state
Display icons on both sides and highlight the control when an error occurs.

```tsx
import Input from '@xanui/ui/Input';
import EmailIcon from '@xanui/icons/Email';
import ClearIcon from '@xanui/icons/Clear';

export default function IconInput() {
    return (
        <Input
            startIcon={<EmailIcon />}
            endIcon={<ClearIcon />}
            placeholder="Email"
            error
            helperText="Enter a valid email address"
        />
    );
}
```

