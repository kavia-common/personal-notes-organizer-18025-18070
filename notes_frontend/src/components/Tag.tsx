"use client";

import React from "react";

export function Tag({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f2f6ff] border border-[#d6e6ff] px-2 py-0.5 text-xs text-[#1a202c]">
      #{label}
      {onRemove && (
        <button
          aria-label={`Remove ${label}`}
          className="ml-1 rounded-full p-0.5 hover:bg-[#e3edff]"
          onClick={onRemove}
          type="button"
        >
          ×
        </button>
      )}
    </span>
  );
}
