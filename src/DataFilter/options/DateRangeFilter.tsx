"use client"

import { DataFilterDate } from "../types";
import IconButton from "../../IconButton";
import Stack from "../../Stack";
import Text from "../../Text";
import Add from "@xanui/icons/Add";
import ClearAll from "@xanui/icons/ClearAll";
import CalenderInput from "../../CalendarInput";


type Props = {
   option: DataFilterDate;
   value: [string, string] | null;
   onChange: (value: [string, string] | null) => void;
}

const DateRangeFilter = ({ option, onChange, value }: Props) => {
   const isValue = value !== null && value !== undefined && value.length === 2

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
                     const d = new Date();
                     onChange([d.toISOString(), d.toISOString()]);
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
               isValue && <>
                  <Stack
                     p={1}
                     gap={1}
                     width={"100%"}
                  >
                     <CalenderInput
                        fullWidth
                        variant={"outline"}
                        value={value![0] ? new Date(value[0]) : null}
                        onChange={(date) => {
                           onChange([date ? date.toISOString() : "", value ? value[1] : ""])
                        }}
                     />

                     <CalenderInput
                        fullWidth
                        variant={"outline"}
                        value={value![1] ? new Date(value[1]) : null}
                        onChange={(date) => {
                           onChange([value ? value[0] : "", date ? date.toISOString() : ""])
                        }}
                     />
                  </Stack>
               </>
            }
         </Stack>

      </Stack>
   )
}

export default DateRangeFilter