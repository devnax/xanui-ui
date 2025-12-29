"use client";

import Text from '../Text'
import Select, { SelectProps } from '../Select'
import Option from '../Option'
import IconButton, { IconButtonProps } from '../IconButton'
import React, { useMemo } from 'react'
import PrevIcon from '@xanui/icons/KeyboardArrowLeft'
import NextIcon from '@xanui/icons/KeyboardArrowRight'
import { TagProps, Tag, useInterface, UseColorTemplateColor, UseColorTemplateType, useBreakpointPropsType } from '@xanui/core';


export type TablePaginationState = { page: number, perpage: number, from: number, to: number }
export type TablePaginationProps = Omit<TagProps, "children"> & {
    page: number;
    total: number;
    perpage?: number;
    perpages?: number[];
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    onChange?: (state: TablePaginationState) => void;

    slotProps?: {
        button?: Omit<IconButtonProps, "children" | "color" | "variant">;
        select?: Omit<SelectProps, "value" | "onChange">;
    }
}

const TablePagination = React.forwardRef(({ page, total, perpage, onChange, ...rest }: TablePaginationProps, ref: React.Ref<any>) => {
    let [{ perpages, color, variant, slotProps, ...props }] = useInterface<any>("TablePagination", rest, {})
    color ??= "default"
    variant ??= "fill"
    perpages ??= [30, 50, 100]
    perpage = perpage || perpages[0] as number
    const isPerpage = perpages[0] && perpages.length >= 1

    const chunks = useMemo(() => {
        const chunks: any = [];
        let _page = 1;
        for (let from = 0; from < total; from += perpage) {
            const to = Math.min(from + perpage, total)
            chunks[_page] = { from: from + 1, to, page: _page, perpage }
            _page++
        }
        return chunks
    }, [perpage, perpages, total])

    if (!chunks.length) {
        return <></>
    }

    const current = chunks[page] || chunks[1]
    const hasNext = !!chunks[page + 1]
    const hasPrev = !!chunks[page - 1]

    return (
        <Tag
            {...props}
            sxr={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center"
            }}
            baseClass='table-pagination'
            ref={ref}
        >
            {
                isPerpage && <Tag baseClass='table-pagination-perpage' flexBox flexRow gap={1} alignItems="center">
                    <Text fontSize="button">PER PAGE</Text>
                    <Select
                        {...slotProps?.select}
                        slotProps={{
                            ...slotProps?.select?.slotProps,
                            input: {
                                ...slotProps?.select?.slotProps?.input,
                                slotProps: {
                                    container: {
                                        minWidth: "auto"
                                    }
                                },
                                width: perpage.toString().length * 10,
                                size: "small",
                            },
                        }}
                        value={perpage}
                        onChange={(value: any) => {
                            onChange && onChange({ page: 1, perpage: value, from: 1, to: Math.min(value, total) })
                        }}
                    >
                        {perpages.map((p: number) => <Option key={p} value={p}>{p}</Option>)}
                    </Select>
                </Tag>
            }
            <Tag
                sxr={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: 'center'
                }}
            >
                <Text fontSize="button">{current?.from}-{current.to}</Text>
                <Text color="text.secondary">of</Text>
                <Text fontSize="button">{total}</Text>
            </Tag>
            <Tag baseClass='table-pagination-navigation' flexBox flexRow gap={.4} >
                <IconButton
                    {...slotProps?.button}
                    color={color}
                    variant={variant}
                    size={30}
                    disabled={!hasPrev}
                    onClick={() => {
                        onChange && onChange(chunks[page - 1]);
                    }}
                >
                    <PrevIcon />
                </IconButton>
                <IconButton
                    {...slotProps?.button}
                    color={color}
                    variant={variant}
                    size={30}
                    disabled={!hasNext}
                    onClick={() => {
                        onChange && onChange(chunks[page + 1]);
                    }}
                >
                    <NextIcon />
                </IconButton>
            </Tag>
        </Tag>
    )
})

export default TablePagination