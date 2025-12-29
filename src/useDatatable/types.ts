import { ReactNode } from "react";

export type RowId = string;

export type SortingState = {
   id: string;
   desc: boolean;
}[];

export type PaginationState = {
   pageIndex: number;
   pageSize: number;
};

export type FilterState = {
   id: string;
   value: any;
}[];

export type TableState = {
   sorting: SortingState;
   pagination: PaginationState;
   filters: FilterState;
};

export type ColumnDef<T> = {
   id?: string;
   accessorKey?: keyof T;
   accessorFn?: (row: T) => any;

   header?: ReactNode | ((ctx: any) => ReactNode);
   cell?: (ctx: { value: any; row: T }) => ReactNode;

   sortable?: boolean;
   filterable?: boolean;
};
