import Box from '../Box';
import Button from '../Button';
import Stack from '../Stack';
import { Children, ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react'


type AnimateOptions = {
    from: number;
    to: number;
    duration: number;
    onUpdate: Function
    onDone: Function
}

const animate = ({ from, to, duration = 400, onUpdate, onDone }: AnimateOptions) => {
    const start = performance.now();

    const frame = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);

        // ease-out cubic (same feel as your bezier)
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = from + (to - from) * eased;

        onUpdate(value);

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            onDone?.();
        }
    };

    requestAnimationFrame(frame);
};

const infinityChunk = (page: number, perpage: number, total: number) => {
    if (total <= 0 || perpage <= 0) return [];

    const result: number[] = [];
    let start = (page * perpage) % total;
    if (start < 0) start += total;

    for (let i = 0; i < perpage; i++) {
        result.push((start + i) % total);
    }

    return result;
};

const infinityChunks = (
    page: number,
    slidesToShow: number,
    slidesToScroll: number,
    total: number
) => {
    if (total <= 0 || slidesToShow <= 0 || slidesToScroll <= 0) return [];

    const result: number[] = [];

    let start = (page * slidesToScroll) % total;
    if (start < 0) start += total;

    for (let i = 0; i < slidesToShow; i++) {
        result.push((start + i) % total);
    }

    return result;
};

export type Props = {
    children: ReactNode;
    slidesToShow?: number
    slidesToScroll?: number
}

const Carousel = ({ children, slidesToShow = 3, slidesToScroll = 4 }: Props) => {

    const childs = Children.toArray(children)
    const total = childs.length
    const [index, setIndex] = useState(0)
    const [page, setPage] = useState(0)
    const track = useRef<HTMLElement>(null)

    const goto = (index: number) => {
        const slideWidth = 100 / slidesToShow
        const translate = slideWidth * index

        const el = track.current as HTMLElement

        el.style.transition = `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)`
        el.style.transform = `translate3d(-${translate}%, 0, 0)`
    }

    return (
        <Box
            sx={{
                width: "100%",
                overflow: "hidden",
                cursor: "grab",
                touchAction: "pan-y",
                position: "relative",
            }}
        >
            <Stack
                flexRow
                ref={track}
                sx={{
                    display: "flex",
                    willChange: "transform"
                }}
            >
                {
                    childs.map(((child, i) => {
                        return (
                            <Box
                                key={`n${i}`}
                                width={`${100 / slidesToShow}%`}
                                flexShrink={0}
                                p={1}
                                data-index={i}
                            >
                                {child}
                            </Box>
                        )
                    }))
                }
            </Stack>
            <Stack
                flexRow
                gap={2}
                p={1}
            >
                <Button
                    onClick={() => {
                        const nextPage = page - 1

                        const c = infinityChunks(nextPage, slidesToShow, slidesToScroll, total)
                        setPage(nextPage)
                        console.log(c);
                    }}
                >Prev</Button>
                <Button
                    onClick={() => {
                        const nextPage = page + 1

                        const c = infinityChunks(nextPage, slidesToShow, slidesToScroll, total)
                        setPage(nextPage)
                        console.log(c);

                        return
                        const nextIndexes = infinityChunk(nextPage, slidesToScroll, total)
                        const nextIndex = (nextIndexes.length + slidesToShow) - slidesToScroll
                        setIndex(nextIndex)
                        console.log(nextIndexes);


                        if (nextIndex + slidesToShow >= total) {
                            console.log(nextIndex);

                        }


                        const ele = track.current as HTMLElement
                        const slideWidth = 100 / slidesToShow;
                        const translate = nextIndex * slideWidth;

                        ele.style.transition = `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)`
                        ele.style.transform = `translate3d(-${translate}%, 0, 0)`
                    }}
                >Next</Button>
            </Stack>
        </Box>
    )
}

export default Carousel