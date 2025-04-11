"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Learn More", href: "/learn-more" },
    { label: "Community", href: "/community" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Stay Up To Date", href: "/stay-up-to-date" },
  ];

  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-wide hover:text-blue-500 transition"
        >
          HIPE INTEL COM
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathname === link.href
                  ? "text-blue-400 underline underline-offset-4"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-blue-500 hover:text-blue-400 transition"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-medium transition ${
                pathname === link.href
                  ? "text-blue-400 underline underline-offset-4"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-800">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="block text-sm font-medium text-blue-500 hover:text-blue-400 transition"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
