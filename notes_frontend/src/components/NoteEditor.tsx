"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Tag } from "./../components/Tag";

type Props = {
  title: string;
  content: string;
  tags: string[];
  onChange: (update: { title?: string; content?: string; tags?: string[] }) => void;
  onSave: () => void;
  onDelete: () => void;
};

export function NoteEditor({ title, content, tags, onChange, onSave, onDelete }: Props) {
  const [tagInput, setTagInput] = useState("");

  function addTagFromInput() {
    const raw = tagInput.trim();
    if (!raw) return;
    const split = raw.split(",").map((t) => t.trim()).filter(Boolean);
    const merged = Array.from(new Set([...(tags || []), ...split]));
    onChange({ tags: merged });
    setTagInput("");
  }

  function removeTag(t: string) {
    onChange({ tags: tags.filter((x) => x !== t) });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSave();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSave]);

  const isEmpty = useMemo(() => !title && !content && tags.length === 0, [title, content, tags]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Note title"
          className="w-full"
          aria-label="Note title"
        />
        <Button onClick={onSave} aria-label="Save note">
          Save
        </Button>
        <Button variant="danger" onClick={onDelete} aria-label="Delete note">
          Delete
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Write your note here..."
        className="min-h-[240px] flex-1"
        aria-label="Note content"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tags (comma separated)"
            className="w-full"
            aria-label="Add tags"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTagFromInput();
              }
            }}
          />
          <Button variant="secondary" onClick={addTagFromInput}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t} label={t} onRemove={() => removeTag(t)} />
          ))}
          {tags.length === 0 && <span className="text-xs text-gray-500">No tags</span>}
        </div>
      </div>
      {isEmpty && <p className="text-xs text-gray-400">Tip: Use Ctrl/Cmd + S to quickly save.</p>}
    </div>
  );
}
