
import React from 'react';
import { useInterface } from '@xanui/core';
import CheckIcon from '@xanui/icons/RadioButtonChecked'
import UnCheckIcon from '@xanui/icons/RadioButtonUnchecked'
import Checkbox, { CheckboxProps } from '../Checkbox';

export type RadioProps = CheckboxProps
const Radio = React.forwardRef((props: RadioProps, ref?: React.Ref<any>) => {
    let [rest] = useInterface<any>("Radio", props, {})
    return <Checkbox
        checkIcon={<CheckIcon />}
        uncheckIcon={<UnCheckIcon />}
        {...rest}
        type="radio"
        ref={ref}
        classNames={['radio', ...(rest?.classNames || [])]}
    />
})

export default Radio
