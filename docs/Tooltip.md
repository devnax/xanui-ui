# Tooltip

`Tooltip` clones its single child to attach hover/focus handlers and shows a themed `Menu` with brief helper text.

## Basic Example

```tsx
import Tooltip from '@xanui/ui/Tooltip';
import IconButton from '@xanui/ui/IconButton';
import DeleteIcon from '@xanui/icons/Delete';

export default function DeleteTooltip() {
  return (
    <Tooltip title="Delete item">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
```

## Props

| Name        | Type                     | Default     | Description                                                            |
| ----------- | ------------------------ | ----------- | ---------------------------------------------------------------------- |
| `title`     | `string \| ReactNode`    | —           | Content displayed inside the tooltip. Responsive values are supported. |
| `children`  | `ReactElement`           | —           | A single focusable/hoverable element that triggers the tooltip.        |
| `color`     | `ColorTemplateColors`    | `'default'` | Color palette used for the tooltip surface.                            |
| `variant`   | `ColorTemplateType`      | `'fill'`    | Styling mode for the tooltip surface.                                  |
| `placement` | `MenuProps['placement']` | `'bottom'`  | Preferred position relative to the trigger element.                    |

## Usage Examples

### Light tooltip on top
Switch to an alpha variant and reposition the tooltip.

```tsx
import Tooltip from '@xanui/ui/Tooltip';

export default function InfoTooltip({ children }) {
  return (
    <Tooltip title="More details" color="secondary" variant="alpha" placement="top">
      {children}
    </Tooltip>
  );
}
```

### Responsive copy
Provide different text on mobile vs desktop.

```tsx
import Tooltip from '@xanui/ui/Tooltip';

export default function ResponsiveTooltip({ children }) {
  return (
    <Tooltip title={{ xs: 'Hold to copy', md: 'Click to copy' }}>
      {children}
    </Tooltip>
  );
}
```
