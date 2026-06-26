"use client";
import React, { ReactElement, useState, useRef, Children } from "react";
import Input, { InputProps } from "../Input";
import List, { ListProps } from "../List";
import Menu, { MenuProps } from "../Menu";
import { OptionProps } from "../Option";
import DownIcon from "@xanui/icons/KeyboardArrowDown";
import UpIcon from "@xanui/icons/KeyboardArrowUp";
import { useThemeComponent, useMergeRefs } from "@xanui/core";
import { SelectContext } from "./context";

export type SelectProps = Omit<
  InputProps,
  "onChange" | "value" | "children" | "slotProps"
> & {
  value?: string;
  onChange?: (value: string) => void;
  children: ReactElement<OptionProps> | ReactElement<OptionProps>[];
  disableArrow?: boolean;
  refs?: {
    input?: React.Ref<any>;
    menu?: React.Ref<any>;
    list?: React.Ref<any>;
  };
  slotProps?: {
    menu?: Omit<MenuProps, "children" | "target">;
    input?: Omit<InputProps, "onChange" | "value">;
    list?: Omit<ListProps, "children">;
  };
};

const Select = React.forwardRef(
  (
    {
      onChange,
      value,
      children,
      error,
      helperText,
      disableArrow,
      startIcon,
      endIcon,
      name,
      refs,
      ...props
    }: SelectProps,
    ref: React.Ref<any>,
  ) => {
    let [{ slotProps, color, variant, size, ...inputProps }] =
      useThemeComponent<any>("Select", props, {});
    color ??= "brand";
    variant ??= "fill";
    size ??= "md";
    const [selectOptionProps, setSelectedOptionProps] = useState<OptionProps>(
      () => {
        const selecTedProps: any = Children.toArray(children).find(
          (c: any) => c.props.value.toString() === value?.toString(),
        );

        if (selecTedProps) {
          return selecTedProps.props;
        }
      },
    );
    const [target, setTarget] = useState<any>();
    const conRef = useRef(null);

    const mergeRefs = useMergeRefs(ref, conRef);
    const toggleMenu = () => setTarget(target ? null : conRef.current);

    return (
      <SelectContext.Provider
        value={{
          value,
          onChange: (optionProps) => {
            setTarget(null);
            if (onChange) {
              setSelectedOptionProps(optionProps);
              onChange(optionProps.value);
            }
          },
        }}
      >
        <Input
          size={size}
          ref={mergeRefs}
          color={color}
          variant={variant === "ghost" ? "fill" : variant}
          endIcon={
            <>
              {!disableArrow && <>{target ? <UpIcon /> : <DownIcon />}</>}
              {endIcon}
            </>
          }
          readOnly
          value={selectOptionProps?.children || ""}
          cursor="pointer"
          userSelect="none"
          focused={!!target}
          error={error}
          helperText={helperText}
          name={name}
          {...slotProps?.input}
          {...inputProps}
          startIcon={selectOptionProps?.startIcon ?? startIcon}
          refs={{
            input: refs?.input,
            ...slotProps?.input?.refs,
          }}
          slotProps={{
            rootContainer: {
              cursor: "pointer",
              userSelect: "none",
              ...(slotProps?.input?.slotProps?.container || {}),
              onClick: () => {
                if (!target) {
                  toggleMenu();
                }
              },
            },
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
              mt: 0.5,
              ...slotProps?.menu?.content,
              width: conRef && (conRef?.current as any)?.clientWidth,
            },
          }}
          onClickOutside={(e) => {
            if ((conRef.current as any).contains(e.target)) return;
            toggleMenu();
          }}
        >
          <List
            size={size}
            ref={refs?.list}
            {...slotProps?.list}
            color={color}
            variant={variant === "outline" ? "fill" : variant}
            maxHeight={
              typeof window === "undefined" ? "auto" : window?.innerHeight - 50
            }
            overflow={"auto"}
          >
            {children}
          </List>
        </Menu>
      </SelectContext.Provider>
    );
  },
);

export default Select;
