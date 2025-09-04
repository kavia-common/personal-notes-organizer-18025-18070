"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    window.location.href = user ? "/notes" : "/auth";
  }, [user, loading]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-sm text-gray-600">Loading…</p>
    </main>
  );
}
