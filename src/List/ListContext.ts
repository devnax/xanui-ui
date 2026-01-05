// ListContext.ts
import React from "react"

export type ListSize = "small" | "medium" | "large"

export interface ListContextValue {
   size: ListSize
}

export const ListContext = React.createContext<ListContextValue | null>(null)

export const useListContext = () => React.useContext(ListContext)
