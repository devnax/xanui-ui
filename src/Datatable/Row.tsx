"use client";
import { useState } from 'react'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import Checkbox from '../Checkbox'
import IconButton from '../IconButton'
import List from '../List'
import ListItem from '../ListItem'
import ActionIcon from '@xanui/icons/MoreVert'
import Menu from '../Menu'
import { DataTableDefaultRow, DatatablePropsWithState } from './types';


type Props = DatatablePropsWithState & {
    rawRow: DataTableDefaultRow;
    row: DataTableDefaultRow;
}

const Row = ({ rows, rawRow, row, rowAction, disableRow, hideCheckbox, columns, compact, state, update }: Props) => {
    const selected = row.id ? state.selected.includes(row?.id) : false
    let selectedColor = selected ? "primary.soft" : "transparent"
    const [target, setTarget] = useState<any>()
    const isDisable = (disableRow ? disableRow(rawRow, state) : false) || false

    return (
        <TableRow >
            {!hideCheckbox && <TableCell width={40} bgcolor={selectedColor}>
                {
                    !!row.id && <Checkbox
                        size={compact ? "small" : "medium"}
                        checked={selected}
                        onChange={() => {
                            if (isDisable || !row.id) return
                            let ids = [...state.selected]
                            ids.includes(row.id) ? ids.splice(ids.indexOf(row.id), 1) : ids.push(row.id)
                            let selectedLength = 0
                            rows.forEach(r => {
                                const isDisable = (disableRow ? disableRow(r, state) : false) || false
                                if (!isDisable) selectedLength++
                            })

                            update({
                                selectAll: selectedLength === ids.length,
                                selected: ids
                            })
                        }}
                    />
                }

            </TableCell>}
            {
                columns.map(({ label, field, sortable, ...rest }, idx) => {
                    field = field || label
                    if (!row[field]) return <TableCell key={idx}></TableCell>
                    return (
                        <TableCell
                            key={idx}
                            textAlign="left"
                            {...rest}
                            bgcolor={selectedColor}
                        >
                            {row[field]}
                        </TableCell>
                    )
                })
            }
            {!!(rows.length && rowAction && rowAction((rows as any)[0])?.length) && <TableCell width={30} bgcolor={selectedColor} borderColor="divider">
                <IconButton
                    disabled={isDisable || selected}
                    onClick={(e: any) => setTarget(e.currentTarget)}
                    variant="text"
                    color="default"
                >
                    <ActionIcon />
                </IconButton>
                <Menu target={target} placement="bottom-right" onClickOutside={() => setTarget(null)}>
                    <List
                        bgcolor="background.primary"
                        minWidth={160}
                        sx={{
                            '& > li': {
                                borderBottom: 1,
                                '&:last-child': {
                                    borderBottom: 0
                                }
                            }
                        }}
                    >
                        {rowAction({ row, state }).map(({ label, icon, onClick }) => {
                            return (
                                <ListItem
                                    key={label}
                                    startIcon={icon}
                                    onClick={(e: any) => {
                                        onClick && onClick(e)
                                        setTarget(null)
                                    }}
                                >{label}</ListItem>
                            )
                        })}
                    </List>
                </Menu>
            </TableCell>
            }
        </TableRow>
    )
}

export default Row