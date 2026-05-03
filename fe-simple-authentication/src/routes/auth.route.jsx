import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/login-page.auth";
import Register from "@/pages/register/register-page.auth";
import Dashboard from "@/pages/dashboard/dashboard-page.auth";

export default function AppRoutes({ isAuthenticated, onLoginSuccess, onLogout }) {
  return (
    <Routes>
      {/* Jika sudah login, redirect dari /login ke /dashboard */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLoginSuccess={onLoginSuccess} />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Register onLoginSuccess={onLoginSuccess} />
          )
        }
      />

      {/* Dashboard: hanya bisa diakses jika sudah login */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={onLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Default route */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}
