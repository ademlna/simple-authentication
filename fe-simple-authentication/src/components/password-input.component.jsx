// src/components/password-input.component.jsx
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import useDarkMode from "@/hooks/use-darkmode";

export default function PasswordInput({
  id = "password",
  label = "Password",
  value,
  onChange,
  required = true,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  // 🔹 gunakan hook dark mode
  const [darkMode] = useDarkMode();

  // 🔹 pastikan class "dark" diterapkan/dihapus sesuai mode
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (darkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative w-full">
      {/* Input field */}
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        className={`peer w-full px-4 pt-4 pb-2 pr-10 border-2 rounded-lg text-base
          bg-transparent appearance-none outline-none transition-all duration-200
          ${
            focused
              ? "border-blue-500 dark:border-blue-400"
              : "border-gray-300 dark:border-gray-600"
          }
          text-gray-900 dark:text-gray-100
          focus:border-blue-500 dark:focus:border-blue-400
          bg-white dark:bg-gray-800
        `}
      />

      {/* Floating label */}
      <label
        htmlFor={id}
        className={`absolute left-3 px-1 transition-all duration-200 
          bg-white dark:bg-gray-800
          ${
            focused || value
              ? "-top-2 left-2 text-xs font-medium text-blue-600 dark:text-blue-400"
              : "top-3 text-gray-500 dark:text-gray-400 text-base"
          }
        `}
      >
        {label}
      </label>

      {/* Show/Hide password button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
