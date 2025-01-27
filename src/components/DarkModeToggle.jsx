import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react"; // Ikon dari lucide-react

function DarkModeToggle() {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;

    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    applyTheme(theme);
    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const themeIcon = {
    light: <Sun className="text-yellow-500" size={20} />,
    dark: <Moon className="text-blue-500" size={20} />,
    system: <Monitor className="text-gray-500" size={20} />,
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform"
      >
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
          transition={{ duration: 0.3 }}
        >
          {themeIcon[theme]}
        </motion.div>
      </button>
    </div>
  );
}

export default DarkModeToggle;