
import React from 'react'
import ListItem, { ListItemProps } from '../ListItem'

export type OptionProps = ListItemProps & {
    value: string | number;
}

const Option = React.forwardRef(({ value, children, ...props }: OptionProps, ref: React.Ref<any>) => {
    return (
        <ListItem {...props} ref={ref}>{children}</ListItem>
    )
})

export default Option