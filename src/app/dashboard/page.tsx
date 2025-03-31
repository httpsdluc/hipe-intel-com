import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // ✅ redirect import

export default async function DashboardPage() {
  const { userId } = await auth();

  // ✅ Redirect to sign-in if user is not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Welcome to your Dashboard!</h1>
    </div>
  );
}
