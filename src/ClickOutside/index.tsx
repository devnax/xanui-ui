import { Tag, TagComponentType, TagProps } from '@xanui/core';
import React, { useEffect, useRef } from 'react';

export type ClickOutsideProps<T extends TagComponentType = "div"> = TagProps<T> & {
    onClickOutside: () => void;
};

const ClickOutside = React.forwardRef(({ children, onClickOutside, ...props }: ClickOutsideProps, forwardedRef: any) => {

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
                onClickOutside();
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClickOutside]);

    return (
        <Tag {...props} ref={setRefs}>
            {children}
        </Tag>
    );
}
);

export default ClickOutside;
