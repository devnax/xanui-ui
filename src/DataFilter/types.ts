
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

export type DataFilterRadio = {
   type: "boolean";
   key: string;
   label: string;
   options: ({ label: string, value: boolean })[];
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

export type DataFilterOption = DataFilterText | DataFilterNumber | DataFilterSelect | DataFilterMultiSelect | DataFilterRadio | DataFilterDate | DataFilterDateRange;

export type DataFilterProps = {
   options: DataFilterOption[],
   inline?: boolean;
   compact?: boolean;
}