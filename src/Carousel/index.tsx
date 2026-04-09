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

const Carousel = ({ children, slidesToShow = 3, slidesToScroll = 2 }: Props) => {
    const childs = Children.toArray(children)
    const total = childs.length
    const [index, setIndex] = useState(0)
    const track = useRef<HTMLElement>(null)
    const animating = useRef(() => { })
    const state = useRef({ x: 0 })

    const goto = (_index: number) => {

        if (_index < 0) _index = 0;
        if (_index >= total) {
            _index = (_index % total)
        }
        console.log(_index);

        setIndex(_index);

        const trackEle = track.current!;
        const itemWidth = 100 / slidesToShow
        const translate = itemWidth * _index
        trackEle.style.transform = `translateX(-${translate}%)`
        animating.current();
        animating.current = animate({
            duration: 300,
            from: { x: state.current.x },
            to: { x: translate },
            onUpdate: ({ x }) => {
                state.current.x = x
                trackEle.style.transform = `translateX(-${x}%)`
            },
        });
    }

    const next = () => {
        goto(index + slidesToScroll);
    };

    const prev = () => {
        goto(index - slidesToScroll);
    }


    useLayoutEffect(() => {
        goto(0)
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
                    childs.map((child, index) => (
                        <Box
                            key={`${index}`}
                            width={`${100 / slidesToShow}%`}
                            flexShrink={0}
                            p={1}
                        >
                            {child}
                        </Box>
                    ))
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