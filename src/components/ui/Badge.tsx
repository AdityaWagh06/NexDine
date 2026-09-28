import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "error" | "warning" | "neutral" | "accent-secondary" | "primary" | "info";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
}) => {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    error: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
    primary: "bg-slate-900 text-white border-slate-900",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    "accent-secondary": "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
};
