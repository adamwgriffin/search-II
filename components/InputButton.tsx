import React from "react";
import { cn } from "@/lib/utils";

export type InputButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type: "radio" | "checkbox";
};

export function InputButton({
  children,
  className,
  ...props
}: InputButtonProps) {
  return (
    <label className="inline-block cursor-pointer">
      <input {...props} className="peer hidden" />
      <span
        className={cn(
          `inline-block w-full text-center px-4 py-2 border text-sm font-medium
          transition-colors bg-white dark:bg-gray-600 border-gray-300
          text-inherit hover:bg-gray-100 peer-checked:bg-blue-600
          peer-checked:border-blue-700 peer-checked:text-white
          peer-checked:hover:bg-blue-500`,
          className
        )}
      >
        {children}
      </span>
    </label>
  );
}
