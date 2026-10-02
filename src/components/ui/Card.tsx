import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs transition-all duration-200 ${
        hover ? "hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
