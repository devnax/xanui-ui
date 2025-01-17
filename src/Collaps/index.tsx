'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useInterface, TransitionProps, Transition } from '@xanui/core';

export type CollapsProps<T extends TagComponentType = "div"> = TagProps<T> & Omit<TransitionProps, "variant" | "children"> & {

}

const Collaps = React.forwardRef(<T extends TagComponentType = "div">({ children, open, ...props }: CollapsProps<T>, ref: any) => {
    let [{
        ease,
        easing,
        duration,
        delay,
        onStart,
        onFinish,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        ...rest
    }] = useInterface<any>("Collaps", props, {})

    open ??= false
    easing ??= "easeOut"

    return (
        <Transition
            {...{
                ease,
                easing,
                duration,
                delay,
                onStart,
                onFinish,
                onOpen,
                onOpened,
                onClose,
                onClosed
            }}
            disableInitialTransition
            variant="collapsVerticle"
            open={open}
        >
            <Tag
                {...rest}
                baseClass='collaps'
                ref={ref}
            >{children}</Tag>
        </Transition>
    )
})

export default Collaps


