"use client";
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import Checkbox from '../Checkbox'
import IntermidiatIcon from '@xanui/icons/IndeterminateCheckBox'
import { DatatablePropsWithState } from './types';
import Stack from '../Stack';
import ArrowDropDown from '@xanui/icons/ArrowDropDown';
import ArrowDropUp from '@xanui/icons/ArrowDropUp';


const TableHeadRender = ({ columns, rows, disableRow, rowAction, hideCheckbox, compact, skeleton, state, update }: DatatablePropsWithState) => {
    if (!columns.length) return <></>
    let checked = state.selectAll || !!state.selected.length
    const sortables = state.sortable || {}

    return (
        <TableHead position="relative">
            <TableRow bgcolor="default" borderBottom={1} >
                {!hideCheckbox && <TableCell th width={40}>
                    <Checkbox
                        size={compact ? "small" : "medium"}
                        checkIcon={state.selected.length && !state.selectAll ? <IntermidiatIcon /> : undefined}
                        checked={checked}
                        onChange={() => {
                            let ids: any = []
                            let undefinedCount = 0
                            for (let i = 0; i < rows.length; i++) {
                                const row = rows[i]
                                const isDisable = (disableRow ? disableRow(row, state) : false) || false
                                if (!isDisable && row.id) {
                                    ids.push(row.id)
                                } else {
                                    undefinedCount += 1
                                }
                            }

                            if (undefinedCount) {
                                update({
                                    selected: state.selected.length ? [] : ids,
                                    selectAll: !state.selected.length
                                })
                            } else {
                                update({
                                    selected: state.selectAll ? [] : ids,
                                    selectAll: !state.selectAll
                                })
                            }
                        }}
                    />
                </TableCell>}
                {
                    columns.map(({ label, field: _f, sortable, ...rest }, idx) => <TableCell key={idx} th textAlign="left" {...rest}>
                        <Stack
                            disabled={skeleton ? true : false}
                            flexRow
                            alignItems="center"
                            cursor={sortable ? "pointer" : "default"}
                            userSelect={"none"}
                            onClick={() => {

                                if (sortable) {
                                    let newSort: any = sortables[_f as any] === 'asc' ? 'desc' : 'asc'
                                    update({
                                        sortable: {
                                            ...sortables,
                                            [_f as any]: newSort
                                        }
                                    })
                                }
                            }}
                        >
                            {label}
                            {sortable && <>
                                {
                                    sortables[_f as any] === 'asc' ? <ArrowDropDown /> : <ArrowDropUp />
                                }
                            </>}
                        </Stack>
                    </TableCell>)
                }
                {
                    !!(rows.length && rowAction && rowAction((rows as any)[0])?.length) && <TableCell th width={30} />
                }
            </TableRow>
        </TableHead>
    )
}

export default TableHeadRender
