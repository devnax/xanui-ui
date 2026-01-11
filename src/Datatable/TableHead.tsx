"use client";
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import Checkbox from '../Checkbox'
import IntermidiatIcon from '@xanui/icons/IndeterminateCheckBox'
import { DatatablePropsWithState } from './types';
import Stack from '../Stack';
import Text from '../Text';
import SwitchRight from '@xanui/icons/SwitchRight';

const TableHeadRender = ({ columns, rows, disableRow, rowAction, hideCheckbox, compact, skeleton, state, update }: DatatablePropsWithState) => {
    if (!columns.length) return <></>
    let checked = state.selectAll || !!state.selected.length
    let sortables = state.sortable || {}

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
                    columns.map(({ label, field: _f, sortable, ...rest }, idx) => <TableCell
                        key={idx}
                        th
                        textAlign="left"
                        {...rest}
                    >
                        <Stack
                            disabled={skeleton ? true : false}
                            flexRow
                            alignItems="center"
                            cursor={sortable ? "pointer" : "default"}
                            userSelect={"none"}
                            gap={.5}
                            onClick={() => {
                                if (sortable) {
                                    let v = sortables[_f as any]
                                    if (!v) {
                                        sortables[_f as any] = 'asc'
                                    } else if (v === 'asc') {
                                        sortables[_f as any] = 'desc'
                                    } else {
                                        delete sortables[_f as any]
                                    }
                                    update({
                                        sortable: sortables
                                    })
                                }
                            }}
                        >
                            <Text color="text.secondary" fontWeight={600}>{label}</Text>
                            {sortable && <>
                                <SwitchRight
                                    opacity={sortables[_f as any] ? 1 : .3}
                                    color={sortables[_f as any] ? 'brand' : 'text.secondary'}
                                    sx={{
                                        fontSize: 23,
                                        transform: sortables[_f as any] === 'desc' ? 'rotate(-90deg)' : 'rotate(90deg)',
                                    }}
                                />
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
