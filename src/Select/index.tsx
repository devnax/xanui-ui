"use client";

import React, { ReactElement, useMemo, cloneElement, useState, Children, useRef } from 'react'
import Input, { InputProps } from '../Input'
import List, { ListProps } from '../List'
import Menu, { MenuProps } from '../Menu'
import Stack from '../Stack'
import { OptionProps } from '../Option'
import DownIcon from '@xanui/icons/KeyboardArrowDown';
import UpIcon from '@xanui/icons/KeyboardArrowUp';
import { UseColorTemplateColor, UseColorTemplateType, useInterface, useBreakpointPropsType, useMergeRefs } from '@xanui/core'


export type SelectProps = {
    value?: string | number;
    onChange?: (value: string | number) => void;
    children: ReactElement<OptionProps> | ReactElement<OptionProps>[];
    placeholder?: useBreakpointPropsType<string>;
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    fullWidth?: boolean;
    name?: string;
    error?: InputProps['error'];
    helperText?: InputProps['helperText'];

    refs?: {
        input?: React.Ref<any>;
        menu?: React.Ref<any>;
        list?: React.Ref<any>;
    };
    slotProps?: {
        menu?: Omit<MenuProps, 'children' | 'target'>;
        input?: Omit<InputProps, "onChange" | "value">;
        list?: Omit<ListProps, "children">
    }
}

const Select = React.forwardRef(({ onChange, value, children, error, helperText, name, refs, ...props }: SelectProps, ref: React.Ref<any>) => {
    let [{ slotProps, color, variant, fullWidth, placeholder }] = useInterface<any>("Select", props, {})
    color ??= "brand"
    variant ??= "fill"
    const [target, setTarget] = useState<any>()
    const conRef = useRef(null)
    const { childs, selectedProps } = useMemo(() => {
        let sProps: any = {}
        const c = Children.map(children, (child: any) => {
            let selected = child.props.value === value
            if (selected) sProps = child.props
            return cloneElement(child, {
                value: undefined,
                selected,
                onClick: () => {
                    setTarget(null)
                    onChange && onChange(child.props.value)
                }
            })
        })
        return {
            childs: c,
            selectedProps: sProps as OptionProps
        }
    }, [children, value])

    const mergeRefs = useMergeRefs(ref, conRef)
    const toggleMenu = () => setTarget(target ? null : conRef.current)

    return (
        <>
            <Input
                ref={mergeRefs}
                color={color}
                variant={variant === "soft" ? "fill" : variant}
                endIcon={<Stack flexDirection="row" component="span" > {(target ? <UpIcon /> : <DownIcon />)}</Stack>}
                readOnly
                value={typeof selectedProps.children === 'string' ? selectedProps.children : value}
                cursor="pointer"
                userSelect="none"
                startIcon={selectedProps.startIcon}
                focused={!!target}
                placeholder={placeholder}
                fullWidth={fullWidth}
                error={error}
                helperText={helperText}
                name={name}
                {...slotProps?.input}
                refs={{
                    input: refs?.input,
                    ...slotProps?.input?.refs
                }}
                slotProps={{
                    rootContainer: {
                        cursor: "pointer",
                        userSelect: "none",
                        ...(slotProps?.input?.slotProps?.container || {}),
                        onClick: () => {
                            if (!target) {
                                toggleMenu()
                            }
                        },
                    }
                }}
            />
            <Menu
                ref={refs?.menu}
                target={target}
                placement="bottom-left"
                {...slotProps?.menu}
                slotProps={{
                    ...slotProps?.menu?.slotProps,
                    content: {
                        mt: .5,
                        ...slotProps?.menu?.content,
                        width: conRef && (conRef?.current as any)?.clientWidth,
                    }
                }}
                onClickOutside={(e) => {
                    if ((conRef.current as any).contains(e.target)) return;
                    toggleMenu()
                }}
            >
                <List
                    ref={refs?.list}
                    {...slotProps?.list}
                    color={color}
                    variant={variant}
                >
                    {childs}
                </List>
            </Menu>
        </>
    )
})

export default Select