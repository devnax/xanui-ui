import React, { useEffect, useRef } from 'react';

export type ClickOutsideProps = {
    onClickOutside: () => void;
    children: React.ReactElement
};

const ClickOutside = React.forwardRef(({ children, onClickOutside }: ClickOutsideProps, forwardedRef: any) => {

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

    return React.cloneElement(children, {
        ref: setRefs as any
    } as any);
}
);

export default ClickOutside;
