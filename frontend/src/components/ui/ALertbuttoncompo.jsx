import PropTypes from "prop-types";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out",
      className
    )}
    {...props}
  />
));

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// ✅ Add PropTypes validation
AlertDialogOverlay.propTypes = {
  className: PropTypes.string,
};

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Content
    ref={ref}
    className={cn("fixed left-[50%] top-[50%] z-50 w-full max-w-lg", className)}
    {...props}
  />
));

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

// ✅ Add PropTypes validation
AlertDialogContent.propTypes = {
  className: PropTypes.string,
};
