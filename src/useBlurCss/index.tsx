import { useMemo } from "react"
import { alpha } from "@xanui/core";

let _d: CSSStyleDeclaration;

const useBlurCss = (blur: number, mode?: "transparent" | "blur") => {
   return useMemo(() => {
      let transparent = { bgcolor: alpha("#000000", blur / 100) }
      if (typeof window === 'undefined' || mode === 'transparent') {
         return transparent
      }
      const d = _d || (_d = window.document.createElement("div").style)
      return d['backdropFilter'] !== undefined ? { backdropFilter: `blur(${(blur / 100) * 10}px)` } : transparent
   }, [blur])
}


export default useBlurCss