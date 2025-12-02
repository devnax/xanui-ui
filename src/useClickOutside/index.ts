import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
   onClickOutside: () => void
) {
   const ref = useRef<T | null>(null);

   useEffect(() => {
      const handler = (e: MouseEvent) => {
         if (!ref.current) return;
         if (!ref.current.contains(e.target as Node)) {
            onClickOutside();
         }
      };

      document.addEventListener("mousedown", handler);
      return () => {
         document.removeEventListener("mousedown", handler);
      };
   }, [onClickOutside]);

   return ref;
}
