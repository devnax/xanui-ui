"use client"
import { DataFilterText } from '../types'
import InputNumber from '../../InputNumber';

type Props = {
   option: DataFilterText;
   value: string;
   onChange: (value: string) => void;
}

const NumberFilter = ({ option, value, onChange }: Props) => {
   return (
      <InputNumber
         size={"small"}
         variant="outline"
         placeholder={option.label}
         value={value}
         onChange={e => {
            onChange(e.target.value);
         }}
      />
   )
}

export default NumberFilter
