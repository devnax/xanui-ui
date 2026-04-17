import { ReactElement } from "react";
import { TabProps } from "../Tab";
import { TagProps, useBreakpointPropsType, UseColorTemplateColor } from "@xanui/core";


type ValueType = string | number
export type TabsProps = Omit<TagProps, 'onChange'> & {
   children: ReactElement<TabProps> | ReactElement<TabProps>[];
   value?: ValueType;
   onChange?: (value: ValueType, e: React.MouseEvent) => void;
   variant?: useBreakpointPropsType<"start-line" | "end-line" | "fill" | "outline" | "text" | "ghost">;
   color?: useBreakpointPropsType<UseColorTemplateColor>;
   disableTransition?: useBreakpointPropsType<boolean>;
   indicatorSize?: useBreakpointPropsType<number>;

}