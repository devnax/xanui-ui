"use client";
import { Tag, TagComponentType, TagProps, useMergeRefs } from '@xanui/core';
import React, { useEffect, useRef } from 'react';

export type ClickOutsideProps<T extends TagComponentType = "div"> = TagProps<T> & {
    onClickOutside: (e: MouseEvent) => void;
    children: React.ReactElement
};

const ClickOutside = React.forwardRef(<T extends TagComponentType = "div">({ children, onClickOutside, ...props }: ClickOutsideProps<T>, ref: any) => {

    const innerRef = useRef<HTMLElement | null>(null);
    const mergeRef = useMergeRefs(ref, innerRef)

    useEffect(() => {
        const handler = (e: MouseEvent) => {

            if (!innerRef.current) return;

            if (!innerRef.current.contains(e.target as Node)) {
                onClickOutside(e);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClickOutside]);

    return (
        <Tag
            component="div"
            display="inline-block"
            {...props}
            baseClass='click-outside'
            ref={mergeRef}
        >
            {children}
        </Tag>
    )
});

export default ClickOutside;
