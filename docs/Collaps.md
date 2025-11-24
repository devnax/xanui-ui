# Collaps

`Collaps` animates vertical show/hide transitions using XanUI's `Transition` engine, perfect for accordion bodies and expandable sections.

## Basic Example

Toggle content visibility via local state.

```tsx
import { useState } from 'react';
import Collaps from '@xanui/ui/Collaps';

export default function BasicCollaps() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
      <Collaps open={open}>
        <p>Additional details appear here.</p>
      </Collaps>
    </div>
  );
}
```

## Props

| Name                                                               | Type               | Default       | Description                                          |
| ------------------------------------------------------------------ | ------------------ | ------------- | ---------------------------------------------------- |
| `open`                                                             | `boolean`          | `false`       | Controls whether the content is visible.             |
| `duration`                                                         | `number`           | theme default | Transition duration in milliseconds.                 |
| `easing` / `ease`                                                  | `TransitionEasing` | `'easeOut'`   | Controls the transition curve.                       |
| `delay`                                                            | `number`           | `0`           | Adds a delay before the animation starts.            |
| `onStart`, `onFinish`, `onOpen`, `onOpened`, `onClose`, `onClosed` | `() => void`       | —             | Lifecycle callbacks from the `Transition` component. |
| `children`                                                         | `ReactNode`        | —             | Content that expands/collapses vertically.           |

## Usage Examples

### Nested inside Accordion
Combine with `Accordion` when you need extra control over the transition props.

```tsx
import Accordion from '@xanui/ui/Accordion';
import Collaps from '@xanui/ui/Collaps';

export default function AccordionBody({ open }: { open: boolean }) {
  return (
    <Collaps open={open} duration={280} easing="easeInOut">
      <p>Accordion content with custom timing.</p>
    </Collaps>
  );
}
```

### Delayed entrance
Use `delay` to stage sequential animations for staggered panels.

```tsx
import Collaps from '@xanui/ui/Collaps';

export default function StaggeredCollaps({ index, open }: { index: number; open: boolean }) {
  return (
    <Collaps open={open} delay={index * 80}>
      <div>Row {index + 1}</div>
    </Collaps>
  );
}
```
