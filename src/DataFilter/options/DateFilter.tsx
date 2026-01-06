"use client"

import React from "react";
import { DataFilterDate } from "../types";
import Menu from "../../Menu";
import IconButton from "../../IconButton";
import Stack from "../../Stack";
import Text from "../../Text";
import Close from "@xanui/icons/Close";
import Add from "@xanui/icons/Add";
import ClearAll from "@xanui/icons/ClearAll";
import Chip from "../../Chip";
import Calendar from "../../Calendar";


type Props = {
   option: DataFilterDate;
   value: string | null;
   onChange: (value: string | null) => void;
}

const DateFilter = ({ option, onChange, value }: Props) => {
   const [target, setTarget] = React.useState<HTMLElement | undefined>()
   const isValue = value !== null && value !== undefined && value !== ""

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
                        onChange(null);
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
               isValue && <Chip
                  size="small"
                  color="default"
                  label={new Date(value).toLocaleDateString("en-US")}
                  endIcon={<IconButton
                     size={16}
                     variant={"text"}
                     color="default"
                     onClick={() => {
                        onChange(null);
                     }}
                  >
                     <Close />
                  </IconButton>}
               />
            }
         </Stack>
         <Menu
            target={target}
            onClickOutside={() => setTarget(undefined)}
            placement={"bottom-right"}
         >
            <Calendar
               value={value ? new Date(value) : null}
               onChange={(date) => {
                  onChange(date?.toISOString() || null);
                  setTarget(undefined);
               }}
            />
         </Menu>
      </Stack>
   )
}

export default DateFilter