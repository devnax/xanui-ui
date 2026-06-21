"use client";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useState,
} from "react";
import Menu, { MenuProps } from "../Menu";
import {
  useBreakpointProps,
  useColorTemplate,
  UseColorTemplateColor,
  UseColorTemplateType,
  useBreakpointPropsType,
} from "@xanui/core";
import Text, { TextProps } from "../Text";

export type TooltipProps = {
  children: ReactElement;
  title: useBreakpointPropsType<string | ReactElement>;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
  variant?: useBreakpointPropsType<UseColorTemplateType>;
  placement?: MenuProps["placement"];
  slotProps?: {
    title?: Omit<TextProps, "children">;
    menu?: Omit<MenuProps, "target" | "chilcren" | "placement">;
  };
};

const Tooltip = ({
  children,
  title,
  variant,
  color,
  placement,
  slotProps,
}: TooltipProps) => {
  const [target, setTarget] = useState<any>();
  const _p: any = {};
  if (title) _p.title = title;
  if (color) _p.color = color;
  if (variant) _p.variant = variant;
  const p: any = useBreakpointProps(_p);
  title = p.title;
  color = p.color ?? "default";
  variant = p.variant ?? "fill";
  placement ??= "bottom";

  const template = useColorTemplate(color as any, variant as any);
  if (!children || Array.isArray(children))
    throw new Error("Invalid children in Toast");
  const first: any = Children.toArray(children).shift();
  const child = cloneElement(first, {
    onMouseEnter: (e) => {
      setTarget(e.target);
    },
    onMouseLeave: () => setTarget(null),
  });

  return (
    <>
      {child}
      <Menu
        target={target}
        placement={placement}
        {...slotProps?.menu}
        slotProps={{
          ...slotProps?.menu?.slotProps,
          content: {
            p: 0.5,
            shadow: 1,
            ...template.main,
            bgcolor:
              color == "default" ? "default.base" : template.main.bgcolor,
            ...slotProps?.menu?.slotProps?.content,
          },
        }}
      >
        {isValidElement(title) ? (
          title
        ) : (
          <Text {...slotProps?.title}>{title as any}</Text>
        )}
      </Menu>
    </>
  );
};

export default Tooltip;
