import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const baseStyles = "inline-flex items-center justify-center rounded-md text-body transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40";
    
    const variants = {
      default: "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-hover hover:opacity-90",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
      ghost: "bg-transparent text-foreground hover:bg-muted hover:text-primary",
    };
    
    const sizes = {
      default: "h-12 px-6 py-3",
      sm: "h-9 px-4 py-2 text-body-sm",
      lg: "h-14 px-8 py-4",
      icon: "h-12 w-12",
    };
    
    return (
      <Comp
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
