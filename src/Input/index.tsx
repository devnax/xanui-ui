"use client";
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Tag, TagProps, TagComponentType, UseColorTemplateColor, useBreakpointPropsType, useInterface, useBreakpointProps, useMergeRefs } from '@xanui/core';
import Label, { LabelProps } from '../Label';

export type InputProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "size" | "color" | "label"> & {
    value?: string;
    type?: TagProps<'input'>['type'];
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    label?: useBreakpointPropsType<string>;

    onFocus?: (e: React.FocusEvent<any>) => void;
    onBlur?: (e: React.FocusEvent<any>) => void;
    onChange?: (e: React.ChangeEvent<any>) => void;
    onInput?: (e: React.FormEvent<any>) => void;
    onKeyDown?: (e: React.KeyboardEvent<any>) => void;
    onKeyUp?: (e: React.KeyboardEvent<any>) => void;

    rows?: useBreakpointPropsType<number>;
    minRows?: useBreakpointPropsType<number>;
    maxRows?: useBreakpointPropsType<number>;
    fullWidth?: boolean;

    startIcon?: useBreakpointPropsType<ReactElement>;
    endIcon?: useBreakpointPropsType<ReactElement>;
    iconPlacement?: useBreakpointPropsType<"start" | "center" | "end">;
    focused?: boolean;
    color?: useBreakpointPropsType<Omit<UseColorTemplateColor, "default">>;
    variant?: useBreakpointPropsType<"fill" | "outline" | "text">;
    error?: boolean;
    helperText?: useBreakpointPropsType<string>;
    multiline?: boolean;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;

    refs?: {
        inputRoot?: React.Ref<"div">;
        label?: React.Ref<"label">;
        rootContainer?: React.Ref<"div">;
        startIcon?: React.Ref<ReactElement>;
        endIcon?: React.Ref<ReactElement>;
        inputContainer?: React.Ref<"div">;
        input?: React.Ref<'input' | 'textarea'>;
        helperText?: React.Ref<"div">;
    };

    slotProps?: {
        inputRoot?: Omit<TagProps<"div">, "children">;
        label?: Omit<LabelProps, "children">;
        rootContainer?: Omit<TagProps<"div">, "children">;
        startIcon?: Omit<TagProps<'div'>, "children">;
        endIcon?: Omit<TagProps<'div'>, "children">;
        inputContainer?: Omit<TagProps<"div">, "children">;
        helperText?: Omit<TagProps<"div">, "children">;
        input?: Partial<TagProps<T>>;
    }
}

