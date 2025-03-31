// src/app/page.tsx
"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="text-center space-y-6 mb-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold">
          Welcome to <span className="text-blue-500">HIPE INTEL COM</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          A community for aspiring minds interested in the U.S. Intelligence
          Community.
        </p>

        <SignedOut>
          <div className="space-x-4">
            <Link href="/sign-in">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-semibold transition">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="bg-white hover:bg-gray-200 px-6 py-2 rounded-full text-gray-900 font-semibold transition">
                Sign Up
              </button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center space-y-4 mt-6">
            <p className="text-green-400 font-medium">You're signed in!</p>
            <UserButton />
            <Link
              href="/profile/setup"
              className="text-blue-400 hover:underline text-sm"
            >
              Set up your profile
            </Link>
          </div>
        </SignedIn>
      </div>

      {/* Feature Boxes */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Learn More",
            description:
              "Discover the 18 U.S. Intelligence Community agencies and what they do.",
            href: "/learn-more",
          },
          {
            title: "Opportunities",
            description:
              "Find internships, jobs, and career resources in national security.",
            href: "/opportunities",
          },
          {
            title: "Community",
            description:
              "Join discussions, share posts, and connect with other aspiring professionals.",
            href: "/community",
          },
          {
            title: "Stay Up to Date",
            description:
              "Get real-time news and updates from the intelligence world.",
            href: "/stay-up-to-date",
          },
        ].map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:border-blue-500 transition duration-200"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              {feature.title}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
