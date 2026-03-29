"use client"
import React from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';
import {
    Children,
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
} from "react";

export type CarouselRef = {
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    getIndex: () => number;
};

export type CarouselProps<T extends TagComponentType = "div"> = TagProps<T> & {
    children: React.ReactNode;
    slidesToShow?: useBreakpointPropsType<number>;
    slidesToScroll?: useBreakpointPropsType<number>;
    gap?: useBreakpointPropsType<number>;
    infinite?: useBreakpointPropsType<boolean>;
    autoplay?: useBreakpointPropsType<boolean>;
    interval?: useBreakpointPropsType<number>;
}

const Carousel = React.forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: CarouselProps<T>, ref: React.Ref<any>) => {

    let [{
        slidesToShow,
        slidesToScroll,
        gap,
        infinite,
        autoplay,
        interval,
        ...props
    }] = useInterface<any>("Carousel", rest, {})

    const _p: any = {}
    if (slidesToShow) _p.slidesToShow = slidesToShow
    if (slidesToScroll) _p.slidesToScroll = slidesToScroll
    if (gap) _p.gap = gap
    if (infinite) _p.infinite = infinite
    if (autoplay) _p.autoplay = autoplay
    if (interval) _p.interval = interval

    const p: any = useBreakpointProps(_p)

    slidesToShow = p.slidesToShow ?? 3
    slidesToScroll = p.slidesToScroll ?? slidesToShow
    gap = (p.gap ?? 0) * 8
    infinite = p.infinite ?? true
    autoplay = p.autoplay ?? false
    interval = p.interval ?? 3000

    const items = Children.toArray(children);
    const total = items.length;

    const clonesBefore = infinite ? items.slice(-slidesToShow) : [];
    const clonesAfter = infinite ? items.slice(0, slidesToShow) : [];
    const trackItems = [...clonesBefore, ...items, ...clonesAfter];

    const [index, setIndex] = useState(infinite ? slidesToShow : 0);
    const [isAnimating, setIsAnimating] = useState(true);
    const trackRef = useRef<HTMLDivElement>(null);


    const next = () => {
        setIndex((prev: number) => {
            const next = prev + slidesToScroll
            console.log(next);

            return next
        });
    };
    const prev = () => {
        if (isAnimating) setIndex((prev: number) => prev - slidesToScroll);
    };
    const goTo = (i: number) => setIndex(infinite ? i + slidesToShow : i);
    const getIndex = () => infinite ? index - slidesToShow : index


    useImperativeHandle(ref, () => ({
        next,
        prev,
        goTo,
        getIndex,
    }));



    // autoplay
    // useEffect(() => {
    //     if (!autoplay) return;
    //     const id = setInterval(next, interval);
    //     return () => clearInterval(id);
    // }, [index, autoplay]);

    // // infinite jump fix
    useEffect(() => {
        if (!infinite) return;

        const handleTransitionEnd = () => {
            if (index >= total + slidesToShow) {
                setIsAnimating(false);
                setIndex(slidesToShow);
            }

            if (index < slidesToShow) {
                setIsAnimating(false);
                setIndex(total + slidesToShow - slidesToScroll);
            }
        };

        const track = trackRef.current;
        if (track) {
            track.addEventListener("transitionend", handleTransitionEnd);
        }

        return () => {
            if (track) {
                track.removeEventListener("transitionend", handleTransitionEnd);
            }
        };
    }, [index, infinite]);

    useEffect(() => {
        if (!isAnimating) {
            requestAnimationFrame(() => setIsAnimating(true));
        }
    }, [isAnimating]);

    // swipe
    const translate = (index * 100) / slidesToShow;
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
            baseClass='Carousel'
            sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                touchAction: "pan-y",
            }}

            onPointerDown={(e: any) => {
                e.preventDefault()
                handleStart(e.clientX)
            }}
            onPointerUp={(e: any) => handleEnd(e.clientX)}

            // Touch (mobile)
            onTouchStart={(e: any) => handleStart(e.touches[0].clientX)}
            onTouchEnd={(e: any) => handleEnd(e.changedTouches[0].clientX)}

        >
            <Tag
                baseClass='carousel-track'
                ref={trackRef}
                sxr={{
                    display: "flex",
                    transform: `translateX(-${translate}%)`,
                    transition: isAnimating ? "transform 500ms ease" : "none",
                    gap: `${gap}px`,
                }}
            >
                {trackItems.map((child, i) => (
                    <Tag
                        baseClass='carousel-item'
                        key={i}
                        sxr={{
                            width: `calc(${100 / slidesToShow}% - ${gap}px)`,
                            flexShrink: 0,
                            userSelect: "none",
                            cursor: "grab"
                        }}
                    >
                        {child}
                    </Tag>
                ))}
            </Tag>
        </Tag>
    )
})

export default Carousel

