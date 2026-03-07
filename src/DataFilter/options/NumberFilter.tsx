"use client"

import { DataFilterSelect } from "../types";
import IconButton from "../../IconButton";
import Stack from "../../Stack";
import Text from "../../Text";
import Add from "@xanui/icons/Add";
import ClearAll from "@xanui/icons/ClearAll";
import InputNumber from "../../InputNumber";

type Props = {
   option: DataFilterSelect;
   value: number | null;
   onChange: (value: number | null) => void;
}

const NumberFilter = ({ option, onChange, value }: Props) => {

   const isValue = value !== null && value !== undefined;

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
                  onClick={() => {
                     onChange(0);
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
               isValue && <InputNumber
                  variant={"outline"}
                  value={value.toString() as any}
                  onChange={(e: any) => {
                     onChange(e.target.value);
                  }}
                  fullWidth
               />
            }
         </Stack>
      </Stack>
   )
}

export default NumberFilter