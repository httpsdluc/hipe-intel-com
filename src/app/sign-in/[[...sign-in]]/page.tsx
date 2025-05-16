"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-black text-white">
      <SignIn />
    </main>
  );
}
