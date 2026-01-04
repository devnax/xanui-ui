"use client";
import Stack from '../Stack'
import Tabs from '../Tabs'
import Tab from '../Tab'
import Select from '../Select'
import Option from '../Option'
import Input from '../Input'
import IconSearch from '@xanui/icons/Search'
import { DatatableFilter, DatatablePropsWithState } from './types';
import IconButton from '../IconButton';
import FilterListOutlined from '@xanui/icons/FilterListOutlined';
import Drawer from '../Drawer';
import Text from '../Text';
import React from 'react';
import CloseOutlined from '@xanui/icons/CloseOutlined';
import ViewBox from '../ViewBox';

const FilterBox = (props: DatatablePropsWithState) => {
   let {
      tabs,
      filters,
      hideSearch,
      slotProps,
      skeleton,
      state,
      update,
   } = props
   const [openFilter, setOpenFilter] = React.useState(false)
   let checked = state.selectAll || !!state.selected.length

   if (checked) return <></>

   return (
      <Stack
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         zIndex={1}
         radius={1}
         mb={1}
         height={50}
         width="100%"
      >
         <Stack gap={2.4} flexRow>
            {
               tabs && <Tabs
                  disabled={skeleton ? true : false}
                  onChange={(value: any) => {
                     update({ tab: value })
                  }}
                  value={state.tab}
               >
                  {
                     tabs.map(t => <Tab key={t.label} value={t.value || t.label.toLowerCase()}>{t.label}</Tab>)
                  }
               </Tabs>
            }
         </Stack>
         <Stack
            flexRow
            gap={2}
            className='datatable-header-right-area'
            alignItems={"center"}
         >
            {!hideSearch && <Input
               disabled={skeleton ? true : false}
               endIcon={<IconSearch />}
               placeholder='Search...'
               {...slotProps?.search}
               value={state.search}
               onChange={(e: any) => {
                  update({ search: e.target.value })
               }}
            />}
            <Stack>
               <IconButton
                  color="default"
                  variant={"text"}
                  onClick={() => {
                     setOpenFilter(true)
                  }}
               >
                  <FilterListOutlined />
               </IconButton>
               <Drawer
                  open={openFilter}
                  onClickOutside={() => { }}
                  placement={"right"}
               >
                  <ViewBox
                     p={2}
                     startContent={<Stack mb={2} flexRow justifyContent={"space-between"} alignItems="center">
                        <Text fontWeight={600} fontSize="h6">Filters</Text>
                        <IconButton
                           size="small"
                           color="default"
                           variant="text"
                           onClick={() => {
                              setOpenFilter(false)
                           }}
                        >
                           <CloseOutlined />
                        </IconButton>
                     </Stack>}
                  >
                     <Stack
                        gap={2}
                     >
                        {
                           filters ? Object.keys(filters).map(name => {
                              const items: DatatableFilter[] = (filters as any)[name]
                              return (
                                 <Select
                                    key={name}
                                    fullWidth
                                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                                    value={(state as any)[name] || ""}
                                    onChange={(value) => {
                                       update({ [name]: value } as any)
                                    }}
                                 >
                                    {
                                       items.map((item) => <Option key={name + item.value} value={item.value}>
                                          {item.label}
                                       </Option>)
                                    }
                                 </Select>
                              )
                           }) : <Text>No Filters Available</Text>
                        }
                     </Stack>

                  </ViewBox>
               </Drawer>
            </Stack>

         </Stack>
      </Stack>
   )
}

export default FilterBox