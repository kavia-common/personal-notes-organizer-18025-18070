"use client";

import React from "react";

export function Header({ email }: { email?: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-12 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-sm bg-[#0070f3]" />
        <span className="text-sm font-medium text-[#1a202c]">Notes</span>
      </div>
      {email && <span className="text-xs text-gray-600">{email}</span>}
    </header>
  );
}
