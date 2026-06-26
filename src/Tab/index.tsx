"use client";
import React, { useEffect, useRef } from "react";
import { TagComponentType, useThemeComponent, useMergeRefs } from "@xanui/core";
import Button, { ButtonProps } from "../Button";
import { useTabs } from "../Tabs/context";
import { TabsProps } from "../Tabs/types";

export type TabProps<T extends TagComponentType = "button"> = ButtonProps<T> & {
  value?: string | number;
};

const Tab = React.forwardRef(
  <T extends TagComponentType = "button">(
    { children, value, ...props }: TabProps<T>,
    ref: React.Ref<any>,
  ) => {
    let [_props] = useThemeComponent<any>("Tab", props, {});
    const container = useTabs() as TabsProps;
    if (!container)
      throw new Error("Tabs component must be used within a <Tabs>.");
    const btnRef = useRef<HTMLElement>(null);
    const mergeRef = useMergeRefs(ref, btnRef);

    useEffect(() => {
      if (value === container.value) {
        const e = {
          type: "click",
          target: btnRef.current,
          currentTarget: btnRef.current,
          preventDefault: () => {},
          stopPropagation: () => {},
        };

        (container as any).onChange(value, e);
      }
    }, [container.variant, container.color]);
    const isSelected = value === container.value;
    const color = isSelected ? container.color : "default";
    const sx: any = {};
    if (isSelected) {
      if (container.variant === "fill") {
        sx.color = `${container.color}.contrast!important`;
      } else if (container.variant === "ghost") {
        // sx.color = `${container.color}.primary!important`;
      }
    }

    return (
      <Button
        {..._props}
        color={color}
        sx={sx}
        variant={"text"}
        onClick={(e) => {
          (container as any).onChange(value, e);
        }}
        classNames={["tab", ...(_props?.classNames || [])]}
        ref={mergeRef}
      >
        {children}
      </Button>
    );
  },
);

export default Tab;
