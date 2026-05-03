import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // cek localStorage dulu, default "light"
    return localStorage.getItem("theme") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "false");
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
