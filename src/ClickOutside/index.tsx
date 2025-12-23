import { Tag, TagComponentType, TagProps } from '@xanui/core';
import React, { useEffect, useRef } from 'react';

export type ClickOutsideProps<T extends TagComponentType = "div"> = TagProps<T> & {
    onClickOutside: (e: MouseEvent) => void;
    children: React.ReactElement
};

const ClickOutside = React.forwardRef(<T extends TagComponentType = "div">({ children, onClickOutside, ...props }: ClickOutsideProps<T>, forwardedRef: any) => {

    const innerRef = useRef<HTMLElement | null>(null);

    // merge refs
    const setRefs = (el: HTMLElement) => {
        innerRef.current = el;
        if (typeof forwardedRef === "function") {
            forwardedRef(el);
        } else if (forwardedRef) {
            forwardedRef.current = el;
        }
    };

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
            ref={setRefs}
        >
            {children}
        </Tag>
    )
});

export default ClickOutside;
