"use client";
import React, { useEffect, useState } from 'react'
import ViewBox from '../ViewBox'
import { Tag, useInterface } from '@xanui/core';
import SelectedBox from './SelectedBox'
import TableArea from './Table'
import FilterBox from './FilterBox'
import TablePagination, { TablePaginationState } from '../TablePagination'
import Stack from '../Stack'
import { DatatableProps, DatatableState } from './types';


const DataTable = React.forwardRef((props: DatatableProps, ref: React.Ref<HTMLDivElement>) => {
    let [_props] = useInterface<any>("Datatable", props, {})
    let {
        rows,
        tabs,
        totalCount,

        pagination: { perpages = [30, 50, 100] } = {},
        defaultState = {},
        onStateChange,

        fixedHeader,
        disablePagination,
        slotProps,
    } = _props

    const [state, setState] = useState<DatatableState>({
        selected: defaultState?.selected || [],
        selectAll: defaultState?.selectAll || false,
        pagination: {
            page: defaultState?.page || 1,
            perpage: perpages && perpages.length > 0 ? perpages[0] : 10,
            from: defaultState?.from || 1,
            to: defaultState?.to || (perpages && perpages.length > 0 ? perpages[0] : 10),
        },
        tab: tabs ? (defaultState?.tab || tabs[0].value || tabs[0].label.toLowerCase()) : "",
        search: defaultState?.search || "",
    })

    const update = (s: Partial<DatatableState>) => setState(o => ({ ...o, ...s }))

    useEffect(() => {
        if (onStateChange) {
            onStateChange(state)
        }
    }, [state])

    return (
        <ViewBox
            baseClass='datatable'
            ref={ref as any}
            height="100%"
            sx={{
                '& thead': fixedHeader ? {
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.primary",
                    zIndex: 1
                } : {},
            }}
            startContent={(
                <Tag
                    baseClass='datatable-header'
                    sxr={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <SelectedBox {..._props} update={update} state={state} />
                    <FilterBox {..._props} update={update} state={state} />
                </Tag>
            )}
        >
            <TableArea
                {..._props}
                update={update}
                state={state}
            />
            <Stack
                p={1}
                alignItems="flex-end"
            >
                {!disablePagination && <TablePagination
                    {...slotProps?.pagination}
                    total={totalCount || rows.length}
                    page={state.pagination.page}
                    perpage={state.pagination.perpage}
                    perpages={perpages}
                    onChange={(state: TablePaginationState) => {
                        update({ pagination: state })
                    }}
                />}
            </Stack>
        </ViewBox>
    )
})

export default DataTable