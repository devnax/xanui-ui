import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type BoxProps<T extends TagComponentType = "div"> = TagProps<T>

const Box = React.forwardRef(<T extends TagComponentType = "div">({ children, ...props }: BoxProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...props}
            baseClass='box'
            ref={ref}
        >{children}</Tag>
    )
})

export default Box

