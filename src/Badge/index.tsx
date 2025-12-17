
import React, { ReactElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, useBreakpointPropsType, useBreakpointProps, TransitionProps, ThemeColor } from '@xanui/core';


export type BadgeProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "baseClass" | "content"> & {
    content?: useBreakpointPropsType<number | ReactElement>;
    color?: useBreakpointPropsType<keyof ThemeColor>;
    placement?: useBreakpointPropsType<"left-top" | "left-bottom" | "right-top" | "right-bottom">;
    visible?: useBreakpointPropsType<boolean>;
    slotProps?: {
        transition?: Omit<TransitionProps, "open">
    }
}

const Badge = React.forwardRef(<T extends TagComponentType = "div">({ children, content, ...rest }: BadgeProps<T>, ref: React.Ref<any>) => {
    let [{ color, placement, visible, slotProps, ...props }] = useInterface<any>("Badge", rest, {})
    color ??= "danger"
    visible ??= true
    placement ??= "right-top"

    const _p: any = {}

    if (content) _p.content = content
    if (color) _p.color = color
    if (placement) _p.placement = placement
    if (visible) _p.visible = visible

    const p: any = useBreakpointProps(_p)

    content = p.content
    color = p.color
    placement = p.placement
    visible = p.visible
    const { hover, ...template } = useColorTemplate(color, "fill")
    let _css: any = {}
    let pos = -3;
    if (typeof content === "number") {
        if (content.toString().length === 2) {
            pos = -5
        } else if (content.toString().length > 2) {
            pos = -8
        }
    }

    switch (placement) {
        case "left-top":
            _css = { top: content ? pos : 0, left: content ? pos : 0 }
            break;
        case "left-bottom":
            _css = { bottom: content ? pos : 0, left: content ? pos : 0 }
            break;
        case "right-top":
            _css = { top: content ? pos : 0, right: content ? pos : 0 }
            break;
        case "right-bottom":
            _css = { bottom: content ? pos : 0, right: content ? pos : 0 }
            break;
    }
    if (content) {
        _css.minWidth = 16
        _css.height = 16
        _css.height = 16
        _css.p = .8
        _css.px = .4
    } else {
        _css.width = 8
        _css.height = 8
    }

    return (
        <Tag
            {...props}
            position="relative"
            display="inline-block"
            baseClass='badge'
            ref={ref}
        >
            <Tag
                component='span'
                baseClass='badge-content'
                sxr={{
                    position: "absolute",
                    zIndex: 1,
                    radius: 2,
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                    fontWeight: 500,
                    fontSize: 11
                }}
                {...template}
                {..._css}
            >
                {typeof content === 'number' ? (content >= 100 ? "99+" : content) : content}
            </Tag>
            {children}
        </Tag>
    )
})

export default Badge

