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
   value: [number, number] | null;
   onChange: (value: [number, number] | null) => void;
}

const NumberRangeFilter = ({ option, onChange, value }: Props) => {

   const isValue = value !== null && value !== undefined && Array.isArray(value) && value.length === 2;

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
                     onChange([0, 0]);
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
               isValue && <Stack
                  direction="row"
                  gap={0.5}
                  flex={1}
               >
                  <InputNumber
                     flex={1}
                     variant={"outline"}
                     size="small"
                     placeholder="Min"
                     value={value[0] as any ?? ''}
                     onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        onChange([val, value ? value[1] : 0]);
                     }}
                  />
                  <InputNumber
                     variant={"outline"}
                     flex={1}
                     size="small"
                     placeholder="Max"
                     value={value[1] as any ?? undefined}
                     onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        onChange([value ? value[0] : 0, val]);
                     }}
                  />
               </Stack>
            }
         </Stack>
      </Stack>
   )
}

export default NumberRangeFilter