import React, { type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "emerald";
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
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-sm focus:ring-slate-700",
    secondary:
      "bg-slate-700 text-white hover:bg-slate-800 shadow-sm focus:ring-slate-600",
    emerald:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm focus:ring-emerald-500",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400 shadow-xs",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
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
