"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark ? "dark" : "light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-16 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center p-1 transition-all"
        >
            <span className="absolute left-2 text-[10px] font-medium text-black dark:text-white">dark</span>
            <span className="absolute right-2 text-[10px] font-medium text-black dark:text-white">ligth</span>
            <div className={`w-5 h-5 bg-blue-400 dark:bg-blue-700 rounded-full shadow-md transform transition-all flex items-center justify-center ${theme === "dark" ? "translate-x-[33px]" : "translate-x-1"}`}>
                {theme === "dark" ? "🌙" : "☀️"}
            </div>
        </button>
    );
}
