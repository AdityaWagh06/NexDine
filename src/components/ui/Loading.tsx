import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  text = "Loading...",
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-3">
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">{content}</div>
  );
};
