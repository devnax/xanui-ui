
import React, { useState } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useBreakpointPropsType, useBreakpointProps } from '@xanui/core';
import PersonIcon from '@xanui/icons/Person'

export type AvatarProps<T extends TagComponentType = "img"> = TagProps<T> & {
    size?: useBreakpointPropsType<number>;
}

const Avatar = React.forwardRef(<T extends TagComponentType = "img">({ children, src, alt, ...rest }: AvatarProps<T>, ref: any) => {
    const [faild, setFaild] = useState<boolean>()
    let [{ size, ...props }] = useInterface<any>("Avatar", rest, {})
    size ??= 36
    const _p: any = {}
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)
    size = p.size

    if (faild === false || !src) {
        let t = alt?.charAt(0).toUpperCase() || (children || <PersonIcon />)
        return (
            <Tag
                component="div"
                src={src}
                {...props}
                baseClass='avatar'
                sxr={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "background.secondary",
                    radius: size,
                    fontSize: (size / 3) * 2,
                    width: size,
                    height: size,
                    userSelect: "none",
                    color: "text.primary",
                    '& svg': {
                        fontSize: (size / 3) * 2,
                        opacity: .6
                    }
                }}
                ref={ref}
            >{t}</Tag>
        )
    }
    return (
        <Tag
            component="img"
            radius={size}
            width={size}
            height={size}
            objectFit="cover"
            {...props}
            alt={alt}
            src={src}
            baseClass='avatar'
            onError={(e) => {
                setFaild(false)
                props.onError && props.onError(e as any)
            }}
            ref={ref}
        />
    )
})

export default Avatar


