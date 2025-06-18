import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item 
    ref={ref} 
    className={cn(
      "bg-transparent rounded-xl mb-0 transition-all duration-300 ease-in-out",
      className
    )} 
    {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-3 font-medium text-lg transition-all group",
        className
      )}
      {...props}
    >
      <span className="text-left">{children}</span>
      <div className="relative h-6 w-6 text-[#A365D5] group-hover:text-white transition-colors duration-200">
        <Plus className="h-6 w-6 shrink-0 transition-all duration-300 ease-in-out transform scale-100 opacity-100 group-data-[state=open]:opacity-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-90" />
        <Minus className="h-6 w-6 shrink-0 transition-all duration-300 ease-in-out absolute top-0 left-0 transform scale-0 opacity-0 group-data-[state=open]:opacity-100 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };