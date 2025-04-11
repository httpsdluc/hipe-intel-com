"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="text-blue-500">HIPE INTEL COM</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            A community for aspiring minds interested in the U.S. Intelligence
            Community.
          </p>

          <div className="flex flex-col items-center">
            <SignedOut>
              <div className="flex gap-4 flex-wrap justify-center">
                <Link
                  href="/sign-in"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full text-white font-medium shadow transition duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-white hover:bg-gray-200 px-6 py-2.5 rounded-full text-gray-900 font-medium shadow transition duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col items-center space-y-4">
                <p className="text-green-400 font-medium">You're signed in!</p>
                <div className="flex items-center gap-4">
                  <UserButton />
                  <Link
                    href="/profile/setup"
                    className="text-blue-400 hover:text-blue-300 underline text-sm transition whitespace-nowrap"
                  >
                    Set up your profile
                  </Link>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Explore Our Resources
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4">
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
                className="bg-gray-900 border border-gray-800 hover:border-blue-500 rounded-xl p-4 shadow hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {feature.description}
                  </p>
                </div>
                <span className="text-blue-400 hover:text-blue-300 text-xs font-medium inline-flex items-center mt-auto">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
