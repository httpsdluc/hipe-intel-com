// app/sign-up/[[...sign-up]]/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-black text-white">
      <SignUp />
    </main>
  );
}
