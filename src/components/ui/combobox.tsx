"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility function to merge class names

const Combobox = SelectPrimitive.Root;
const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex items-center justify-between rounded-md border border-gray-700 bg-[#1e1e2e] px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
ComboboxTrigger.displayName = SelectPrimitive.Trigger.displayName;

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "absolute mt-2 w-full rounded-md bg-[#1e1e2e] border border-gray-700 shadow-lg",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
ComboboxContent.displayName = SelectPrimitive.Content.displayName;

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-blue-500/10 focus:bg-blue-500/10 focus:outline-none cursor-pointer",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-3">
      <Check className="w-4 h-4 text-blue-500" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
ComboboxItem.displayName = SelectPrimitive.Item.displayName;

export { Combobox, ComboboxTrigger, ComboboxContent, ComboboxItem };
