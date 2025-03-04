'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useInterface } from '@xanui/core';

export type PaperProps<T extends TagComponentType = "div"> = TagProps<T>

const Paper = React.forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: PaperProps<T>, ref?: React.Ref<any>) => {
    let [props] = useInterface<any>("default", rest, {})
    return (
        <Tag
            {...props}
            sxr={{
                radius: 1,
                p: 1.5,
                bgcolor: "background.secondary",
                color: "text.primary",
                ...props?.sx
            }}
            baseClass='default'
            ref={ref}
        >{children}</Tag>
    )
})

export default Paper
