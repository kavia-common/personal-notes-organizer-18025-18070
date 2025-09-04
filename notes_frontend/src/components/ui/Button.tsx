"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({ className = "", variant = "primary", size = "md", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
  };
  const variants = {
    primary: "bg-[#0070f3] text-white hover:bg-[#0059c4] focus:ring-[#0070f3]",
    secondary: "bg-[#1a202c] text-white hover:bg-[#151a22] focus:ring-[#1a202c]",
    ghost: "bg-transparent text-[#1a202c] hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  } as const;

  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props} />;
}
