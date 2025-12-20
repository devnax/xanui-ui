# Tabs

`Tabs` manages a list of `Tab` buttons, animates an indicator, and reports selection changes via `value`/`onChange`.

## Basic Example

```tsx
import { useState } from 'react';
import Tabs from '@xanui/ui/Tabs';
import Tab from '@xanui/ui/Tab';

export default function BasicTabs() {
  const [value, setValue] = useState('profile');

  return (
    <>
      <Tabs value={value} onChange={setValue}>
        <Tab value="profile">Profile</Tab>
        <Tab value="settings">Settings</Tab>
        <Tab value="billing">Billing</Tab>
      </Tabs>
      {value === 'profile' && <div>Profile content</div>}
      {value === 'settings' && <div>Settings content</div>}
      {value === 'billing' && <div>Billing content</div>}
    </>
  );
}
```

## Props

| Name                | Type                                                                     | Default      | Description                                             |
| ------------------- | ------------------------------------------------------------------------ | ------------ | ------------------------------------------------------- |
| `value`             | `string \| number`                                                       | —            | Active tab value (controlled).                          |
| `onChange`          | `(value: string \| number) => void`                                      | —            | Receives the `value` of the clicked tab.                |
| `children`          | `ReactElement<TabProps> \| ReactElement<TabProps>[]`                     | —            | Tab components rendered inside the container.           |
| `variant`           | `'start-line' \| 'end-line' \| 'fill' \| 'outline' \| 'text' \| 'alpha'` | `'end-line'` | Indicator style and animation preset.                   |
| `color`             | `UseColorTemplateColor`                                                  | `'brand'`    | Accent color used by the indicator and selected tab.    |
| `verticle`          | `boolean`                                                                | `false`      | Displays tabs vertically instead of horizontally.       |
| `indicatorSize`     | `number`                                                                 | `3`          | Thickness of line indicators.                           |
| `disableTransition` | `boolean`                                                                | `false`      | Turns off indicator animation.                          |
| `slotProps.content` | `TagProps`                                                               | —            | Overrides applied to the container wrapper.             |
| `slotProps.button`  | `ButtonProps`                                                            | —            | Default props merged into each `Tab`.                   |
| `...rest`           | `TagProps`                                                               | —            | Additional layout and HTML props for the outer wrapper. |

## Usage Examples

### Vertical tabs
Enable the `verticle` flag to place tabs in a column with matching indicator.

```tsx
import { useState } from 'react';
import Tabs from '@xanui/ui/Tabs';
import Tab from '@xanui/ui/Tab';

export default function VerticalTabs() {
  const [value, setValue] = useState('analytics');

  return (
    <Tabs verticle value={value} onChange={setValue} color="secondary">
      <Tab value="analytics">Analytics</Tab>
      <Tab value="reports">Reports</Tab>
      <Tab value="exports">Exports</Tab>
    </Tabs>
  );
}
```

### Filled indicator style
Use the `fill` variant for pill-like backgrounds.

```tsx
import { useState } from 'react';
import Tabs from '@xanui/ui/Tabs';
import Tab from '@xanui/ui/Tab';

export default function FilledTabs() {
  const [value, setValue] = useState('day');

  return (
    <Tabs value={value} onChange={setValue} variant="fill" indicatorSize={6}>
      <Tab value="day">Day</Tab>
      <Tab value="week">Week</Tab>
      <Tab value="month">Month</Tab>
    </Tabs>
  );
}
```
