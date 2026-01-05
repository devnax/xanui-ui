"use client"

import React from "react";
import { DataFilterSelect } from "../types";
import Input from "../../Input";
import Menu from "../../Menu";
import List from "../../List";
import ListItem from "../../ListItem";
import Radio from "../../Radio";
import IconButton from "../../IconButton";
import Close from "@xanui/icons/Close";


type Props = {
   option: DataFilterSelect;
   value: string;
   onChange: (value: string) => void;
}

const SelectFilter = ({ option, onChange, value }: Props) => {
   const ref: any = React.useRef(null)
   const [target, setTarget] = React.useState<HTMLElement | undefined>()
   return (
      <>
         <Input
            size={"small"}
            variant="outline"
            placeholder={option.label}
            readOnly
            ref={ref}
            value={value}
            endIcon={<IconButton
               color={value ? "danger" : "default"}
               disabled={!value}
               size="small"
               variant="text"
               onClick={() => {
                  onChange('');
               }}
            >
               <Close />
            </IconButton>}
            slotProps={{
               input: {
                  onClick: (e: any) => {
                     setTarget(e.currentTarget)
                  }
               }
            }}
         />
         <Menu
            target={target}
            onClickOutside={() => setTarget(undefined)}
         >
            <List width={ref?.current?.offsetWidth || 200} size="small" >
               {
                  option.options.map((opt, index) => (
                     <ListItem
                        key={index}
                        // selected={value === opt.value}
                        startIcon={<Radio size="small" checked={value === opt.value} />}
                        onClick={() => {
                           onChange(opt.value);
                           setTarget(undefined)
                        }}
                     >
                        {opt.label}
                     </ListItem>
                  ))
               }
            </List>
         </Menu>
      </>
   )
}

export default SelectFilter