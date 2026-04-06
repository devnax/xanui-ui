import { animate } from '@xanui/core';
import Box from '../Box';
import Button from '../Button';
import Stack from '../Stack';
import { Children, ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react'

const infinityChunkByScroll = (
    page: number,
    slidesToShow: number,
    slidesToScroll: number,
    total: number
) => {
    if (total <= 0 || slidesToShow <= 0 || slidesToScroll <= 0) {
        return { current: [], new: [] };
    }

    const getChunk = (p: number) => {
        let start = (p * slidesToScroll) % total;
        if (start < 0) start += total;

        const arr: number[] = [];
        for (let i = 0; i < slidesToShow; i++) {
            arr.push((start + i) % total);
        }
        return arr;
    };

    const current = getChunk(page);
    const prev = getChunk(page - 1);

    // entering items
    const newItems = current.filter(i => !prev.includes(i)) as number[]

    // remaining items (not new)
    //  const oldItems = current.filter(i => !newItems.includes(i)) as number[]

    return { current, new: newItems };
};

export type Props = {
    children: ReactNode;
    slidesToShow?: number
    slidesToScroll?: number
}

const Carousel = ({ children, slidesToShow = 3, slidesToScroll = 3 }: Props) => {
    const childs = Children.toArray(children)
    const total = childs.length
    const [page, setPage] = useState(0)
    const track = useRef<HTMLElement>(null)
    const animating = useRef(() => { })

    const next = () => {
        setPage(p => p + 1)
        const trackEle = track.current!;
        const itemWidth = 100 / slidesToShow
        trackEle.style.transform = `translateX(-${0}%)`

        animating.current();
        animating.current = animate({
            duration: 300,
            from: { x: 0 },
            to: { x: itemWidth * slidesToScroll },
            onUpdate: ({ x }) => {
                trackEle.style.transform = `translateX(-${x}%)`
            },
        });
    };

    const prev = () => {
        setPage(p => p - 1)
        const trackEle = track.current!;
        const itemWidth = 100 / slidesToShow
        trackEle.style.transform = `translateX(-${66}%)`

        animating.current();
        animating.current = animate({
            duration: 300,
            from: { x: itemWidth * slidesToScroll },
            to: { x: 0 },
            onUpdate: ({ x }) => {
                trackEle.style.transform = `translateX(-${x}%)`
            },
        });
    }

    const slides = useMemo(() => {
        return [
            infinityChunkByScroll(page - 1, slidesToShow, slidesToScroll, total).current,
            infinityChunkByScroll(page, slidesToShow, slidesToScroll, total).new,
            infinityChunkByScroll(page + 1, slidesToShow, slidesToScroll, total).new,
        ]
    }, [page, slidesToShow, slidesToScroll, total])

    useLayoutEffect(() => {
        const trackEle = track.current!;
        const itemWidth = 100 / slidesToShow
        trackEle.style.transform = `translateX(-${itemWidth * slidesToScroll}%)`
    }, [])

    const startX = useRef(0);
    const isDragging = useRef(false);

    const handleStart = (x: number) => {
        startX.current = x;
        isDragging.current = true;
    };

    const handleEnd = (x: number) => {
        if (!isDragging.current) return;
        const diff = x - startX.current;
        if (diff > 50) prev();
        else if (diff < -50) next();
        isDragging.current = false;
    };

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

                onPointerDown={(e: any) => {
                    e.preventDefault()
                    handleStart(e.clientX)
                }}
                onPointerUp={(e: any) => handleEnd(e.clientX)}
                onTouchStart={(e: any) => {
                    e.preventDefault()
                    handleStart(e.touches[0].clientX)
                }}
                onTouchEnd={(e: any) => handleEnd(e.changedTouches[0].clientX)}
            >
                {
                    slides.map(((items) => {
                        return items.map((index) => (
                            <Box
                                // key={`${index}`}
                                width={`${100 / slidesToShow}%`}
                                flexShrink={0}
                                p={1}
                            >
                                {childs[index]}
                            </Box>
                        ))
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
                        prev()
                    }}
                >Prev</Button>
                <Button
                    onClick={() => {
                        next()
                    }}
                >Next</Button>
            </Stack>
        </Box>
    )
}

export default Carousel