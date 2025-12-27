
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type StackProps<T extends TagComponentType = "div"> = TagProps<T>

const Stack = React.forwardRef(<T extends TagComponentType = "div">({ children, ...props }: StackProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            {...props}
            sxr={{
                display: "flex",
                flexDirection: "column",
            }}
            baseClass='stack'
            ref={ref}
        >{children}</Tag>
    )
})

export default Stack
