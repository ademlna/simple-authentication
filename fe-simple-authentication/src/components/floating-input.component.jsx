import { X } from "lucide-react";
import { useState } from "react";

export default function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const showClear = value?.length > 0;

  return (
    <div className="relative w-full">
      {/* Input field */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        {...props}
        className={`peer w-full px-4 pt-5 pb-2 border-2 rounded-lg text-base
          bg-transparent appearance-none outline-none transition-all duration-200
          ${
            focused
              ? "border-indigo-500"
              : "border-gray-300 dark:border-gray-700"
          }
          text-gray-900 dark:text-gray-100
          focus:border-indigo-500
        `}
      />

      {/* Floating label */}
      <label
        htmlFor={id}
        className={`absolute left-3 px-1 bg-white dark:bg-gray-800 transition-all duration-200
          ${
            focused || value
              ? "-top-2 text-xs text-indigo-600 font-medium"
              : "top-4 text-base text-gray-500"
          }
        `}
      >
        {label}
      </label>

      {/* Clear (X) button */}
      {showClear && (
        <button
          type="button"
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