const Input = React.forwardRef(<T extends TagComponentType = "div">({ value, refs, ...props }: InputProps<T>, ref?: React.Ref<any>) => {
    let [{
        startIcon,
        endIcon,
        iconPlacement,
        color,
        label,
        name,
        placeholder,
        type,
        readOnly,
        autoFocus,
        autoComplete,
        onFocus,
        onBlur,
        onChange,
        onKeyDown,
        onKeyUp,

        focused,
        disabled,
        variant,
        error,
        helperText,
        multiline,
        size,
        rows,
        minRows,
        maxRows,
        fullWidth,
        slotProps,

        ...rest
    }, theme] = useInterface<any>("Input", props, {})

    const _p: any = {}
    if (startIcon) _p.startIcon = startIcon
    if (endIcon) _p.endIcon = endIcon
    if (iconPlacement) _p.iconPlacement = iconPlacement
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (helperText) _p.helperText = helperText
    if (size) _p.size = size
    if (rows) _p.rows = rows
    if (minRows) _p.minRows = minRows
    if (maxRows) _p.maxRows = maxRows
    const p: any = useBreakpointProps(_p)
    startIcon = p.startIcon
    endIcon = p.endIcon
    iconPlacement = p.iconPlacement
    color = p.color ?? "brand"
    variant = p.variant ?? "fill"
    helperText = p.helperText
    size = p.size ?? 'medium'
    rows = p.rows
    minRows = p.minRows
    maxRows = p.maxRows

    iconPlacement ??= multiline ? "end" : "center"
    if (!value) iconPlacement = 'center'

    const [_focused, setFocused] = useState(false)
    let _focus = focused || _focused
    const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const inputMergeRef = useMergeRefs(inputRef, refs?.input as any);

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100);
        }
    }, [autoFocus])

    let _rows = useMemo(() => {
        if (rows) return rows
        if (value && multiline) {
            let lines = (value as string).split(`\n`).length
            if (minRows && minRows > lines) {
                return minRows
            } else if (maxRows && maxRows < lines) {
                return maxRows
            } else {
                return lines
            }
        }
    }, [value]) || 1

    const sizes: any = {
        small: {
            height: 38,
            gap: .5,
            fontSize: 'button',
        },
        medium: {
            height: 46,
            gap: 1,
            fontSize: "text"
        },
        large: {
            height: 52,
            gap: 1,
            fontSize: 'big'
        }
    }

    const _size = sizes[size]
    let borderColor = _focus ? color : (variant === "fill" ? "transparent" : "divider")
    borderColor = error ? "danger.primary" : borderColor
    let multiprops: any = {}
    if (multiline) {
        multiprops = {
            rows: _rows,
            sx: {
                resize: "none"
            }
        }
    }

    return (
        <Tag
            width={fullWidth ? "100%" : "auto"}
            {...rest}
            ref={ref}
            baseClass="input-wrapper"
            sxr={{
                display: 'flex',
                flexDirection: 'column',
                gap: .5,
            }}
        >
            {!!label && <Label {...slotProps?.label} ref={refs?.label}>{label}</Label>}
            <Tag
                {...slotProps?.inputRoot}
                ref={refs?.inputRoot}
                baseClass={'input-root'}
                sxr={{
                    overflow: "hidden",
                }}
            >
                <Tag
                    {...slotProps?.rootContainer}
                    ref={refs?.rootContainer}
                    baseClass='input-root-container'
                    sxr={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: iconPlacement === 'center' ? iconPlacement : `flex-${iconPlacement}`,
                        flexWrap: "nowrap",
                        transitionProperty: "border, box-shadow, background",
                        bgcolor: error ? "danger.soft.primary" : variant === "fill" ? "background.secondary" : "background.primary",
                        border: variant === "text" ? 0 : "1px solid",
                        borderColor: borderColor,
                        borderRadius: 1,
                        px: 1,
                        py: .5,
                    }}
                    disabled={disabled || false}
                    {..._size}
                    height={multiline ? "auto" : _size.height}
                    minHeight={_size.height}
                >
                    {startIcon && <Tag
                        {...slotProps?.startIcon}
                        ref={refs?.startIcon}
                        flex={"0 0 auto"}
                        sxr={{
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: "center",
                            display: "flex",
                            color: error ? "danger.primary" : "text.secondary",
                        }}
                        baseClass="input-start-icon"
                    >{startIcon}</Tag>}
                    <Tag
                        {...slotProps?.inputContainer}
                        ref={refs?.inputContainer}
                        baseClass='input-container'
                        flex={1}
                        sxr={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                            minHeight: _size.height,
                            "& textarea": {
                                resize: "none"
                            },
                            "& input:-webkit-autofill,& input:-webkit-autofill:hover, & input:-webkit-autofill:focus,& input:-webkit-autofill:active": {
                                "-webkit-text-fill-color": "text.primary",
                                "box-shadow": `0 0 0px 1000px ${variant === "fill" ? theme.colors.background.secondary : theme.colors.background.primary} inset`,
                                transition: "background-color 5000s ease-in-out 0s"
                            } as any
                        }}
                    >
                        <Tag
                            {...slotProps?.input}
                            ref={inputMergeRef}
                            baseClass='input'
                            component={multiline ? 'textarea' : 'input'}
                            {...multiprops}
                            sxr={{
                                border: 0,
                                outline: 0,
                                bgcolor: "transparent",
                                color: error ? "danger.primary" : "text.primary",
                                fontSize: _size.fontSize,
                                height: multiline ? "auto" : _size.height + "px!important",
                                width: "100%",
                                maxHeight: 200,
                            }}
                            value={value}
                            onChange={onChange}
                            onFocus={(e: any) => {
                                focused ?? setFocused(true)
                                onFocus && onFocus(e)
                            }}
                            onBlur={(e: any) => {
                                focused ?? setFocused(false)
                                onBlur && onBlur(e)
                            }}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                            name={name}
                            placeholder={placeholder}
                            type={type}
                            readOnly={readOnly}
                            autoComplete={autoComplete}
                        />
                    </Tag>
                    {endIcon && <Tag
                        {...slotProps?.endIcon}
                        ref={refs?.endIcon}
                        flex={"0 0 auto"}
                        sxr={{
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: "center",
                            display: 'flex',
                            color: error ? "danger.primary" : "text.secondary",
                        }}
                        baseClass="input-end-icon"
                    >{endIcon}</Tag>}
                </Tag>
                {helperText && <Tag
                    {...slotProps?.helperText}
                    ref={refs?.helperText}
                    baseClass="input-helper-text"
                    sxr={{
                        color: error ? "danger.primary" : "text.primary",
                        fontSize: "small",
                        lineHeight: "text",
                        fontWeight: 'text',
                        pl: .5,
                    }}
                >{helperText}</Tag>}
            </Tag>
        </Tag>
    )
})

export default Input
