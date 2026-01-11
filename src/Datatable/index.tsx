"use client";
import React, { useMemo } from 'react'
import ViewBox from '../ViewBox'
import { Tag, useInterface } from '@xanui/core';
import SelectedBox from './SelectedBox'
import TableArea from './Table'
import FilterBox from './FilterBox'
import TablePagination, { TablePaginationState } from '../TablePagination'
import Stack from '../Stack'
import { DatatableProps, DatatableState } from './types';
import Skeleton from '../Skeleton';

export type * from './types';

const DataTable = React.forwardRef((props: DatatableProps, ref: React.Ref<HTMLDivElement>) => {
    let [p] = useInterface<any>("Datatable", props, {})

    let _props = useMemo(() => {
        let np = { ...p }

        if (typeof np.skeleton === 'number' || np.skeleton === true) {
            const limit = np.perpages && np.perpages.length > 0 ? np.perpages[0] : 10
            let length = np.skeleton === true ? limit : np.skeleton

            if (!np.hideCheckbox) {
                np.columns = [{
                    label: '', field: "__checkbox", width: 34
                }, ...np.columns]
            }

            if (np.rowAction) {
                np.columns = [...np.columns, { label: "", field: "__actions", width: 34 }]
            }

            let columns = np.columns || []

            np.rows = []
            for (let i = 0; i < length; i++) {
                let r: any = { id: i }
                for (let col of columns) {
                    r[col.field] = ""
                }
                np.rows.push(r)
            }

            np.renderRow = (r: any) => {
                for (let col of columns) {
                    r[col.field] = <Skeleton
                        animation={"wave"}
                        height={16}
                        radius={.5}
                        width={"100%"}
                    />
                }
                return r
            }
            np.hideCheckbox = true
            np.rowAction = undefined
        }
        return np
    }, [p.skeleton, props.columns, props.rowAction, p.hideCheckbox, p.rows])

    let {
        rows,
        tabs,

        pagination: { perpages = [30, 50, 100], total = 0 } = {},
        state: userState = {},
        onChange,

        fixedHeader,
        hidePagination,
        slotProps,


        // skip props for ViewBox
        skeleton,
        rowAction,
        disableRow,
        renderRow,
        filters,
        hideCheckbox,
        hideSearch,
        columns,
        compact,

        ...viewBoxProps
    } = _props


    const state = {
        selected: userState?.selected || [],
        selectAll: userState?.selectAll || false,
        pagination: {
            page: userState?.page || 1,
            perpage: perpages && perpages.length > 0 ? perpages[0] : 10,
            from: userState?.from || 1,
            to: userState?.to || (perpages && perpages.length > 0 ? perpages[0] : 10),
        },
        tab: tabs ? (userState?.tab || tabs[0].value || tabs[0].label.toLowerCase()) : "",
        search: userState?.search || "",
        sortable: userState?.sortable || {},
        filters: userState?.filters || {}
    }

    const update = (s: Partial<DatatableState>) => {
        onChange({ ...state, ...s })
    }

    return (
        <ViewBox
            height="100%"
            {...viewBoxProps}
            baseClass='datatable'
            ref={ref as any}
            sx={{
                ...viewBoxProps?.sx,
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
                {!hidePagination && <TablePagination
                    disabled={_props.skeleton ? true : false}
                    {...slotProps?.pagination}
                    total={total || rows.length}
                    page={state.pagination.page}
                    perpage={state.pagination.perpage}
                    perpages={perpages}
                    slotProps={{
                        select: {
                            size: "small",
                        }
                    }}
                    onChange={(state: TablePaginationState) => {
                        update({ pagination: state })
                    }}
                />}
            </Stack>
        </ViewBox>
    )
})

export default DataTable