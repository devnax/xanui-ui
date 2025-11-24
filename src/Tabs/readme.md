# Tabs
Container managing multiple Tab headers and associated panels.

## Import
```tsx
import { Tabs, Tab } from '@xanui/ui';
```

## Usage
```tsx
<Tabs value={active} onChange={setActive}>
  <Tab value="profile">Profile</Tab>
  <Tab value="settings">Settings</Tab>
</Tabs>
{active==='profile' && <Profile />}
{active==='settings' && <Settings />}
```

## Props (summary)
| Name     | Type                | Description       |
| -------- | ------------------- | ----------------- |
| value    | string              | Active tab value. |
| onChange | (value) => void     | Change handler.   |
| children | Tab[]               | Tab elements.     |
| variant  | string              | Visual style.     |
| color    | ColorTemplateColors | Accent color.     |

## Best Practices
Persist tab state in URL for deep-linking when appropriate.
