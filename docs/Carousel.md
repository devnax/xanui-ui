# Carousel

A slidable/draggable carousel that shows one or more children per "page" with optional autoplay, looping, and enter/exit transitions.

## Import

```tsx
import { Carousel } from "@xanui/ui";
```

## Overview

`Carousel` lays its children out in a horizontal track and animates a `translateX` offset (via `@xanui/core`'s `animate`) to move between slides. It supports pointer/touch dragging (swipe threshold of 50px), optional autoplay with a configurable interval, optional looping, and per-slide `Transition` animations when a `transition` variant is supplied. An imperative `ref` (`CarouselRef`) exposes `next`, `prev`, `goTo`, and `getIndex`. It's registered with `useThemeComponent("Carousel", ...)`. All slide-behavior props accept responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | **Required.** Each direct child becomes one slide. |
| `slidesToShow` | `useBreakpointPropsType<number>` | `1` | Number of slides visible at once (clamped to `[1, total]`). |
| `slidesToScroll` | `useBreakpointPropsType<number>` | `1` | Number of slides advanced per `next`/`prev` call (clamped to `[1, slidesToShow]`). |
| `infinite` | `useBreakpointPropsType<boolean>` | — | Declared in the type but not read/used in the current implementation (looping behavior is actually controlled by `loop`). |
| `autoplay` | `useBreakpointPropsType<boolean>` | `false` | Automatically advances via `next()` every `autoplayInterval` ms; pauses on pointer hover, resumes on leave. |
| `autoplayInterval` | `useBreakpointPropsType<number>` | `3000` | Milliseconds between autoplay advances. |
| `loop` | `useBreakpointPropsType<boolean>` | `false` (or `true` automatically if `autoplay` is `true`) | Whether `next`/`prev` wrap around at the ends instead of clamping. |
| `duration` | `useBreakpointPropsType<number>` | `500` | Animation duration (ms) for both the slide-track transform and any per-slide `Transition`. |
| `transition` | `useBreakpointPropsType<TransitionProps["variant"]>` | `undefined` (no per-slide transition, just the track transform) | Wraps each slide in a `Transition` with this variant (e.g. `"fade"`, `"zoom"`, `"slideUp"`, ...) when set. |
| `easing` | `useBreakpointPropsType<TransitionProps["easing"]>` | `undefined` | Easing passed through to the per-slide `Transition`. |
| `onChange` | `(index: number, indexes: number[]) => void` | — | Called whenever the visible slide index changes (via `goTo`), with the new start index and the full array of visible indexes. |
| `onNext` | `(index: number, indexes: number[]) => void` | — | Called when advancing via `next()` (including autoplay/swipe-left), before the move animates. |
| `onPrev` | `(index: number, indexes: number[]) => void` | — | Called when going back via `prev()` (including swipe-right), before the move animates. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note `children`, `onChange`, and `transition` are re-typed from the base `TagProps` as described above.

## Examples

### Basic usage

```tsx
import { Carousel } from "@xanui/ui";

<Carousel>
  <img src="/slide1.jpg" />
  <img src="/slide2.jpg" />
  <img src="/slide3.jpg" />
</Carousel>
```

### Multiple slides per view, autoplay, and a fade transition

```tsx
import { Carousel, Card, Text } from "@xanui/ui";

<Carousel
  slidesToShow={{ xs: 1, md: 3 }}
  slidesToScroll={1}
  autoplay
  autoplayInterval={4000}
  loop
  transition="fade"
  duration={400}
  onChange={(index, indexes) => console.log("visible:", indexes)}
>
  {items.map((item) => (
    <Card key={item.id}>
      <Text>{item.title}</Text>
    </Card>
  ))}
</Carousel>
```

### Controlling via ref

```tsx
import { Carousel, CarouselRef, Button, Stack } from "@xanui/ui";
import { useRef } from "react";

const ref = useRef<CarouselRef>(null);

<Stack gap={1}>
  <Carousel ref={ref}>
    <div>Slide A</div>
    <div>Slide B</div>
    <div>Slide C</div>
  </Carousel>
  <Stack flexRow gap={1}>
    <Button onClick={() => ref.current?.prev()}>Prev</Button>
    <Button onClick={() => ref.current?.next()}>Next</Button>
    <Button onClick={() => ref.current?.goTo(0)}>First</Button>
  </Stack>
</Stack>
```

## Notes

- `infinite` is present in `CarouselProps` but is not actually consumed anywhere in the implementation — use `loop` to control wraparound.
- Dragging/swiping is supported via both pointer and touch events; a horizontal drag past 50px triggers `prev`/`next`.
- The exported `CarouselRef` type (`next`, `prev`, `goTo`, `getIndex`) lets you drive the carousel from outside, e.g. custom nav buttons or indicators.
- When `transition` is unset, slides simply slide via the track's CSS transform; setting `transition` additionally mounts/unmounts non-visible slides through `Transition`'s enter/exit animation (see [Core Concepts → Transitions](./core-concepts.md#transitions)).
