"use client";

import { Tag, TagComponentType, TagProps, useInterface } from '@xanui/core';
import React, { ReactNode, UIEvent, useImperativeHandle, useRef } from 'react'

export type ScrollbarProps<T extends TagComponentType = "div"> = TagProps<T> & {
    children?: ReactNode;
    onScrollEnd?: (e: UIEvent<HTMLDivElement>) => void;
}

export type ScrollbarHandle = {
    scrollTo: (pos: number) => void;
    scrollToBottom: () => void;
    scrollToTop: () => void;
};

const Scrollbar = React.forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: ScrollbarProps<T>, ref: React.Ref<ScrollbarHandle>) => {
    let [{ onScroll, onScrollEnd, ...props }] = useInterface<any>("Scrollbar", rest, {})
    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        scrollTo(pos: number) {
            innerRef.current?.scrollTo({
                top: pos,
                behavior: "smooth"
            });
        },
        scrollToBottom() {
            if (!innerRef.current) return;
            const ele = innerRef.current;
            ele.scrollTo({
                top: ele.scrollHeight,
                behavior: "smooth"
            });
        },
        scrollToTop() {
            innerRef.current?.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }));

    if (onScroll || onScrollEnd) {
        props.onScroll = (e: UIEvent<HTMLDivElement>) => {
            if (onScrollEnd) {
                const ele: any = e.target
                const scrollTop = ele.scrollTop
                const scrollHeight = ele.scrollHeight
                const clientHeight = ele.clientHeight
                const isScrollDown = scrollHeight - scrollTop <= clientHeight + 1
                isScrollDown && onScrollEnd(e)
            }
            onScroll && onScroll(e)
        }
    }

    return (
        <Tag
            {...props}
            ref={innerRef}
            baseClass='scrollbar'
            sxr={{
                height: "100%",
                width: "100%",
                overflow: "auto",
            }}
        >
            {children}
        </Tag>
    )
})

export default Scrollbar 