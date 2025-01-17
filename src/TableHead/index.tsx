'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type TableHeadProps<T extends TagComponentType = "thead"> = TagProps<T>

const TableHead = React.forwardRef(<T extends TagComponentType = "thead">({ children, ...rest }: TableHeadProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            baseClass='table-head'
            component="thead"
            ref={ref}
        >{children}</Tag>
    )
})

export default TableHead 