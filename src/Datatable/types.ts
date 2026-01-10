import { ReactElement } from "react";
import { TableColumnProps } from "../TableCell";
import { IconButtonProps } from "../IconButton";
import { InputProps } from "../Input";
import { TableProps } from "../Table";
import { TablePaginationProps, TablePaginationState } from "../TablePagination";
import { ViewBoxProps } from "../ViewBox";
import { DataFilterProps } from "../DataFilter/types";


export type ColumnType = (Omit<TableColumnProps, "children"> & { label: string, field?: string, sortable?: boolean })
export type DataTableDefaultRow = { id?: number, [key: string | number]: any }
export type RowActionType = Omit<IconButtonProps, "children"> & {
   label: string;
   icon: ReactElement;
}
export type TabsProps = {
   label: string;
   value?: string
}



export type DatatableProps = Omit<ViewBoxProps, "children" | "rows" | "onChange"> & {
   rows: DataTableDefaultRow[];
   columns: ColumnType[];
   tabs?: TabsProps[];
   rowAction?: (props: { row: DataTableDefaultRow | null, state: DatatableState }) => RowActionType[];
   renderRow?: (row: DataTableDefaultRow, state: DatatableState) => DataTableDefaultRow;
   disableRow?: (row: DataTableDefaultRow, state: DatatableState) => boolean | void;

   pagination?: {
      total?: number;
      perpages?: number[];
   };

   state?: DatatableStatePartial;
   onChange?: (state: DatatableState) => void;

   filters?: DataFilterProps['options']
   fixedHeader?: boolean;
   hidePagination?: boolean;
   hideSearch?: boolean;
   hideCheckbox?: boolean;
   skeleton?: boolean | number;
   compact?: boolean;
   slotProps?: {
      search?: Omit<InputProps, "value" | "onChange">;
      table?: Omit<TableProps, 'children'>;
      pagination?: TablePaginationProps;
   }
}

export type DatatableState = {
   selected: number[];
   selectAll: boolean;
   pagination: TablePaginationState
   tab: string;
   search: string;
   sortable: {
      [field: string]: 'asc' | 'desc'
   },
   filters: { [key: string]: any }
}

export type DatatableStatePartial = {
   selected?: number[];
   selectAll?: boolean;
   pagination?: Partial<TablePaginationState>
   tab?: string;
   search?: string;
   sortable?: {
      [field: string]: 'asc' | 'desc'
   },
   filters?: { [key: string]: any }
}

export type DatatablePropsWithState = DatatableProps & {
   state: DatatableState,
   update: (state: Partial<DatatableState>) => void;
}