"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-20 w-20 overflow-hidden rounded-full bg-primary/20 flex justify-center items-center`,
      className,
    )}
    {...props}
    style={{
      background: `radial-gradient(closest-side, white 60%, transparent 60% 100%),\
      conic-gradient(rgb(${value ? 255 - value * 2.55 : 0}, ${value ? value * 2.55 : 0}, 0.0) ${value || 0}%, white 0)`,
    }}
  >
    <div className="">{`${value ? value / 10 : 0}`}</div>
  </ProgressPrimitive.Root>
));
CircleProgress.displayName = "CircleProgress";

export { Progress };
