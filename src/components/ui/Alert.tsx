import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  message,
  onClose,
  className = "",
}) => {
  const styles = {
    success: {
      bg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
      iconColor: "text-emerald-600",
      icon: CheckCircle2,
    },
    error: {
      bg: "bg-rose-50/80 border-rose-200 text-rose-900",
      iconColor: "text-rose-600",
      icon: AlertCircle,
    },
    warning: {
      bg: "bg-amber-50/80 border-amber-200 text-amber-900",
      iconColor: "text-amber-600",
      icon: AlertTriangle,
    },
    info: {
      bg: "bg-indigo-50/80 border-indigo-200 text-indigo-900",
      iconColor: "text-indigo-600",
      icon: Info,
    },
  };

  const config = styles[type] || styles.info;
  const Icon = config.icon;

  return (
    <div
      className={`border rounded-xl p-4 ${config.bg} ${className}`}
    >
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${config.iconColor} mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-1 text-sm">
          {title && (
            <h4 className="font-semibold mb-1 leading-tight">{title}</h4>
          )}
          <p className="opacity-90 leading-relaxed">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-slate-400 hover:text-slate-700 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
