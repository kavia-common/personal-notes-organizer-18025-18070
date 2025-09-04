"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string };

export function Input({ className = "", label, hint, id, ...props }: InputProps) {
  // Always call hook; derive final id via memo to avoid conditional hook usage
  const autoId = React.useId();
  const inputId = React.useMemo(() => id ?? autoId, [id, autoId]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm text-gray-800">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#0070f3] focus:outline-none focus:ring-2 focus:ring-[#A5C8FF] ${className}`}
        {...props}
      />
      {hint && <span className="text-xs text-gray-500">{hint}</span>}
    </div>
  );
}
