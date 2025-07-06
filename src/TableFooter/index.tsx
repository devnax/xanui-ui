
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type TableFooterProps<T extends TagComponentType = "tfoot"> = TagProps<T>

const TableFooter = React.forwardRef(<T extends TagComponentType = "tfoot">({ children, ...rest }: TableFooterProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            baseClass='table-footer'
            component="tfoot"
            ref={ref}
        >{children}</Tag>
    )
})

export default TableFooter