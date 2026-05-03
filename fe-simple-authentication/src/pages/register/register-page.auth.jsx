import { useState, useEffect } from "react";
import { register } from "@/services/auth.service";
import Loading from "@/components/loading.component";
import PasswordInput from "@/components/password-input.component";
import useDarkMode from "@/hooks/use-darkmode";
import FloatingInput from "@/components/floating-input.component";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Gunakan hook dark mode
  const [darkMode] = useDarkMode();

  // 🔹 Pastikan class "dark" diterapkan dari awal
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await register({ name, email, username, password });
      setSuccess(res.message || "Registration successful!");
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(
        err?.message || "Registration failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-4">
      {loading && <Loading />}

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sm:p-10 transition-colors duration-300">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between w-full mb-8">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-blue-600 rounded-md text-white text-xl font-semibold">
              SA
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Simple Authentication
            </span>
          </div>
        </div>

        {/* 🔹 Judul */}
        <div className="w-full mb-6 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create an account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Please fill in your details below
          </p>
        </div>

        {/* 🔹 Pesan error / sukses */}
        {error && (
          <div className="mb-4 text-sm text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/40 py-2 px-3 rounded-md text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 py-2 px-3 rounded-md text-center">
            {success}
          </div>
        )}

        {/* 🔹 Form registrasi */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput
            id="name"
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FloatingInput
            id="email"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FloatingInput
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <FloatingInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* 🔹 Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => (window.location.href = "/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
