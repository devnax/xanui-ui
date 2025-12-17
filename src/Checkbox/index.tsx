
import React, { useState, ReactElement } from 'react';
import { Tag, useInterface, TagProps, useBreakpointProps, useBreakpointPropsType, ThemeColor } from '@xanui/core';
import CheckIcon from '@xanui/icons/CheckBox'
import UnCheckIcon from '@xanui/icons/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from '@xanui/icons/IndeterminateCheckBox';


export type CheckboxProps = Omit<TagProps<"input">, "color" | "size" | "component" | "type" | "checked"> & {
    checkIcon?: useBreakpointPropsType<ReactElement>;
    uncheckIcon?: useBreakpointPropsType<ReactElement>;
    indeterminate?: useBreakpointPropsType<boolean>;
    checked?: boolean;
    size?: useBreakpointPropsType<number | "small" | "medium" | "large">;
    color?: useBreakpointPropsType<keyof ThemeColor>;
}

const Checkbox = React.forwardRef((props: CheckboxProps, ref?: React.Ref<any>) => {
    let [{ color, size, checkIcon, uncheckIcon, checked, indeterminate, disabled, onChange, ...rest }] = useInterface<any>("Checkbox", props, {})
    const _p: any = {}
    if (checkIcon) _p.checkIcon = checkIcon
    if (uncheckIcon) _p.uncheckIcon = uncheckIcon
    if (indeterminate) _p.indeterminate = indeterminate
    if (size) _p.size = size
    if (color) _p.color = color
    const p: any = useBreakpointProps(_p)

    checkIcon = p.checkIcon
    uncheckIcon = p.uncheckIcon
    indeterminate = p.indeterminate
    size = p.size
    color = p.color

    const [c, set] = useState(false)
    checked ??= c
    size ??= "medium"
    color ??= "brand"

    onChange = onChange || (() => set(!c));
    if (indeterminate) {
        checked = true
        checkIcon = <IndeterminateCheckBoxIcon />
    }

    let sizes: any = {
        small: 22,
        medium: 24,
        large: 32
    }

    if (typeof size === 'string' && sizes[size]) {
        size = sizes[size]
    }

    return (
        <>
            <Tag
                baseClass='checkbox'
                onClick={() => {
                    onChange && onChange()
                }}
                sxr={{
                    height: size,
                    width: size,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: checked ? color : "text.secondary",
                    cursor: "pointer",
                    disabled: disabled,
                    "& svg": {
                        fontSize: size
                    },
                    ...rest?.sx
                }}
            >
                {checked ? (checkIcon || <CheckIcon />) : (uncheckIcon || <UnCheckIcon />)}
            </Tag>
            <Tag
                {...rest}
                component='input'
                ref={ref}
                readOnly
                type="checkbox"
                checked={checked}
                sxr={{
                    display: "none!important"
                }}
            />
        </>
    )
})

export default Checkbox
