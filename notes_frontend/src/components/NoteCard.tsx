"use client";

import React from "react";
import type { Note } from "@/lib/api";

type Props = {
  note: Note;
  active?: boolean;
  onClick: () => void;
};

export function NoteCard({ note, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-md border p-3 text-left transition-colors ${
        active ? "border-[#0070f3] bg-[#f5f9ff]" : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <h4 className="text-sm font-medium text-[#1a202c]">{note.title || "Untitled"}</h4>
        <span className="text-[10px] text-gray-500">{new Date(note.updatedAt).toLocaleDateString()}</span>
      </div>
      {note.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {note.tags.map((t) => (
            <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700">
              #{t}
            </span>
          ))}
        </div>
      )}
      {note.content && (
        <p className="mt-2 line-clamp-2 text-xs text-gray-600">{note.content}</p>
      )}
    </button>
  );
}
