"use client";

import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 px-2 py-1 rounded-full border border-gray-400">
      <button
        className={cn({ "text-gray-400": theme !== "system" })}
        suppressHydrationWarning
        onClick={(e) => {
          e.stopPropagation();
          setTheme("system");
        }}
      >
        <Computer />
      </button>
      <button
        className={cn({ "text-gray-400": theme !== "light" })}
        suppressHydrationWarning
        onClick={(e) => {
          e.stopPropagation();
          setTheme("light");
        }}
      >
        <Sun />
      </button>
      <button
        className={cn({ "text-gray-400": theme !== "dark" })}
        suppressHydrationWarning
        onClick={(e) => {
          e.stopPropagation();
          setTheme("dark");
        }}
      >
        <Moon />
      </button>
    </div>
  );
}
