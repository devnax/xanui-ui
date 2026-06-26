"use client";
import React from "react";
import ListItem, { ListItemProps } from "../ListItem";
import { useSelectContext } from "../Select/context";

export type OptionProps = Omit<ListItemProps, "children"> & {
  children: string;
  value: string;
};

const Option = React.forwardRef(
  ({ value, children, ...props }: OptionProps, ref: React.Ref<any>) => {
    const select = useSelectContext();

    return (
      <ListItem
        {...props}
        selected={value.toString() === select?.value?.toString()}
        onClick={() => {
          if (select.onChange) {
            select.onChange({ value, children, ...props });
          }
        }}
        ref={ref}
      >
        {children}
      </ListItem>
    );
  },
);

export default Option;
