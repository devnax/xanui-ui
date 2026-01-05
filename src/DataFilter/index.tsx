"use client"
import Stack from '../Stack'
import Button from '../Button'
import AddOutlined from '@xanui/icons/AddOutlined'
import Menu from '../Menu'
import List from '../List'
import ListItem from '../ListItem'
import React from 'react'
import { DataFilterProps } from './types'
import SelectFilter from './options/SelectFilter'
import MultiSelectFilter from './options/MultiSelectFilter'
import Input from '../Input'
import Text from '../Text'
import ViewBox from '../ViewBox'


const DataFilter = ({ inline, options }: DataFilterProps) => {
   const [target, setTarget] = React.useState<HTMLElement | undefined>()
   const [state, setState] = React.useState<{ [key: string]: any }>({})
   inline ??= true
   return (
      <Stack
         direction={inline ? "row" : "column"}
         alignItems={'center'}
         gap={1}
         flexWrap={"wrap"}
         p={2}
         radius={1}
      >
         {
            options.map((option, index) => {
               switch (option.type) {
                  case "select":
                     return <SelectFilter
                        key={index}
                        option={option as any}
                        value={state[option.key] || ''}
                        onChange={(value) => {
                           setState(prev => ({
                              ...prev,
                              [option.key]: value
                           }))
                        }}
                     />
                  case "multi-select":
                     return <MultiSelectFilter
                        key={index}
                        option={option as any}
                        value={state[option.key] || ''}
                        onChange={(value) => {
                           setState(prev => ({
                              ...prev,
                              [option.key]: value
                           }))
                        }}
                     />
                  default:
                     return null

               }
            })
         }

         {
            inline && <>
               <Button
                  size={"small"}
                  variant="text"
                  startIcon={<AddOutlined />}
                  onClick={(e: any) => {
                     setTarget(e.currentTarget)
                  }}
               >Add Filter</Button>
               <Menu
                  target={target}
                  onClickOutside={() => setTarget(undefined)}
                  placement={"bottom-right"}

               >

                  <ViewBox
                     p={1}
                     gap={1}
                     sx={{
                        minWidth: 300,
                        maxHeight: 400,
                        overflow: "auto",
                     }}
                     startContent={<Text>Filter</Text>}
                     endContent={<Stack
                        direction="row"
                        gap={1}
                     >
                        <Button
                           size="small"
                           color="default"
                           variant="text"
                           onClick={() => {
                              setTarget(undefined)
                           }}
                        >
                           Cancel
                        </Button>
                        <Button
                           size="small"
                           onClick={() => {
                              setTarget(undefined)
                           }}
                        >
                           Apply
                        </Button>
                     </Stack>}
                  >
                     <Stack gap={1} p={1}>

                        <Input
                           placeholder='Age'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                        <Input
                           placeholder='Role'
                        />
                     </Stack>
                  </ViewBox>
               </Menu>
            </>
         }
      </Stack>
   )
}

export default DataFilter
