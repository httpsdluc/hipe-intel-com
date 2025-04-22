"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/learn-more", label: "Learn" },
    { href: "/community", label: "Community" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/stay-up-to-date", label: "News" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition"
        >
          HIPE INTEL COM
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary underline underline-offset-4"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          {/* Theme toggle with margin-right for separation */}
          <div className="mr-4">
            <ModeToggle />
          </div>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="outline" className="px-6 py-2 text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="px-6 py-2 text-sm">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="px-6 py-2 text-sm">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
