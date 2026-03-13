// ListContext.ts
import React from "react"
import { UseColorTemplateColor, UseColorTemplateType } from "@xanui/core"
import { ListItemProps } from "../ListItem";
export type ListContextValue = {
   listItem?: Omit<ListItemProps, "children">;
   color: UseColorTemplateColor;
   variant: UseColorTemplateType;
   size: "small" | "medium" | "large"
}

export const ListContext = React.createContext<ListContextValue | null>(null)

export const useListContext = () => React.useContext(ListContext) as ListContextValue
