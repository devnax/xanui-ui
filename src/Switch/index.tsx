"use client";
import React, { ReactElement, useState } from "react";
import {
  Tag,
  TagProps,
  useBreakpointProps,
  UseColorTemplateColor,
  useThemeComponent,
  useBreakpointPropsType,
} from "@xanui/core";

export type SwitchProps = Omit<
  TagProps<"input">,
  "color" | "size" | "component" | "type" | "checked"
> & {
  checked?: boolean;
  size?: useBreakpointPropsType<number | "xs" | "sm" | "md" | "lg" | "xl">;
  color?: useBreakpointPropsType<Omit<UseColorTemplateColor, "default">>;
  disabled?: useBreakpointPropsType<boolean>;
  trackSize?: useBreakpointPropsType<number>;
  icon?: useBreakpointPropsType<ReactElement>;
  slotProps?: {
    thumb?: Omit<TagProps, "children">;
    track?: Omit<TagProps, "children">;
  };
};

const Switch = React.forwardRef((props: SwitchProps, ref?: React.Ref<any>) => {
  let [
    {
      size,
      checked,
      color,
      disabled,
      icon,
      onChange,
      trackSize,
      slotProps,
      ...rest
    },
  ] = useThemeComponent<any>("Switch", props, {});
  const _p: any = {};
  if (size) _p.size = size;
  if (color) _p.color = color;
  if (disabled) _p.disabled = disabled;
  if (trackSize) _p.trackSize = trackSize;
  if (icon) _p.icon = icon;
  const p: any = useBreakpointProps(_p);
  size = p.size ?? "md";
  color = p.color ?? "primary";
  disabled = p.disabled;
  trackSize = p.trackSize;
  icon = p.icon;

  const [c, set] = useState(false);
  checked ??= c;

  onChange = onChange || (() => set(!c));

  const sizes: any = {
    xs: 28,
    sm: 40,
    md: 48,
    lg: 56,
    xl: 68,
  };
  const _size = typeof size === "string" ? (sizes[size] ?? sizes.md) : size;

  const height = _size * 0.5;
  trackSize = trackSize ?? height + 6;
  let isNormalSize = height + 6 === trackSize;
  let transform = checked ? "92%" : "8%";
  if (!isNormalSize) {
    transform = checked ? "100%" : "-10%";
  }

  return (
    <Tag
      disabled={disabled}
      sxr={{
        width: _size,
        height: height,
        position: "relative",
        cursor: "pointer",
        display: "inline-block",
      }}
      onClick={() => {
        if (disabled) return;
        onChange?.({
          target: { checked: !checked },
        } as any);
      }}
    >
      <Tag
        {...slotProps?.track}
        baseClass="switch-track-bar"
        sxr={{
          width: _size,
          height: trackSize,
          borderRadius: height,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: checked ? color : "default.divider",
        }}
      ></Tag>
      <Tag
        {...slotProps?.thumb}
        baseClass="switch-thumb"
        sxr={{
          transition: "all .25s",
          width: height,
          height: height,
          radius: height,
          bgcolor: "#FFFFFF",
          position: "absolute",
          top: "50%",
          border: isNormalSize ? 0 : 1,
          left: 0,
          transform: `translate(${transform}, -50%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Tag>
      <Tag
        {...rest}
        component="input"
        ref={ref}
        type="radio"
        readOnly
        checked={checked}
        sxr={{
          display: "none!important",
        }}
      />
    </Tag>
  );
});

export default Switch;
