
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type TableRowProps<T extends TagComponentType = "tr"> = TagProps<T>

const TableRow = React.forwardRef(<T extends TagComponentType = "tr">({ children, ...rest }: TableRowProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            baseClass='table-row'
            verticalAlign="middle"
            {...rest}
            component="tr"
            ref={ref}>{children}</Tag>
    )
})

export default TableRow