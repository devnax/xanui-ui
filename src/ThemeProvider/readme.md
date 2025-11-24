# ThemeProvider
Provides design tokens, color modes, and component registrations.

## Import
```tsx
import { ThemeProvider } from '@xanui/ui';
```

## Usage
```tsx
<ThemeProvider theme="light">
  <App />
</ThemeProvider>
```

## Props (extends core ThemeProvider)
| Name         | Type      | Description                   |
| ------------ | --------- | ----------------------------- |
| theme        | string    | Active theme name.            |
| mode         | 'light'   | 'dark'                        | Color mode if supported. |
| renderIsRoot | ReactNode | Extra root-level render hook. |

## Best Practices
Wrap once near app root. Use context hooks from core for dynamic theming.
