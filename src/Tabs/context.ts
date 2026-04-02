"use client"
import { createContext, useContext } from "react";
import { TabsProps } from "./types";

export const TabContext = createContext<Omit<TabsProps, "children"> | null>(null)
export const useTabs = () => useContext(TabContext) as Omit<TabsProps, "children">