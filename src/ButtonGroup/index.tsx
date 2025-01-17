'use client'
import React, { ReactElement, Children, cloneElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, ColorTemplateColors, ColorTemplateType, useColorTemplate, useBreakpointPropsType, useBreakpointProps } from '@xanui/core';
import { ButtonProps } from '../Button';

export type ButtonGroupProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, 'children' | "size"> & {
    children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
    color?: useBreakpointPropsType<ColorTemplateColors>;
    variant?: useBreakpointPropsType<ColorTemplateType>;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
}

const ButtonGroup = React.forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: ButtonGroupProps<T>, ref: React.Ref<any>) => {
    let [{ color, variant, size, ...props }] = useInterface<any>("ButtonGroup", rest, {
        size: "medium"
    })
    const _p: any = {}
    if (color) _p.color = color
    const p: any = useBreakpointProps(_p)
    color = p.color

    const template = useColorTemplate(color, "outline")

    const sizes: any = {
        small: {
            height: 32,
        },
        medium: {
            height: 40,
        },
        large: {
            height: 52,
        }
    }

    return (
        <Tag
            {...props}
            {...sizes[size]}
            sxr={{
                display: "inline-flex",
                overflow: "hidden",
                radius: 1,
                '& button:not(:last-of-type)': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: 1,
                    borderColor: template.borderColor
                },
                '& button:not(:first-of-type)': {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeft: 0
                }
            }}
            baseClass='button-group'
            ref={ref}
        >
            {Children.map(children, (child: any) => {
                return cloneElement(child, {
                    flex: 1,
                    color,
                    variant,
                    size,
                    corner: "squar"
                })
            })}
        </Tag>
    )
})

export default ButtonGroup


