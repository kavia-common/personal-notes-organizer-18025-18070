"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

export const dynamic = "force-dynamic";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { NoteCard } from "@/components/NoteCard";
import { NoteEditor } from "@/components/NoteEditor";
import type { Note } from "@/lib/api";
import { createNote, deleteNote, listNotes, updateNote } from "@/lib/api";
import { Button } from "@/components/ui/Button";

function useNotes(token?: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listNotes(token);
      setNotes(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load notes";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [token, setNotes]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { notes, setNotes, loading, error, refresh };
}

export default function NotesPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const { notes, setNotes, loading, error, refresh } = useNotes(user?.token);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [draft, setDraft] = useState<{ title: string; content: string; tags: string[] }>({
    title: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to login
      window.location.href = "/auth";
    }
  }, [authLoading, user]);

  const allTags = useMemo(() => {
    const bag = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => bag.add(t)));
    return Array.from(bag).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const filtered = useMemo(() => {
    let data = notes;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter((n) => (n.title || "").toLowerCase().includes(q) || (n.content || "").toLowerCase().includes(q));
    }
    if (selectedTags.length > 0) {
      data = data.filter((n) => selectedTags.every((t) => n.tags.includes(t)));
    }
    return data;
  }, [notes, search, selectedTags]);

  useEffect(() => {
    if (selectedId) {
      const found = notes.find((n) => n.id === selectedId);
      if (found) {
        setDraft({ title: found.title, content: found.content, tags: found.tags });
      }
    } else {
      setDraft({ title: "", content: "", tags: [] });
    }
  }, [selectedId, notes]);

  async function handleCreateNew() {
    const n = await createNote({ title: "Untitled", content: "", tags: [] }, user?.token);
    setNotes((prev) => [n, ...prev]);
    setSelectedId(n.id);
  }

  async function handleSave() {
    if (!selectedId) {
      // Create new if nothing selected and draft not empty
      const trimmedTitle = draft.title.trim();
      const trimmedContent = draft.content.trim();
      if (!trimmedTitle && !trimmedContent && draft.tags.length === 0) return;
      const n = await createNote({ title: trimmedTitle || "Untitled", content: trimmedContent, tags: draft.tags }, user?.token);
      setNotes((prev) => [n, ...prev]);
      setSelectedId(n.id);
      return;
    }
    const updated = await updateNote(selectedId, { title: draft.title, content: draft.content, tags: draft.tags }, user?.token);
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  }

  async function handleDelete() {
    if (!selectedId) return;
    await deleteNote(selectedId, user?.token);
    setNotes((prev) => prev.filter((n) => n.id !== selectedId));
    setSelectedId(null);
  }

  function toggleTag(t: string) {
    setSelectedTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header email={user?.email} />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          onNewNote={handleCreateNew}
          search={search}
          onSearchChange={setSearch}
          tags={allTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onLogout={logout}
        />
        <main className="flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-0 p-0 md:grid-cols-[360px_1fr] md:grid-rows-1">
            <section className="min-h-0 border-b border-gray-200 p-3 md:border-b-0 md:border-r">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Your Notes</h3>
                <Button size="sm" variant="ghost" onClick={refresh}>
                  Refresh
                </Button>
              </div>
              {loading ? (
                <p className="text-sm text-gray-500">Loading…</p>
              ) : error ? (
                <p className="text-sm text-red-600">{error}</p>
              ) : filtered.length === 0 ? (
                <p className="text-sm text-gray-500">No notes found.</p>
              ) : (
                <div className="flex max-h-full flex-col gap-2 overflow-auto pr-1">
                  {filtered.map((n) => (
                    <NoteCard key={n.id} note={n} active={n.id === selectedId} onClick={() => setSelectedId(n.id)} />
                  ))}
                </div>
              )}
            </section>
            <section className="min-h-0 p-4">
              <NoteEditor
                title={draft.title}
                content={draft.content}
                tags={draft.tags}
                onChange={(u) => setDraft((prev) => ({ ...prev, ...u }))}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
