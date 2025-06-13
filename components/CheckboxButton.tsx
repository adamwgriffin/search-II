import React from "react";

export type CheckboxButtonProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function CheckboxButton({
  children,
  ...props
}: CheckboxButtonProps) {
  return (
    <label className="inline-block cursor-pointer">
      <input {...props} className="peer hidden" type="checkbox" />
      <span
        className="inline-block px-4 py-2 rounded-md border text-sm font-medium transition-colors
          bg-white border-gray-300 text-gray-800 hover:bg-gray-100
          peer-checked:bg-blue-600 peer-checked:border-blue-700 peer-checked:text-white
          peer-checked:hover:bg-blue-500"
      >
        {children}
      </span>
    </label>
  );
}
