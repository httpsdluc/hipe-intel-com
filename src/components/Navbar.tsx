"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-wide hover:text-blue-500"
        >
          HIPE INTEL COM
        </Link>

        {/* Desktop Nav Only */}
        <nav className="flex gap-6 text-sm text-white items-center">
          <Link href="/learn-more" className="hover:text-yellow-400">
            Learn More
          </Link>
          <Link href="/directory" className="hover:text-green-400">
            Directory
          </Link>
          <Link href="/stay-up-to-date" className="hover:text-yellow-300">
            Stay Up to Date
          </Link>
          <Link href="/community" className="hover:text-pink-300">
            Community
          </Link>
          <Link href="/opportunities" className="hover:text-purple-300">
            Opportunities
          </Link>

          <SignedOut>
            <Link
              href="/sign-in"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition text-white"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-white px-4 py-2 rounded text-black hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/profile/edit" className="hover:text-blue-400">
              Edit Profile
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
