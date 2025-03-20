"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  spinnerClassName?: string
  children: React.ReactNode
}

export function LoadingButton({
  loading = false,
  spinnerClassName,
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn(
        "relative transition-all duration-200",
        loading && "text-transparent",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" className={cn("text-current", spinnerClassName)} />
        </div>
      )}
      {children}
    </Button>
  )
}