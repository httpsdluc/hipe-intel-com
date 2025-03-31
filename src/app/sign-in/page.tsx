// src/app/sign-in/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-md p-6 rounded-xl bg-gray-900 border border-gray-800 shadow-lg">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/profile/setup" // 👈 redirects here after login
        />
      </div>
    </main>
  );
}
