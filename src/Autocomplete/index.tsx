import React, { ReactElement } from 'react'
import Input from '../Input'
import Menu from '../Menu'
import List from '../List';
import ListItem, { ListItemProps } from '../ListItem';
import Chip from '../Chip';
import IconButton from '../IconButton';
import Close from '@xanui/icons/Close';
import CircleProgress from '../CircleProgress';
import { useBreakpointPropsType, UseColorTemplateColor } from '@xanui/core';

export type AutocompleteProps = {

   options: any[] | ((text: string) => Promise<any[]>)
   getLabel: (option: any) => string;
   onChange?: (value: any) => void;
   value?: any;
   multiple?: boolean;
   renderOption?: (option: any, props: any) => ReactElement<ListItemProps>

   // input props customization
   name?: string;
   placeholder?: string;
   readOnly?: boolean;
   autoFocus?: boolean;
   autoComplete?: string;
   label?: useBreakpointPropsType<string>;

   onFocus?: (e: React.FocusEvent<any>) => void;
   onBlur?: (e: React.FocusEvent<any>) => void;
   onInput?: (e: React.FormEvent<any>) => void;
   onKeyDown?: (e: React.KeyboardEvent<any>) => void;
   onKeyUp?: (e: React.KeyboardEvent<any>) => void;

   rows?: useBreakpointPropsType<number>;
   minRows?: useBreakpointPropsType<number>;
   maxRows?: useBreakpointPropsType<number>;
   fullWidth?: boolean;

   startIcon?: useBreakpointPropsType<ReactElement>;
   endIcon?: useBreakpointPropsType<ReactElement>;
   iconPlacement?: useBreakpointPropsType<"start" | "center" | "end">;
   focused?: boolean;
   color?: useBreakpointPropsType<Omit<UseColorTemplateColor, "default">>;
   variant?: useBreakpointPropsType<"fill" | "outline" | "text">;
   error?: boolean;
   helperText?: useBreakpointPropsType<string>;

}

const Autocomplete = ({ value, onChange, renderOption, options, getLabel, multiple, ...inputProps }: AutocompleteProps) => {
   const [_options, setOptions] = React.useState<any[]>()
   const [inputValue, setInputValue] = React.useState("")
   const [timer, setTimer] = React.useState<any>(null)
   const [loading, setLoading] = React.useState(false)
   const [open, setOpen] = React.useState(false)
   const menuRef = React.useRef<any>(null)

   getLabel ??= (option: any) => option.toString();
   multiple ??= false;

   let startIcons = [
      inputProps.startIcon
   ]

   if (!!value && multiple && Array.isArray(value)) {
      value.map((v: any, index: number) => {
         startIcons.push(<Chip
            key={index}
            size="small"
            label={getLabel!(v)}
            variant={"fill"}
            color="default"
            endIcon={<IconButton
               size={20}
               variant={"text"}
               color="default"
               onClick={(e) => {
                  e.stopPropagation();
                  let newValue = Array.isArray(value) ? [...value] : []
                  newValue = newValue.filter((val: any) => getLabel!(val) !== getLabel!(v))
                  onChange && onChange(newValue)
               }}
            >
               <Close />
            </IconButton>}
         />)
      })
   }

   let endIcons = [
      inputProps.endIcon
   ]

   if (loading) {
      endIcons.push(<CircleProgress
         key="auto-complete-loading-icon"
         size="small"
      />)
   } else if (!!value && !multiple) {
      endIcons.push(<IconButton
         key="auto-complete-clear-button"
         variant={"text"}
         color="default"
         onClick={(e) => {
            e.stopPropagation();
            onChange && onChange(undefined)
            setInputValue("")
         }}
      >
         <Close />
      </IconButton>)
   }


   return (
      <>
         <Input
            {...inputProps as any}
            ref={menuRef}
            slotProps={{
               rootContainer: {
                  flexWrap: 'wrap',
                  ...(multiple ? { height: "auto", gap: .5 } : {})
               },
               input: {
                  width: multiple ? 'auto' : '100%',
                  flex: 1,
                  minWidth: 20,
               }
            }}
            startIcon={startIcons}
            endIcon={endIcons}
            value={inputValue}
            onKeyDown={(e) => {
               if (inputProps?.onKeyDown) {
                  inputProps.onKeyDown(e)
               }
               if (multiple && e.key === 'Backspace' && inputValue === "" && Array.isArray(value) && value.length > 0) {
                  let newValue = [...value]
                  newValue.pop()
                  onChange && onChange(newValue)
               }
            }}
            onChange={(e) => {
               const value = e.target.value;
               setInputValue(value)
               if (!value) {
                  setOptions([])
                  setOpen(false)
                  return;
               }
               setOpen(true)

               clearTimeout(timer)
               setTimer(setTimeout(async () => {
                  if (typeof options === 'function') {
                     setLoading(true)
                     const result = await options(value)
                     setOptions(result)
                     setLoading(false)
                  } else {
                     const filtered = options.filter(option => getLabel!(option).toLowerCase().includes(value.toLowerCase()))
                     setOptions(filtered)
                  }
               }, 300))
            }}
         />
         <Menu
            target={open ? menuRef.current : null}
            onClickOutside={() => {
               setOptions([])
               setInputValue("")
            }}
            slotProps={{
               content: { minWidth: menuRef.current ? menuRef.current.offsetWidth : 'auto' }
            }}
         >
            <List
               maxHeight={400}
               overflow={"auto"}
            >
               {_options?.map((option, index) => (
                  renderOption ? <div key={"auto-complete" + index + getLabel!(option)}>{renderOption(option, {
                     onClick: () => {
                        if (multiple) {
                           let newValue = Array.isArray(value) ? [...value] : []
                           const has = newValue.find((v: any) => getLabel!(v) === getLabel!(option))
                           if (!has) {
                              newValue.push(option)
                           } else {
                              newValue = newValue.filter((v: any) => getLabel!(v) !== getLabel!(option))
                           }
                           onChange && onChange(newValue)
                        } else {
                           onChange && onChange(option)
                           setOpen(false)
                           setInputValue(getLabel!(option))
                           setOptions([])
                        }
                     }
                  })}</div> : <ListItem
                     key={index}
                     onClick={() => {
                        if (multiple) {
                           let newValue = Array.isArray(value) ? [...value] : []
                           const has = newValue.find((v: any) => getLabel!(v) === getLabel!(option))
                           if (!has) {
                              newValue.push(option)
                           } else {
                              newValue = newValue.filter((v: any) => getLabel!(v) !== getLabel!(option))
                           }
                           onChange && onChange(newValue)
                        } else {
                           onChange && onChange(option)
                           setOpen(false)
                           setInputValue(getLabel!(option))
                           setOptions([])
                        }
                     }}
                  >
                     {getLabel!(option)}
                  </ListItem>
               ))}
            </List>
         </Menu>
      </>
   )
}

export default Autocomplete
