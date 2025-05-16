// src/app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg text-gray-300">
        You must be signed in to access this page.
      </p>
      <a
        href="/sign-in"
        className="mt-6 text-blue-500 underline text-sm hover:text-blue-400"
      >
        Sign In
      </a>
    </main>
  );
}
