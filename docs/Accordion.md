# Accordion

The `Accordion` component displays collapsible sections with optional titles, subtitles, and contextual actions. It is fully controlled-ready and adapts to responsive props through the core breakpoint system.

## Basic Example

Simple uncontrolled accordion that toggles itself when the header is clicked.

```tsx
import Accordion from '@xanui/ui/Accordion';

export default function BasicAccordion() {
    return (
        <Accordion title="Payment details" subtitle="Tap to reveal">
            Securely store your cards and billing preferences inside the panel content.
        </Accordion>
    );
}
```

## Props

| Name                          | Type                                                               | Default           | Description                                                                   |
| ----------------------------- | ------------------------------------------------------------------ | ----------------- | ----------------------------------------------------------------------------- |
| `title`                       | `string \| ReactElement`                                           | —                 | Main label rendered in the header; accepts responsive values.                 |
| `subtitle`                    | `string \| ReactElement`                                           | —                 | Secondary text displayed under the title.                                     |
| `expand`                      | `boolean`                                                          | uncontrolled      | Controls the open state when provided.                                        |
| `onClick`                     | `() => void`                                                       | internal toggle   | Called when the header is clicked; combine with `expand` for controlled mode. |
| `startIcon` / `endIcon`       | `ReactElement`                                                     | —                 | Decorative icons placed before or after the header content.                   |
| `expandIcon`                  | `ReactElement`                                                     | chevron           | Custom indicator shown near the header.                                       |
| `expandIconPlacement`         | `'start' \| 'end'`                                                 | `'end'`           | Where to render the expand icon relative to the header.                       |
| `expandAction`                | `'header' \| 'icon'`                                               | `'header'`        | Whether toggling occurs on the full header or just the icon.                  |
| `color` / `variant`           | `UseColorTemplateColor` / `UseColorTemplateType`                   | `brand` / `alpha` | Visual styling tokens for the header.                                         |
| `hoverColor` / `hoverVariant` | `UseColorTemplateColor` / `UseColorTemplateType`                   | inherit           | Hover palette overrides.                                                      |
| `slotProps`                   | `{ header, headerContent, collaps, content, expandIconContainer }` | —                 | Fine-grained overrides for internal subcomponents.                            |

## Usage Examples

### Controlled accordion
Use `expand` and `onClick` to integrate with parent state or open multiple panels at once.

```tsx
import { useState } from 'react';
import Accordion from '@xanui/ui/Accordion';

export default function ControlledAccordion() {
    const [open, setOpen] = useState(false);

    return (
        <Accordion
            title="Shipping options"
            expand={open}
            onClick={() => setOpen((prev) => !prev)}
        >
            Toggle this panel from anywhere in your layout.
        </Accordion>
    );
}
```

### Custom icon placement
Display a custom expand icon at the start of the header while keeping an action icon on the end.

```tsx
import Accordion from '@xanui/ui/Accordion';
import InfoIcon from '@xanui/icons/Info';

export default function IconAccordion() {
    return (
        <Accordion
            title="FAQ"
            endIcon={<InfoIcon />}
            expandIconPlacement="start"
            hoverVariant="outline"
        >
            Mix and match icons, hover palettes, and slot props for a bespoke layout.
        </Accordion>
    );
}
```

