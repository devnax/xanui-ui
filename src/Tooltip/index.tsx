'use client'
import { Children, cloneElement, ReactElement, useState } from 'react'
import Menu, { MenuProps } from '../Menu'
import { useBreakpointProps, useColorTemplate, ColorTemplateColors, ColorTemplateType, useBreakpointPropsType } from '@xanui/core'


export type TooltipProps = {
    children: ReactElement;
    title: useBreakpointPropsType<string>;
    color?: useBreakpointPropsType<ColorTemplateColors>;
    variant?: useBreakpointPropsType<ColorTemplateType>;
    placement?: MenuProps['placement']
}

const Tooltip = ({ children, title, variant, color, placement }: TooltipProps) => {
    const [target, setTarget] = useState<any>()
    const _p: any = {}
    if (title) _p.title = title
    if (color) _p.color = color
    if (variant) _p.variant = variant
    const p: any = useBreakpointProps(_p)
    title = p.title
    color = p.color ?? "default"
    variant = p.variant ?? "fill"
    placement ??= "bottom"

    const { hover, ...template } = useColorTemplate(color as any, variant as any)
    if (!children || Array.isArray(children)) throw new Error("Invalid children in Toast")
    const first: any = Children.toArray(children).shift();
    const child = cloneElement(first, {
        onMouseEnter: (e) => {
            setTarget(e.target)
        },
        onMouseLeave: () => setTarget(null)
    })


    return (
        <>
            {child}
            <Menu
                target={target}
                placement={placement}
                slotProps={{
                    content: {
                        p: .5,
                        shadow: 1,
                        ...template
                    }
                }}
            >
                {title as any}
            </Menu>
        </>
    )
}

export default Tooltip