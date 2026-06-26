import { createContext, useContext } from "react";
import { OptionProps } from "../Option";

type SelectContextValue = {
  value?: string | number;
  onChange?: (optionProps: OptionProps) => void;
};

export const SelectContext = createContext<SelectContextValue>({
  value: undefined,
  onChange: undefined,
});

export const useSelectContext = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Invalid Select Container");
  return ctx;
};
