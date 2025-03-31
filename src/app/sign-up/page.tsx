// src/app/sign-up/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-md p-6 rounded-xl bg-gray-900 border border-gray-800 shadow-lg">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/profile/setup" // 👈 redirects here after signup
        />
      </div>
    </main>
  );
}
