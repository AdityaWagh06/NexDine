import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    const textareaId = props.id || (props.name ? `textarea-${props.name}` : undefined);

    return (
      <div className="w-full">
        {label && (
          <label className="label" htmlFor={textareaId}>
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`input min-h-[100px] resize-y ${
            error ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500" : ""
          } ${className}`}
          rows={4}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
