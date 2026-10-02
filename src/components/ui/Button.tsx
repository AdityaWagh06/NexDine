import React, { type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "emerald" | "amber";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none cursor-pointer";

  const variants = {
    primary:
      "bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow border border-stone-800 focus:ring-stone-700",
    secondary:
      "bg-stone-700 text-white hover:bg-stone-800 shadow-sm focus:ring-stone-600",
    emerald:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 hover:shadow-md focus:ring-emerald-500",
    amber:
      "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:from-amber-400 hover:to-amber-500 shadow-sm shadow-amber-500/25 font-bold focus:ring-amber-500",
    outline:
      "border border-stone-200/90 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 focus:ring-stone-400 shadow-2xs",
    ghost: "text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-400",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-4.5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="mr-1.5 inline-flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
