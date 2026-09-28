import React from "react";
import { Link } from "react-router-dom";
import { Home, Store } from "lucide-react";
import { Button } from "../components/ui";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-6">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="text-7xl font-extrabold text-slate-900 tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Page Not Found</h2>
        <p className="text-xs text-slate-500 mb-8 leading-relaxed">
          The page or restaurant URL you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" icon={<Home className="w-4 h-4" />}>
            Back to NextDine Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
