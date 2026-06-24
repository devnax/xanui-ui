"use client"
import { useMemo } from "react"

let _d: CSSStyleDeclaration;

const useBlurCss = (blur: number, mode?: "transparent" | "blur") => {
   return useMemo(() => {
      let transparent = { bgcolor: "paper.ghost.primary" }
      if (typeof window === 'undefined' || mode === 'transparent') {
         return transparent
      }
      const d = _d || (_d = window.document.createElement("div").style)
      return d['backdropFilter'] !== undefined ? { backdropFilter: `blur(${(blur / 100) * 10}px)` } : transparent
   }, [blur])
}


export default useBlurCss