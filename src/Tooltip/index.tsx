"use client";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useRef,
  useState,
} from "react";
import Menu, { MenuProps } from "../Menu";
import { useBreakpointProps, useBreakpointPropsType } from "@xanui/core";
import Text, { TextProps } from "../Text";

export type TooltipProps = {
  children: ReactElement;
  title: useBreakpointPropsType<string | ReactElement>;
  placement?: MenuProps["placement"];
  delay?: useBreakpointPropsType<number | false>;
  slotProps?: {
    title?: Omit<TextProps, "children">;
    menu?: Omit<MenuProps, "target" | "children" | "placement">;
  };
};

const Tooltip = ({
  children,
  title,
  placement,
  delay,
  slotProps,
}: TooltipProps) => {
  const [target, setTarget] = useState<any>();
  const _p: any = {};
  if (title) _p.title = title;
  if (delay) _p.delay = delay;
  const p: any = useBreakpointProps(_p);
  title = p.title;
  delay = p.delay ?? 400;
  placement ??= "bottom";

  if (!children || Array.isArray(children))
    throw new Error("Invalid children in Tooltip");
  const first: any = Children.toArray(children).shift();
  const delayRef = useRef<any>(null);
  const child = cloneElement(first, {
    onMouseEnter: (e) => {
      if (delay) {
        delayRef.current = setTimeout(() => {
          setTarget(e.target);
        }, delay as any);
      } else {
        setTarget(e.target);
      }
    },
    onMouseLeave: () => {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }
      setTarget(null);
    },
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
            shadow: "xs",
            bgcolor: "paper.primary",
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
