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
      {
        color,
        variant,
        indicatorSize,
        disableTransition,
        disableInitialTransition,
        slotProps,
        ...rest
      },
    ] = useThemeComponent<any>("Tabs", props, {});
    const _p: any = {};
    if (variant) _p.variant = variant;
    if (color) _p.color = color;
    if (disableTransition) _p.disableTransition = disableTransition;
    if (disableInitialTransition)
      _p.disableInitialTransition = disableInitialTransition;
    if (indicatorSize) _p.indicatorSize = indicatorSize;
    const p: any = useBreakpointProps(_p);

    variant = p.variant ?? "end-line";
    color = p.color ?? "brand";
    disableTransition = p.disableTransition;
    disableInitialTransition = p.disableInitialTransition;
    indicatorSize = p.indicatorSize ?? 2;

    const init = useRef<boolean>(false);

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
          borderColor:
            color === "default" ? "divider.primary" : `${color}.primary`,
          bgcolor: "transparent",
        };
        break;
      case "ghost":
        indicatorProps = {
          top: 0,
          bgcolor: `${color}.ghost.primary`,
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

            if (disableInitialTransition && !init.current) {
              init.current = true;
              indicator.style.left = `${target.offsetLeft}px`;
              indicator.style.width = `${target.clientWidth}px`;
              return;
            }

            if (disableTransition) {
              indicator.style.left = `${target.offsetLeft}px`;
              indicator.style.width = `${target.clientWidth}px`;
              return;
            }

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
                opacity: 0,
              },
              to: {
                left: target.offsetLeft,
                width: target.clientWidth,
                opacity: 1,
              },
              duration: 300,
              easing: (t) => 1 - Math.pow(1 - t, 3),
              onUpdate: ({ left, width, opacity }) => {
                indicatorState.current.left = left;
                indicatorState.current.width = width;

                indicator.style.left = `${left}px`;
                indicator.style.width = `${width}px`;
                indicator.style.opacity = `${opacity}`;
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
              bgcolor:
                color === "default" ? "paper.primary" : `${color}.primary`,
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
