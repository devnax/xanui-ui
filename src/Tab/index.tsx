'use client'
import React from 'react'
import { TagComponentType, useInterface } from '@xanui/core';
import Button, { ButtonProps } from '../Button';

export type TabProps<T extends TagComponentType = "button"> = ButtonProps<T> & {
    value?: string | number
}

const Tab = React.forwardRef(<T extends TagComponentType = "div">({ children, ...props }: TabProps<T>, ref: React.Ref<any>) => {
    let [_props] = useInterface<any>("Tab", props, {})
    return (
        <Button
            {..._props}
            classNames={["tab", ...(_props?.classNames || [])]}
            ref={ref}
        >
            {children}
        </Button>
    )
})

export default Tab