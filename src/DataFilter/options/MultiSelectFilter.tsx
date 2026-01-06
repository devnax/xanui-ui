"use client"

import React from "react";
import { DataFilterSelect } from "../types";
import Menu from "../../Menu";
import List from "../../List";
import ListItem from "../../ListItem";
import Checkbox from "../../Checkbox";
import IconButton from "../../IconButton";
import Stack from "../../Stack";
import Text from "../../Text";
import Add from "@xanui/icons/Add";
import ClearAll from "@xanui/icons/ClearAll";
import Chip from "../../Chip";
import Close from "@xanui/icons/Close";


type Props = {
   option: DataFilterSelect;
   value: string[];
   onChange: (value: string[]) => void;
}

const MultiSelectFilter = ({ option, onChange, value }: Props) => {
   const ref: any = React.useRef(null)
   const [target, setTarget] = React.useState<HTMLElement | undefined>()
   const isValue = value && value.length > 0;
   return (
      <Stack
         width={"100%"}
         bgcolor="background.secondary"
         p={1}
         radius={1}
      >
         <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
            gap={0.5}
            mb={isValue ? .5 : 0}
         >
            <Text>{option.label}</Text>
            <Stack
               direction="row"
               gap={0.5}
            >
               <IconButton
                  size="small"
                  variant="soft"
                  color={"default"}
                  onClick={(e: any) => {
                     setTarget(e.currentTarget)
                  }}
               >
                  <Add />
               </IconButton>
               {
                  isValue && <IconButton
                     size="small"
                     variant="soft"
                     color={"danger"}
                     onClick={() => {
                        onChange([]);
                     }}
                  >
                     <ClearAll />
                  </IconButton>
               }
            </Stack>
         </Stack>
         <Stack
            direction="row"
            gap={0.5}
            flexWrap="wrap"
         >
            {
               isValue && value.map((val, index) => {
                  return (
                     <Chip
                        key={index}
                        size="small"
                        color="default"
                        label={val}
                        endIcon={<IconButton
                           size={16}
                           variant={"text"}
                           color="default"
                           onClick={() => {
                              onChange(value.filter(v => v !== val));
                           }}
                        >
                           <Close />
                        </IconButton>}
                     />
                  )
               })
            }
         </Stack>
         <Menu
            target={target}
            onClickOutside={() => setTarget(undefined)}
            placement={"bottom-right"}
         >
            <List width={ref?.current?.offsetWidth || 200} size="small">
               {
                  option.options.map((opt, index) => (
                     <ListItem
                        key={index}
                        startIcon={<Checkbox checked={value?.includes(opt.value)} />}
                        onClick={() => {
                           const has = value?.includes(opt.value)
                           onChange(has ? value?.filter(v => v !== opt.value) : [...value || [], opt.value]);
                        }}
                     >
                        {opt.label}
                     </ListItem>
                  ))
               }
            </List>
         </Menu>
      </Stack>
   )
}

export default MultiSelectFilter