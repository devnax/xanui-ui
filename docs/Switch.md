# Switch

`Switch` renders a toggle with a sliding thumb, fully controllable through XanUI's responsive props and slot overrides.

## Basic Example

```tsx
import { useState } from 'react';
import Switch from '@xanui/ui/Switch';

export default function BasicSwitch() {
  const [checked, setChecked] = useState(false);

  return <Switch checked={checked} onChange={() => setChecked((prev) => !prev)} />;
}
```

## Props

| Name              | Type                                       | Default         | Description                                                  |
| ----------------- | ------------------------------------------ | --------------- | ------------------------------------------------------------ |
| `checked`         | `boolean`                                  | uncontrolled    | Controls the on/off state.                                   |
| `onChange`        | `() => void`                               | toggle internal | Handler invoked when the switch is clicked.                  |
| `size`            | `number \| 'small' \| 'medium' \| 'large'` | `'medium'`      | Determines the track width; preset labels map to 32/48/60px. |
| `trackSize`       | `number`                                   | `height + 4`    | Overrides the track thickness independently of `size`.       |
| `color`           | `UseColorTemplateColor` (except `default`) | `'brand'`       | Active color applied to the track when checked.              |
| `disabled`        | `boolean`                                  | `false`         | Disables interaction and dims colors.                        |
| `icon`            | `ReactElement`                             | —               | Optional content rendered inside the thumb.                  |
| `slotProps.track` | `TagProps`                                 | —               | Style or extend the track element.                           |
| `slotProps.thumb` | `TagProps`                                 | —               | Style or extend the thumb element.                           |
| `...rest`         | `TagProps<'input'>`                        | —               | Passed to the hidden input (name, value, aria-*).            |

## Usage Examples

### Switch with label and helper text
Compose the control with text and control focus via state.

```tsx
import { useState } from 'react';
import Switch from '@xanui/ui/Switch';

export default function NotificationsToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Switch checked={enabled} onChange={() => setEnabled((prev) => !prev)} name="notifications" />
      <span>
        Enable notifications
        <small style={{ display: 'block', color: '#888' }}>Receive summaries once a week.</small>
      </span>
    </label>
  );
}
```

### Custom track and thumb
Override `slotProps` to create compact switches with icons.

```tsx
import Switch from '@xanui/ui/Switch';
import CheckIcon from '@xanui/icons/Check';

export default function CustomSwitch() {
  return (
    <Switch
      size="small"
      color="success"
      icon={<CheckIcon fontSize="small" />}
      slotProps={{
        track: { bgcolor: 'success.light', border: '1px solid', borderColor: 'success.main' },
        thumb: { shadow: 1 },
      }}
      checked
    />
  );
}
```
