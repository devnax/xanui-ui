
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type TableBodyProps<T extends TagComponentType = "tbody"> = TagProps<T>

const TableBody = React.forwardRef(<T extends TagComponentType = "tbody">({ children, ...rest }: TableBodyProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            baseClass='table-body'
            component="tbody"
            ref={ref}
        >{children}</Tag>
    )
})

export default TableBody