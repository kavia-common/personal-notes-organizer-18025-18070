import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <h1 className="mb-2 text-xl font-medium text-[#1a202c]">404 – Page Not Found</h1>
        <p className="mb-4 text-sm text-gray-600">The page you’re looking for doesn’t exist.</p>
        <Link href="/" className="text-sm text-[#0070f3] hover:underline">
          Go home
        </Link>
      </div>
    </main>
  );
}
