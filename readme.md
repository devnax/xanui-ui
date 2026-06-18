# @xanui/ui

A modern, fully-typed React UI component library built on top of [`@xanui/core`](https://github.com/devnax/xanui-core).

`@xanui/ui` provides a complete set of accessible, themeable, and composable components — from basic building blocks like buttons and inputs to complex patterns like data tables, autocompletes, and filters — so you can build production UIs faster without sacrificing flexibility.

## ✨ Features

- 🧩 **60+ Components** — buttons, inputs, modals, menus, tables, calendars, and more
- 🎨 **Themeable** — built on `@xanui/core`'s theming and color template system
- 📱 **Responsive by default** — breakpoint-aware props (`useBreakpointPropsType`) on most components
- 🟦 **TypeScript-first** — fully typed props, refs, and slot APIs
- 🧱 **Composable slot system** — override internal parts via `slotProps` without forking components
- ⚡ **Tree-shakeable** — import only what you use
- 🪶 **Lightweight core** — no heavy third-party UI dependencies

## 📦 Installation

```bash
npm install @xanui/ui @xanui/core @xanui/icons
```

```bash
yarn add @xanui/ui @xanui/core @xanui/icons
```

```bash
pnpm add @xanui/ui @xanui/core @xanui/icons
```

> `@xanui/core` and `@xanui/icons` are required peer dependencies.

## 🚀 Quick Start

```tsx
import { ThemeProvider } from "@xanui/core";
import { Button, Input, Card } from "@xanui/ui";

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Input label="Email" placeholder="you@example.com" fullWidth />
        <Button color="primary" variant="fill">
          Submit
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

## 🧱 Components

A few highlights from the library:

| Category | Components |
|---|---|
| **Form** | `Input`, `InputNumber`, `PasswordInput`, `Select`, `Autocomplete`, `Checkbox`, `Radio`, `Switch`, `RangeSlider`, `CalendarInput` |
| **Layout** | `Box`, `Stack`, `Container`, `GridContainer`, `GridItem`, `ViewBox`, `Divider` |
| **Feedback** | `Alert`, `Toast`, `Skeleton`, `CircleProgress`, `LineProgress`, `LoadingBox` |
| **Overlay** | `Modal`, `Drawer`, `Menu`, `Tooltip`, `Layer`, `Portal` |
| **Data Display** | `Datatable`, `DataFilter`, `Table`, `Avatar`, `AvatarBox`, `Chip`, `Badge`, `Card` |
| **Navigation** | `Tabs`, `Tab`, `List`, `ListItem`, `Accordion` |
| **Media** | `Image`, `Carousel`, `GalleryPicker`, `AvatarPicker`, `FilePicker` |

Full documentation and live examples are coming soon on our documentation site.

## 🛠 Tech Stack

- **React 19**
- **TypeScript**
- **[@xanui/core](https://github.com/devnax/xanui-core)** — theming engine, `Tag` primitive, and shared hooks
- **[@xanui/icons](https://www.npmjs.com/package/@xanui/icons)** — icon set used across components

## 📄 License

MIT

## 👤 Author

**Devnax (Naxrul Ahmed)**
Full-Stack Software Engineer

- GitHub: [@devnax](https://github.com/devnax)
- npm: [~devnax](https://www.npmjs.com/~devnax)
- LinkedIn: [devnax](https://linkedin.com/in/devnax)

---

📚 Full documentation coming soon.
