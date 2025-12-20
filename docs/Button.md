# Button

`Button` wraps the XanUI style system around an accessible `<button>` element with support for icons, corners, loading states, and layout direction.

## Basic Example

Contained button with semantic color and uppercase label.

```tsx
import Button from '@xanui/ui/Button';

export default function BasicButton() {
    return (
        <Button color="brand" variant="fill">
            Save changes
        </Button>
    );
}
```

## Props

| Name                    | Type                             | Default     | Description                                                                      |
| ----------------------- | -------------------------------- | ----------- | -------------------------------------------------------------------------------- |
| `startIcon` / `endIcon` | `ReactElement`                   | —           | Optional icons rendered before/after the button label; accept responsive values. |
| `color`                 | `UseColorTemplateColor`          | `'brand'`   | Palette token controlling background, border, and text.                          |
| `variant`               | `UseColorTemplateType`           | `'fill'`    | Selects visual treatment (fill, outline, text, etc.).                            |
| `corner`                | `UseCornerTypes`                 | `'rounded'` | Border radius preset plugged into the `useCorner` utility.                       |
| `size`                  | `'small' \| 'medium' \| 'large'` | `'medium'`  | Determines height, horizontal padding, and spacing.                              |
| `direction`             | `'row' \| 'column'`              | `'row'`     | Aligns label and icons horizontally or vertically.                               |
| `loading`               | `boolean`                        | `false`     | Disables the button and shows the circular loader overlay.                       |
| `slotProps.loading`     | `CircleProgressProps`            | —           | Customize the internal spinner when `loading` is true.                           |
| `children`              | `ReactNode`                      | —           | Button label or custom content.                                                  |

## Usage Examples

### Loading state with custom spinner
Combine `loading` with `slotProps.loading` to match brand guidelines while keeping the button disabled.

```tsx
import Button from '@xanui/ui/Button';

export default function LoadingButton() {
    return (
        <Button
            loading
            color="success"
            slotProps={{ loading: { size: 28 } }}
        >
            Deploying
        </Button>
    );
}
```

### Column layout CTA
Use `direction="column"` to stack icon and text for tile-like call-to-actions.

```tsx
import Button from '@xanui/ui/Button';
import UploadIcon from '@xanui/icons/Upload';

export default function ColumnButton() {
    return (
        <Button
            startIcon={<UploadIcon />}
            direction="column"
            size="large"
            variant="outline"
        >
            Upload
        </Button>
    );
}
```
