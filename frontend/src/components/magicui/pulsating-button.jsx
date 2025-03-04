import React from "react";
import { cn } from "../../lib/utils";

export const PulsatingButton = React.forwardRef((
  {
    className,
    children,
    pulseColor = "#0096ff",
    duration = "1.5s",
    ...props
  },
  ref,
) => {
  return (
    (<button
      ref={ref}
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-center text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration
        }
      }
      {...props}>
      <div className="relative z-10">{children}</div>
      <div
        className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
    </button>)
  );
});

PulsatingButton.displayName = "PulsatingButton";
