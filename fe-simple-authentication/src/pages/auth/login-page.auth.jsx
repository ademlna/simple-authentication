import { useState, useEffect, useLayoutEffect } from "react";
import { login } from "@/services/auth.service";
import Loading from "@/components/loading.component";
import PasswordInput from "@/components/password-input.component";
import DarkModeToggle from "@/components/darkmode.component";
import useDarkMode from "@/hooks/use-darkmode";
import FloatingInput from "@/components/floating-input.component";


const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 gunakan hook dark mode
  const [darkMode] = useDarkMode();

  // 🔹 gunakan useLayoutEffect agar class dark diterapkan sebelum render
  useLayoutEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = await login(username, password);
      if (onLoginSuccess) onLoginSuccess(userData);
    } catch (err) {
      // Cek struktur error dari server
      const message =
        err?.response?.data?.meta?.message || // ambil dari API
        err?.message ||
        "Login gagal. Periksa username dan password Anda.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {loading && <Loading />}

      <div className="flex flex-col items-center w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sm:p-10 transition-colors duration-300">
        {/* Header (logo + toggle tema) */}
        <div className="flex items-center justify-between w-full mb-8">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-blue-600 rounded-md text-white text-xl font-semibold">
              SA
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Simple Authentication
            </span>
          </div>

          {/* 🔹 Dark mode toggle */}
        </div>

        {/* Subheader */}
        <div className="w-full mb-6 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back
          </h2>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 w-full text-center text-sm text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/40 py-2 rounded-md">
            {error}
          </div>
        )}

        {/* Form login */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            {/* <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            /> */}
            <FloatingInput
              label="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 dark:text-gray-300 gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Remember for 30 days
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => (window.location.href = "/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
