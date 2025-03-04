'use client'
import { Tag, TagComponentType, TagProps } from '@xanui/core';
import React, { useEffect, useRef } from 'react';

export type ClickOutsideProps<T extends TagComponentType = "div"> = TagProps<T> & {
    onClickOutside: () => void
}

const ClickOutside = React.forwardRef(({ children, onClickOutside, ...props }: ClickOutsideProps, ref: React.Ref<any>) => {
    const _ref: any = ref || useRef(null)
    const handler = (e: any) => {
        if (!_ref.current.contains(e.target)) {
            onClickOutside()
        }
    }
    useEffect(() => {
        document.addEventListener("click", handler)
        return () => {
            document.removeEventListener("click", handler)
        }
    }, [])


    return <Tag
        {...props}
        ref={_ref}
    >
        {children}
    </Tag>

})

export default ClickOutside