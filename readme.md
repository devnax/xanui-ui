# XanUI UI Library

XanUI is a React design-system toolkit powered by `@xanui/core`. It combines low-level primitives (e.g., `Box`, `Stack`, `Layer`) with application-ready components (e.g., `Accordion`, `Modal`, `Datatable`, `Toast`) so product teams can build polished surfaces quickly while keeping full control over styling tokens.

## Highlights

- **Unified prop surface** – every component extends the `Tag` API, so spacing, layout, breakpoints, and system tokens behave identically across the library.
- **Production-ready defaults** – the color palette, typography scale, shadows, and radii mirror modern SaaS expectations yet remain overridable.
- **Server compatible** – SSR-safe patterns ensure components render on the server and hydrate cleanly on the client.
- **Documentation first** – each component ships with a dedicated Markdown guide in `docs/`, ready for consumption by the upcoming Next.js documentation site.

## Installation

```bash
npm install @xanui/ui

```

Required peer packages (`react`, `react-dom`, `@xanui/core`, `@xanui/icons`) should already exist in your project; otherwise, install them alongside XanUI.

## Quick Start

```tsx
import ThemeProvider from '@xanui/ui/ThemeProvider';
import Box from '@xanui/ui/Box';
import Button from '@xanui/ui/Button';

export default function App() {
  return (
    <ThemeProvider theme="light">
      <Box p={3} gap={2} display="flex" flexDirection="column">
        <h1>Welcome</h1>
        <Button color="brand" onClick={() => alert('Hello from XanUI!')}>
          Get Started
        </Button>
      </Box>
    </ThemeProvider>
  );
}
```

### Theming and Tokens

`ThemeProvider` injects the active token set from `@xanui/core`. At the component level you can:

- Provide responsive props (`{ xs: 'column', md: 'row' }`) via `useBreakpointProps`.
- Override styles with `sx`/`sxr` objects or custom CSS classes via `baseClass`.
- Extend color templates by registering new palettes in the core theme manager.

## Documentation & Examples

- **Component guides** – `docs/<Component>.md` follows a consistent structure (overview → basic example → props table → scenario examples). These files serve both as standalone references and as the content source for the forthcoming Next.js docs site (`documentation/`).
- **Playground** – `example/` contains runnable demos that mirror the documentation examples.

Once the Next.js docs site scaffolding is complete, run it with:

```bash
cd documentation
npm install
npm run dev
```

## Component Index

| Category               | Components                                                                                                                                                      | Docs                                                                                                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout & Surfaces      | Box, Stack, Container, GridContainer, GridItem, Paper, Layer, ViewBox, Divider                                                                                  | `docs/Box.md`, `docs/Stack.md`, `docs/Container.md`, `docs/GridContainer.md`, `docs/GridItem.md`, `docs/Paper.md`, `docs/Layer.md`, `docs/ViewBox.md`, `docs/Divider.md`                                                                                |
| Navigation             | Tabs, Tab, List, ListItem, Menu, Drawer                                                                                                                         | `docs/Tabs.md`, `docs/Tab.md`, `docs/List.md`, `docs/ListItem.md`, `docs/Menu.md`, `docs/Drawer.md`                                                                                                                                                     |
| Data Display           | Table (and TableBody/TableCell/TableFooter/TableHead/TablePagination/TableRow), Datatable, Chip, Avatar, Image, Badge, CircleProgress, LineProgress, LoadingBox | `docs/Table*.md`, `docs/Datatable.md`, `docs/Chip.md`, `docs/Avatar.md`, `docs/Image.md`, `docs/Badge.md`, `docs/CircleProgress.md`, `docs/LineProgress.md`, `docs/LoadingBox.md`                                                                       |
| Inputs & Forms         | Button, ButtonGroup, IconButton, Form, Input, Select, Option, Checkbox, Radio, Switch, Calendar, CalendarInput, Label                                           | `docs/Button.md`, `docs/ButtonGroup.md`, `docs/IconButton.md`, `docs/Form.md`, `docs/Input.md`, `docs/Select.md`, `docs/Option.md`, `docs/Checkbox.md`, `docs/Radio.md`, `docs/Switch.md`, `docs/Calendar.md`, `docs/CalendarInput.md`, `docs/Label.md` |
| Disclosure & Feedback  | Accordion, Collaps, Alert, Toast, Tooltip, Modal, Portal, Scrollbar, Toast, NoSSR                                                                               | `docs/Accordion.md`, `docs/Collaps.md`, `docs/Alert.md`, `docs/Toast.md`, `docs/Tooltip.md`, `docs/Modal.md`, `docs/Portal.md`, `docs/Scrollbar.md`, `docs/NoSSR.md`                                                                                    |
| Typography & Utilities | Text, ThemeProvider, useCorner, ClickOutside, View helpers                                                                                                      | `docs/Text.md`, `docs/ThemeProvider.md`, `docs/useCorner.md`, `docs/ClickOutside.md`, `docs/ViewBox.md`                                                                                                                                                 |

> The full list is available in `docs/`. Each entry adheres to the shared documentation template for easy navigation and consistency.

## Local Development

```bash
npm install
npm run start   # runs makepack dev server plus the example playground
npm run build   # bundles the library via makepack
```

The development workflow encourages updating `docs/` alongside the corresponding component so examples stay truthful. The `example/` playground hot-reloads component changes for rapid iteration.

## Contributing

1. Fork this repository and clone your fork.
2. Install dependencies via `npm install`.
3. Implement your change (component, hook, docs, or tooling) inside `src/` and update/author `docs/<Component>.md` accordingly.
4. Run `npm run start` to validate the example playground and lint output.
5. Open a pull request with a clear description, screenshots when UI changes occur, and reference to relevant documentation updates.

Guidelines:

- Keep new components aligned with the `TagProps` surface (spacing, layout, color tokens, responsive props).
- Provide at least one example in `example/` when adding new UI patterns.
- Maintain the established documentation structure (overview, basic example, props table, scenario demos).

## License

Distributed under the MIT License. Refer to `LICENSE` for full text.

