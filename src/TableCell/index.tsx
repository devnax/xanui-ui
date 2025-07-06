
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type TableColumnProps<T extends TagComponentType = "td"> = TagProps<T> & {
    th?: boolean
}

const TableCell = React.forwardRef(<T extends TagComponentType = "td">({ children, th, ...rest }: TableColumnProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            sxr={{
                verticalAlign: "inherit",
                textAlign: "left",
                fontSize: "inherit",
                color: "text.primary",
                ...((rest as any)?.sx || {})
            }}
            baseClass='table-cell'
            component={th ? "th" : "td"} ref={ref}
        >
            {children}
        </Tag>
    )
})

export default TableCell