"use client"
 
import * as React from "react"
import { cn } from "@/lib/utils"
 
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-neutral-500",
        "focus-visible:outline-none focus-visible:border-[#0a2351]/20 focus-visible:ring-1 focus-visible:ring-[#0a2351]/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"
 
export { Input }
