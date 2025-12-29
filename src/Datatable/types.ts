import { ReactElement } from "react";
import { TableColumnProps } from "../TableCell";
import { IconButtonProps } from "../IconButton";
import { InputProps } from "../Input";
import { TableProps } from "../Table";
import { TablePaginationProps, TablePaginationState } from "../TablePagination";


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
export type DatatableFilter = {
   label: string;
   value: string | number
}

export type DatatableProps = {
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

   defaultState?: Partial<DatatableState>;
   onStateChange?: (state: DatatableState) => void;

   filters?: { [key: string]: DatatableFilter[] }
   fixedHeader?: boolean;
   hidePagination?: boolean;
   hideSearch?: boolean;
   hideCheckbox?: boolean;
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
   sortable?: {
      [field: string]: 'asc' | 'desc'
   }
}

export type DatatablePropsWithState = DatatableProps & {
   state: DatatableState,
   update: (state: Partial<DatatableState>) => void;
}