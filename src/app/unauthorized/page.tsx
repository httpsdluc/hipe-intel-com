// src/app/unauthorized/page.tsx
"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Restricted Access</h1>
      <p className="text-lg text-gray-300 max-w-xl mb-8">
        This page is only available to registered users. Join HIPE INTEL COM to
        connect with others who share your passion for national security and
        intelligence.
      </p>
      <div className="flex gap-4">
        <Link
          href="/sign-in"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white text-sm font-semibold"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="bg-white text-gray-900 hover:bg-gray-200 px-6 py-3 rounded-full text-sm font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
