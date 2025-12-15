
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type LabelProps<T extends TagComponentType = "label"> = TagProps<T>

const Label = React.forwardRef(<T extends TagComponentType = "label">({ children, ...rest }: LabelProps<T>, ref: React.Ref<any>) => {
    return <Tag
        component='label'
        {...rest}
        sxr={{
            display: "inline-flex",
            alignItems: "center",
            verticalAlign: "middle",
            fontSize: "text",
            gap: .4,
            color: "text.primary",
            userSelect: "none",
            cursor: "pointer",
            fontWeight: "500",
        }}
        baseClass='label'
        ref={ref}
    >{children}</Tag>
})

export default Label