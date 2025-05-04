"use client";

import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex gap-2 px-2 py-1 rounded-full border border-gray-400">
      <button
        title="System"
        className={cn({ "text-gray-400": theme !== "system" })}
        suppressHydrationWarning
        onClick={(e) => {
          e.stopPropagation();
          setTheme("system");
        }}
      >
        <Computer size={16} />
      </button>
      <button
        title="Light"
        className={cn({ "text-gray-400": theme !== "light" })}
        suppressHydrationWarning
        onClick={(e) => {
          e.stopPropagation();
          setTheme("light");
        }}
      >
        <Sun size={16} />
      </button>
      <button
        title="Dark"
        className={cn({ "text-gray-400": theme !== "dark" })}
        suppressHydrationWarning
        onClick={(e) => {
          e.stopPropagation();
          setTheme("dark");
        }}
      >
        <Moon size={16} />
      </button>
    </div>
  );
}
