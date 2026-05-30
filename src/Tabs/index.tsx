"use client";
import React, { useRef } from "react";
import {
  animate,
  Tag,
  useBreakpointProps,
  useThemeComponent,
} from "@xanui/core";
import { TabContext } from "./context";
import { TabsProps } from "./types";

export type { TabsProps };

const Tabs = React.forwardRef(
  ({ onChange, value, children, ...props }: TabsProps, ref: any) => {
    let [
      { color, variant, indicatorSize, disableTransition, slotProps, ...rest },
    ] = useThemeComponent<any>("Tabs", props, {});
    const _p: any = {};
    if (variant) _p.variant = variant;
    if (color) _p.color = color;
    if (disableTransition) _p.disableTransition = disableTransition;
    if (indicatorSize) _p.indicatorSize = indicatorSize;
    const p: any = useBreakpointProps(_p);

    variant = p.variant ?? "end-line";
    color = p.color ?? "primary";
    disableTransition = p.disableTransition;
    indicatorSize = p.indicatorSize ?? 3;

    const indicatorRef = useRef<HTMLElement>(null);
    const indicatorState = useRef({
      left: 0,
      width: 0,
    });

    let indicatorProps: any = {};
    switch (variant) {
      case "outline":
        indicatorProps = {
          top: 0,
          border: "1px solid",
          borderColor: color,
          bgcolor: "transparent",
        };
        break;
      case "ghost":
        indicatorProps = {
          top: 0,
          bgcolor: `${color}.ghost`,
        };
        break;
      case "text":
        indicatorProps = {
          display: "none",
        };
        break;
    }

    return (
      <TabContext.Provider
        value={{
          value,
          variant,
          color,
          disableTransition,
          indicatorSize,
          onChange: (v, e) => {
            onChange && onChange(v, e);

            if (variant === "text") return;
            const indicator = indicatorRef.current;
            if (!indicator) return;

            const target = e.currentTarget as HTMLElement;

            switch (variant) {
              case "start-line":
                indicator.style.removeProperty("bottom");
                indicator.style.top = `${target.offsetTop}px`;
                indicator.style.height = `${indicatorSize}px`;
                break;
              case "end-line":
                indicator.style.removeProperty("top");
                indicator.style.bottom = `${target.offsetTop}px`;
                indicator.style.height = `${indicatorSize}px`;
                break;
              case "fill":
              case "outline":
              case "ghost":
                indicator.style.height = `${target.offsetHeight}px`;
                indicator.style.top = `${target.offsetTop}px`;
                break;
            }

            animate({
              from: {
                left: indicatorState.current.left ?? 0,
                width: indicatorState.current.width ?? 0,
              },
              to: {
                left: target.offsetLeft,
                width: target.clientWidth,
              },
              duration: 180,
              easing: (t) => 1 - Math.pow(1 - t, 3),
              onUpdate: ({ left, width }) => {
                indicatorState.current.left = left;
                indicatorState.current.width = width;

                indicator.style.left = `${left}px`;
                indicator.style.width = `${width}px`;
              },
            });
          },
        }}
      >
        <Tag
          {...rest}
          baseClass="tabs"
          sxr={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
          }}
          ref={ref}
        >
          {children}
          <Tag
            ref={indicatorRef}
            baseClass="tabs-indicator"
            sxr={{
              radius: 1,
              position: "absolute",
              zIndex: -1,
              bgcolor: color,
              height: 2,
              ...indicatorProps,
            }}
          />
        </Tag>
      </TabContext.Provider>
    );
  },
);

export default Tabs;
