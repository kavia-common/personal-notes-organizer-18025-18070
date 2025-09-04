"use client";

import React from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

type SidebarProps = {
  onNewNote: () => void;
  search: string;
  onSearchChange: (v: string) => void;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (t: string) => void;
  onLogout?: () => void;
};

export function Sidebar({
  onNewNote,
  search,
  onSearchChange,
  tags,
  selectedTags,
  onToggleTag,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col gap-4 border-r border-gray-200 bg-white p-4 md:w-72">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1a202c]">Notes</h2>
        <Button size="sm" onClick={onNewNote} aria-label="Create note">
          + New
        </Button>
      </div>
      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search notes..."
        aria-label="Search notes"
      />
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 && <span className="text-xs text-gray-500">No tags yet</span>}
          {tags.map((t) => {
            const active = selectedTags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => onToggleTag(t)}
                className={`rounded-full border px-2 py-1 text-xs ${
                  active
                    ? "border-[#0070f3] bg-[#e9f1ff] text-[#0059c4]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                #{t}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-auto">
        {onLogout && (
          <Button variant="ghost" className="w-full justify-center" onClick={onLogout}>
            Logout
          </Button>
        )}
        <p className="mt-2 text-[10px] text-gray-400">Theme: Light • Minimal</p>
      </div>
    </aside>
  );
}
