"use client"
import { DataFilterText } from '../types'
import Input from '../../Input'

type Props = {
   option: DataFilterText;
   value: string;
   onChange: (value: string) => void;
}

const TextFilter = ({ option, value, onChange }: Props) => {
   return (
      <Input
         size={"small"}
         variant="outline"
         placeholder={option.label}
         value={value}
         onChange={e => onChange(e.target.value)}
      />
   )
}

export default TextFilter
