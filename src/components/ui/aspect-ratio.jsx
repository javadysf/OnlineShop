import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

const AspectRatio = AspectRatioPrimitive.Root

const AspectRatioContent = React.forwardRef(({ className, ...props }, ref) => (
  <AspectRatioPrimitive.Content
    ref={ref}
    className={cn("h-full w-full", className)}
    {...props}
  />
))
AspectRatioContent.displayName = AspectRatioPrimitive.Content.displayName

export { AspectRatio, AspectRatioContent } 