# ThemeProvider

`ThemeProvider` wraps the core `@xanui/core` provider and automatically mounts XanUI's component registry, ensuring every component receives tokens and default props.

## Basic Example

```tsx
import ThemeProvider from '@xanui/ui/ThemeProvider';

export default function AppRoot() {
  return (
    <ThemeProvider theme="light">
      <App />
    </ThemeProvider>
  );
}
```

## Props

All props mirror `@xanui/core`'s `ThemeProviderProps` with one addition: `renderIsRoot` is automatically merged with XanUI's internal component renderer.

| Name           | Type                 | Default     | Description                                                                                      |
| -------------- | -------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `theme`        | `string`             | `'default'` | Active theme name registered in the core theme manager.                                          |
| `mode`         | `'light' \| 'dark'`  | inherited   | Force a color mode if your tokens differentiate.                                                 |
| `renderIsRoot` | `ReactNode`          | —           | Extra JSX rendered once near `document.body`; combined with XanUI's internal `RenderComponents`. |
| `children`     | `ReactNode`          | —           | App subtree receiving the theme context.                                                         |
| `...rest`      | `ThemeProviderProps` | —           | Any other configuration supported by `@xanui/core`.                                              |

## Usage Tips
- Wrap your entire application once at the entry point (e.g., `main.tsx`).
- Provide custom themes via the core `useThemeManager` APIs before rendering.
