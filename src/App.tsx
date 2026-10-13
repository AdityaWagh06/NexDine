import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Code-split route components to eliminate huge monolithic bundles
const LandingPage = lazy(() => import("./pages/public/LandingPage"));
const RegisterPage = lazy(() => import("./pages/public/RegisterPage"));
const LoginPage = lazy(() => import("./pages/public/LoginPage"));

// Restaurant dashboard
const RestaurantDashboard = lazy(() => import("./pages/restaurant/Dashboard"));

// Admin panel
const AdminLogin = lazy(() => import("./pages/admin/LoginPage"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));

// Customer ordering
const CustomerMenu = lazy(() => import("./pages/customer/CustomerMenu"));

// 404
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Branded loading fallback
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-white flex items-center justify-center p-4">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-[#7650E8] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#7650E8]/25 animate-pulse">
        ND
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#7650E8] animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#7650E8] animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#7650E8] animate-bounce" />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Restaurant Dashboard Routes */}
          <Route path="/restaurant/*" element={<RestaurantDashboard />} />

          {/* Admin Panel Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Customer Ordering Route */}
          <Route path="/menu/:slug" element={<CustomerMenu />} />

          {/* 404 */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
