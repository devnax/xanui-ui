import { animate, Transition, TransitionProps } from '@xanui/core';
import Box from '../Box';
import Button from '../Button';
import Stack from '../Stack';
import { Children, forwardRef, ReactNode, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';

export type CarouselRef = {
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    getIndex: () => number;
};

export type CarouselProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "children" | "onChange"> & {
    children: React.ReactNode
    slidesToShow?: useBreakpointPropsType<number>;
    slidesToScroll?: useBreakpointPropsType<number>;
    infinite?: useBreakpointPropsType<boolean>;
    autoplay?: useBreakpointPropsType<boolean>;
    autoplayInterval?: useBreakpointPropsType<number>;
    loop?: useBreakpointPropsType<boolean>;
    duration?: useBreakpointPropsType<number>;
    delay?: useBreakpointPropsType<number>;
    transition?: useBreakpointPropsType<TransitionProps["variant"]>;
    easing?: useBreakpointPropsType<TransitionProps["easing"]>;

    onChange?: (index: number, indexes: number[]) => void;
    onNext?: (index: number, indexes: number[]) => void;
    onPrev?: (index: number, indexes: number[]) => void;
}

const Carousel = forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: CarouselProps<T>, ref: React.Ref<CarouselRef>) => {
    const [index, setIndex] = useState(0)
    const childs = Children.toArray(children)
    const total = childs.length
    const track = useRef<HTMLElement>(null)
    const animating = useRef(() => { })
    const state = useRef({ x: 0 })
    const childRefs = useRef<(HTMLDivElement | null)[]>([])

    let [{
        slidesToShow,
        slidesToScroll,
        loop,
        autoplay,
        autoplayInterval,
        duration,
        delay,
        transition,
        easing,

        onChange,
        onBeforeChange,
        onNext,
        onBeforeNext,
        onPrev,
        onBeforePrev,

        ...props
    }] = useInterface<any>("Carousel", rest, {})

    const _p: any = {}
    if (slidesToShow) _p.slidesToShow = slidesToShow
    if (slidesToScroll) _p.slidesToScroll = slidesToScroll
    if (loop) _p.loop = loop
    if (autoplay) _p.autoplay = autoplay
    if (autoplayInterval) _p.autoplayInterval = autoplayInterval
    if (duration) _p.duration = duration
    if (delay) _p.delay = delay
    if (transition) _p.transition = transition
    if (easing) _p.easing = easing


    const p: any = useBreakpointProps(_p)

    slidesToShow = p.slidesToShow ?? 2
    slidesToScroll = p.slidesToScroll ?? 1
    loop = p.loop ?? false
    autoplay = p.autoplay ?? false
    autoplayInterval = p.autoplayInterval ?? 3000
    duration = p.duration ?? 300
    delay = p.delay ?? 0
    transition = p.transition ?? "zoom"
    easing = p.easing ?? "easeInOutQuad"

    if (slidesToShow > total) {
        slidesToShow = total
    }
    if (slidesToScroll > total) {
        slidesToScroll = total
    }
    if (slidesToShow <= 0) {
        slidesToShow = 1
    }
    if (slidesToScroll <= 0) {
        slidesToScroll = 1
    }
    if (slidesToScroll > slidesToShow) {
        slidesToScroll = slidesToShow
    }

    const goTo = (_index: number) => {
        if (_index === index) return;
        if (_index < 0 || _index > total - slidesToShow) return;

        setIndex(_index);

        const indexes = []
        for (let i = 0; i < slidesToShow; i++) {
            indexes.push(_index + i)
        }
        onChange && onChange(_index, indexes)

        const itemWidth = 100 / slidesToShow
        const trackEle = track.current!;
        const translate = itemWidth * _index
        trackEle.style.transform = `translateX(-${translate}%)`
        animating.current();
        animating.current = animate({
            duration: duration,
            delay: delay,
            from: { x: state.current.x },
            to: { x: translate },
            onUpdate: ({ x }) => {
                state.current.x = x
                trackEle.style.transform = `translateX(-${x}%)`
            },
        });
    }

    const next = () => {
        let _index = index
        if (loop) {
            if (_index >= total - slidesToShow) {
                _index = 0
            } else if (index + slidesToScroll > total - slidesToShow) {
                _index = total - slidesToShow
            } else {
                _index = index + slidesToScroll
            }
        } else {
            if (_index >= total - slidesToShow) {
                _index = total - slidesToShow
            } else if (index + slidesToScroll > total - slidesToShow) {
                _index = total - slidesToShow
            } else {
                _index = index + slidesToScroll
            }
        }
        const indexes = []
        for (let i = 0; i < slidesToShow; i++) {
            indexes.push(_index + i)
        }
        onNext && onNext(_index, indexes)
        goTo(_index)
    };

    const prev = () => {
        let _index = index
        if (loop) {
            if (_index <= 0) {
                _index = total - slidesToShow
            } else if (index - slidesToScroll < 0) {
                _index = 0
            } else {
                _index = index - slidesToScroll
            }
        } else {
            if (_index <= 0) {
                _index = 0
            } else if (index - slidesToScroll < 0) {
                _index = 0
            } else {
                _index = index - slidesToScroll
            }
        }

        const indexes = []
        for (let i = 0; i < slidesToShow; i++) {
            indexes.push(_index + i)
        }
        onPrev && onPrev(_index, indexes)
        goTo(_index)
    }

    const indexes = useMemo(() => {
        const idx = []
        for (let i = 0; i < slidesToShow; i++) {
            idx.push(index + i)
        }
        return idx
    }, [index, slidesToShow])

    useImperativeHandle(ref, () => ({
        next,
        prev,
        goTo,
        getIndex: () => index,
    }));

    useLayoutEffect(() => {
        goTo(0)
    }, [])

    // autoplay
    useEffect(() => {
        if (!autoplay) return;
        const id = setInterval(next, autoplayInterval);
        return () => clearInterval(id);
    }, [index, autoplay]);

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
        <Tag
            {...props}
            baseClass='carousel'
            ref={ref}
            sxr={{
                width: "100%",
                overflow: "hidden",
                cursor: "grab",
                touchAction: "pan-y",
                position: "relative",
            }}
        >
            <Tag
                baseClass='carousel-track'
                ref={track}
                sxr={{
                    display: "flex",
                    willChange: "transform",
                    flexDirection: "row",
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
                        <Transition
                            key={index}
                            open={indexes.includes(index)}
                            variant={transition}
                            easing={easing}
                            duration={duration}
                            delay={delay}
                        >
                            <Tag
                                key={`${index}`}
                                baseClass='carousel-item'
                                ref={n => childRefs.current[index] = n}
                                sxr={{
                                    p: 1,
                                    userSelect: "none",
                                    flexShrink: 0,
                                    width: `${100 / slidesToShow}%`,
                                }}
                            >
                                {child}
                            </Tag>
                        </Transition>
                    ))
                }
            </Tag>
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
        </Tag>
    )
})

export default Carousel