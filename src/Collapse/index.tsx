"use client";
import React from "react";
import {
  Tag,
  TagProps,
  TagComponentType,
  useThemeComponent,
  TransitionProps,
  Transition,
} from "@xanui/core";

export type CollapseProps<T extends TagComponentType = "div"> = TagProps<T> &
  Omit<TransitionProps, "variant" | "children"> & {};

const Collapse = React.forwardRef(
  <T extends TagComponentType = "div">(
    { children, open, ...props }: CollapseProps<T>,
    ref: any,
  ) => {
    let [
      {
        ease,
        easing,
        duration,
        delay,
        onStart,
        onFinish,
        onEnter,
        onEntered,
        onExit,
        onExited,
        ...rest
      },
    ] = useThemeComponent<any>("Collapse", props, {});

    open ??= false;
    easing ??= "standard";

    return (
      <Transition
        {...{
          ease,
          easing,
          duration,
          delay,
          onStart,
          onFinish,
          onEnter,
          onEntered,
          onExit,
          onExited,
        }}
        initialTransition={false}
        variant="collapseVertical"
        open={open}
      >
        <Tag overflow={"hidden"} {...rest} baseClass="collapse" ref={ref}>
          {children}
        </Tag>
      </Transition>
    );
  },
);

export default Collapse;
