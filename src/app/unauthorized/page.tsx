// src/app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-8 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-gray-300 mb-6">
          You must be signed in to view this page.
        </p>
        <a
          href="/sign-in"
          className="text-blue-500 underline hover:text-blue-400 text-sm"
        >
          Go to Sign In
        </a>
      </div>
    </main>
  );
}
