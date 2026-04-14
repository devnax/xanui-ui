"use client";
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type ImageProps<T extends TagComponentType = "img"> = Omit<TagProps<T>, "children">

const Image = React.forwardRef(<T extends TagComponentType = "img">({ src, alt, ...rest }: ImageProps<T>, ref: any) => {
    return (
        <Tag
            objectFit="cover"
            {...rest as any}
            component="img"
            alt={alt}
            src={src}
            baseClass='image'
            ref={ref}
        />
    )
})

export default Image


