import { TagProps } from "@xanui/core";

export type DataFilterText = {
   type: "text";
   key: string;
   label: string;
}

export type DataFilterNumber = {
   type: "number";
   key: string;
   label: string;
}

export type DataFilterNumberRange = {
   type: "number-range";
   key: string;
   label: string;
}

export type DataFilterSelect = {
   type: "select";
   key: string;
   label: string;
   options: ({ label: string, value: string })[];
}

export type DataFilterMultiSelect = {
   type: "multi-select";
   key: string;
   label: string;
   options: ({ label: string, value: string })[];
}

export type DataFilterDate = {
   type: "date";
   key: string;
   label: string;
}

export type DataFilterDateRange = {
   type: "date-range";
   key: string;
   label: string;
}

export type DataFilterOption = DataFilterText | DataFilterNumber | DataFilterNumberRange | DataFilterSelect | DataFilterMultiSelect | DataFilterDate | DataFilterDateRange;

export type DataFilterProps = Omit<TagProps, "children" | "value"> & {
   options: DataFilterOption[],
   value?: { [key: string]: any };
   onChange?: (state: { [key: string]: any }) => void;
   inline?: boolean;


}