# @xanui/ui Documentation

Component-by-component reference for `@xanui/ui`, a React 19 UI library built on [`@xanui/core`](https://github.com/devnax/xanui-core).

Start here: **[Core Concepts](./docs/core-concepts.md)** — the shared `Tag` primitive, theming, color tokens, responsive breakpoint props, `slotProps`, skeleton loading, and transitions that every component below builds on.

## Layout

- [Box](./docs/Box.md)
- [Stack](./docs/Stack.md)
- [Container](./docs/Container.md)
- [GridContainer](./docs/GridContainer.md)
- [GridItem](./docs/GridItem.md)
- [ViewBox](./docs/ViewBox.md)
- [Divider](./docs/Divider.md)
- [Layer](./docs/Layer.md)

## Typography

- [Text](./docs/Text.md)
- [Label](./docs/Label.md)
- [Link](./docs/Link.md)

## Buttons & Actions

- [Button](./docs/Button.md)
- [IconButton](./docs/IconButton.md)
- [ButtonGroup](./docs/ButtonGroup.md)

## Forms & Inputs

- [Input](./docs/Input.md)
- [InputNumber](./docs/InputNumber.md)
- [PasswordInput](./docs/PasswordInput.md)
- [Checkbox](./docs/Checkbox.md)
- [Radio](./docs/Radio.md)
- [Switch](./docs/Switch.md)
- [RangeSlider](./docs/RangeSlider.md)
- [Select](./docs/Select.md)
- [Option](./docs/Option.md)
- [Autocomplete](./docs/Autocomplete.md)
- [Calendar](./docs/Calendar.md)
- [CalendarInput](./docs/CalendarInput.md)
- [Form](./docs/Form.md)

## Feedback & Status

- [Alert](./docs/Alert.md)
- [Toast](./docs/Toast.md)
- [Skeleton](./docs/Skeleton.md)
- [CircleProgress](./docs/CircleProgress.md)
- [LineProgress](./docs/LineProgress.md)
- [LoadingBox](./docs/LoadingBox.md)

## Overlays

- [Modal](./docs/Modal.md)
- [Drawer](./docs/Drawer.md)
- [Menu](./docs/Menu.md)
- [Tooltip](./docs/Tooltip.md)
- [Portal](./docs/Portal.md)
- [ClickOutside](./docs/ClickOutside.md)
- [Transition](./docs/Transition.md) *(internal — see note below)*

## Data Display

- [Card](./docs/Card.md)
- [Datatable](./docs/Datatable.md)
- [DataFilter](./docs/DataFilter.md)
- [Table](./docs/Table.md)
- [TableHead](./docs/TableHead.md)
- [TableBody](./docs/TableBody.md)
- [TableRow](./docs/TableRow.md)
- [TableCell](./docs/TableCell.md)
- [TableFooter](./docs/TableFooter.md)
- [TablePagination](./docs/TablePagination.md)
- [Avatar](./docs/Avatar.md)
- [AvatarBox](./docs/AvatarBox.md)
- [Chip](./docs/Chip.md)
- [Badge](./docs/Badge.md)

## Navigation

- [Tabs](./docs/Tabs.md)
- [Tab](./docs/Tab.md)
- [Accordion](./docs/Accordion.md)
- [List](./docs/List.md)
- [ListItem](./docs/ListItem.md)

## Media & File Handling

- [Image](./docs/Image.md)
- [Carousel](./docs/Carousel.md)
- [GalleryPicker](./docs/GalleryPicker.md)
- [AvatarPicker](./docs/AvatarPicker.md)
- [FilePicker](./docs/FilePicker.md)

## Utilities

- [Scrollbar](./docs/Scrollbar.md)
- [NoSSR](./docs/NoSSR.md)
- [useCorner](./docs/useCorner.md)
- [useContextMenu](./docs/useContextMenu.md)
- [useBlurCss](./docs/useBlurCss.md) *(internal — see note below)*
- [useClickOutside](./docs/useClickOutside.md) *(internal, currently unused — see note below)*

## Notes on the current source

A handful of things surfaced while writing these docs that are worth knowing before relying on them:

- **`Collapse` is exported as `Collaps`** in `src/index.tsx` — almost certainly a typo, but it's the name you have to import today (`import { Collaps as Collapse } from "@xanui/ui"`). See [Collapse.md](./docs/Collapse.md).
- **Internal-only utilities**: `useBlurCss` and `useClickOutside` are not exported from the package root (`src/index.tsx`). `useClickOutside` additionally appears unused anywhere in the current source — `ClickOutside` re-implements the same logic inline instead of calling it.
- **`Transition` (`src/Transition/`) is a separate, parallel implementation** of `@xanui/core`'s `Transition`, not a wrapper around it, and doesn't appear to be used by any other component in this package — everything else (`Toast`, `Menu`, `Layer`) imports `Transition` from `@xanui/core` directly.
- A few theme-registration keys have typos baked into the source (e.g. `Calendar` is registered as `"Calender"`, `AvatarPicker` as `"AvaterPicker"`) — flagged in each affected doc since they're the actual keys needed to target those components via theme component-transforms.

These are documented as-is (matching current behavior) rather than "corrected," since fixing them is a source-code change outside the scope of this documentation pass.
