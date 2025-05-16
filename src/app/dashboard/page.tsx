// src/app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }

    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Welcome to your Dashboard!</h1>
      </div>
    );
  } catch (err) {
    console.error("❌ Error loading dashboard:", err);
    return (
      <div className="p-8 text-red-500">
        <p>Server error occurred. Please try again later.</p>
      </div>
    );
  }
}
