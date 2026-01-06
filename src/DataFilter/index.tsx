"use client"
import Stack from '../Stack'
import { DataFilterProps } from './types'
import SelectFilter from './options/SelectFilter'
import MultiSelectFilter from './options/MultiSelectFilter'
import NumberFilter from './options/NumberFilter'
import TextFilter from './options/TextFilter'
import NumberRangeFilter from './options/NumberRangeFilter'
import DateFilter from './options/DateFilter'
import DateRangeFilter from './options/DateRangeFilter'
import React from 'react'
import { Tag } from '@xanui/core'

export {
   SelectFilter,
   MultiSelectFilter,
   NumberFilter,
   TextFilter,
   NumberRangeFilter,
   DateFilter,
   DateRangeFilter,
}

export * from './types'

const DataFilter = ({ inline, options, onChange, value, ...props }: DataFilterProps, ref: React.Ref<HTMLDivElement>) => {
   inline ??= false
   value ??= {}
   onChange ??= () => { }

   return (
      <Tag
         {...props}
         sxr={{
            flexBox: true,
            flexDirection: inline ? 'row' : 'column',
            alignItems: inline ? 'center' : 'stretch',
            flexWrap: inline ? 'wrap' : 'nowrap',
            gap: 1,
            p: 2,
            radius: 1,
         }}
         baseClass='data-filter'
         ref={ref}
      >
         {
            options.map((option, index) => {
               switch (option.type) {
                  case "text":
                     return (<Stack
                        width={inline ? 300 : "100%"}
                        key={index}
                     >
                        <TextFilter
                           option={option as any}
                           value={value[option.key] ?? null}
                           onChange={(v) => {
                              onChange({
                                 ...value,
                                 [option.key]: v
                              })
                           }}
                        />
                     </Stack>
                     )
                  case "number":
                     return (<Stack
                        width={inline ? 300 : "100%"}
                        key={index}
                     >
                        <NumberFilter
                           option={option as any}
                           value={value[option.key] ?? null}
                           onChange={(v) => {
                              onChange({
                                 ...value,
                                 [option.key]: v
                              })
                           }}
                        />
                     </Stack>
                     )
                  case "number-range":
                     return (<Stack
                        width={inline ? 300 : "100%"}
                        key={index}
                     >
                        <NumberRangeFilter
                           option={option as any}
                           value={value[option.key] ?? null}
                           onChange={(v) => {
                              onChange({
                                 ...value,
                                 [option.key]: v
                              })
                           }}
                        />
                     </Stack>
                     )
                  case "select":
                     return (<Stack
                        width={inline ? 300 : "100%"}
                        key={index}
                     >
                        <SelectFilter
                           option={option as any}
                           value={value[option.key] ?? null}
                           onChange={(v) => {
                              onChange({
                                 ...value,
                                 [option.key]: v
                              })
                           }}
                        />
                     </Stack>
                     )
                  case "multi-select":
                     return (<Stack
                        width={inline ? 300 : "100%"}
                        key={index}
                     >
                        <MultiSelectFilter
                           option={option as any}
                           value={value[option.key] ?? []}
                           onChange={(v) => {
                              onChange({
                                 ...value,
                                 [option.key]: v
                              })
                           }}
                        />
                     </Stack>
                     )
                  case "date":
                     return (<Stack
                        width={inline ? 300 : "100%"}
                        key={index}
                     >
                        <DateFilter
                           option={option as any}
                           value={value[option.key] ?? null}
                           onChange={(v) => {
                              onChange({
                                 ...value,
                                 [option.key]: v
                              })
                           }}
                        />
                     </Stack>
                     )
                  case "date-range":
                     return (<Stack
                        width={inline ? 300 : "100%"}
                        key={index}
                     >
                        <DateRangeFilter
                           option={option as any}
                           value={value[option.key] ?? null}
                           onChange={(v) => {
                              onChange({
                                 ...value,
                                 [option.key]: v
                              })
                           }}
                        />
                     </Stack>
                     )
                  default:
                     return null

               }
            })
         }
      </Tag>
   )
}

export default React.forwardRef(DataFilter);
