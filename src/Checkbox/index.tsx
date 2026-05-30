"use client";
import React, { useState, ReactElement } from "react";
import {
  Tag,
  useThemeComponent,
  UseColorTemplateColor,
  TagProps,
  useBreakpointProps,
  useBreakpointPropsType,
} from "@xanui/core";
import CheckIcon from "@xanui/icons/CheckBox";
import UnCheckIcon from "@xanui/icons/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@xanui/icons/IndeterminateCheckBox";

export type CheckboxProps = Omit<
  TagProps<"input">,
  "color" | "size" | "component" | "type" | "checked"
> & {
  checkIcon?: useBreakpointPropsType<ReactElement>;
  uncheckIcon?: useBreakpointPropsType<ReactElement>;
  indeterminate?: useBreakpointPropsType<boolean>;
  checked?: boolean;
  size?: useBreakpointPropsType<number | "xs" | "sm" | "md" | "lg" | "xl">;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
};

const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref?: React.Ref<any>) => {
    let [
      {
        color,
        size,
        checkIcon,
        uncheckIcon,
        checked,
        indeterminate,
        disabled,
        onChange,
        ...rest
      },
    ] = useThemeComponent<any>("Checkbox", props, {});
    const _p: any = {};
    if (checkIcon) _p.checkIcon = checkIcon;
    if (uncheckIcon) _p.uncheckIcon = uncheckIcon;
    if (indeterminate) _p.indeterminate = indeterminate;
    if (size) _p.size = size;
    if (color) _p.color = color;
    const p: any = useBreakpointProps(_p);

    checkIcon = p.checkIcon;
    uncheckIcon = p.uncheckIcon;
    indeterminate = p.indeterminate;
    size = p.size;
    color = p.color;

    const [c, set] = useState(false);
    checked ??= c;
    size ??= "md";
    color ??= "primary";

    onChange = onChange || (() => set(!c));
    if (indeterminate) {
      checked = true;
      checkIcon = <IndeterminateCheckBoxIcon />;
    }

    let sizes: any = {
      xs: 18,
      sm: 22,
      md: 28,
      lg: 32,
      xl: 36,
    };

    if (typeof size === "string" && sizes[size]) {
      size = sizes[size];
    }

    return (
      <>
        <Tag
          baseClass="checkbox"
          onClick={() => {
            if (disabled) return;
            onChange?.({
              target: {
                checked: !checked,
              },
            } as any);
          }}
          sxr={{
            height: size,
            width: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: checked ? color : "default.muted",
            cursor: "pointer",
            disabled: disabled,
            fontSize: size,
            "& svg": {
              width: "1em",
              height: "1em",
              fontSize: "1em",
            },
            ...rest?.sx,
          }}
        >
          {checked
            ? checkIcon || <CheckIcon />
            : uncheckIcon || <UnCheckIcon />}
        </Tag>
        <Tag
          {...rest}
          component="input"
          ref={ref}
          readOnly
          type="checkbox"
          checked={checked}
          sxr={{
            display: "none!important",
          }}
        />
      </>
    );
  },
);

export default Checkbox;
