import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Collection } from "mongodb";

export const dynamic = "force-dynamic"; // ✅ Avoid build-time DB connection

interface Profile {
  userId: string;
  occupation: string;
  major: string;
  school: string;
  expertise: string;
  aspiration: string;
  age: string;
  birthday: string;
  gender: string;
  ethnicity: string;
  race: string;
}

// @ts-expect-error Next.js App Router requires untyped params
export default async function Page({ params }) {
  const { id } = params;

  const db = await connectToDatabase();
  const collection = db.collection("profiles") as Collection<Profile>;
  const profile = await collection.findOne({ userId: id });

  if (!profile) return notFound();

  return (
    <main className="p-6 text-white max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="space-y-2">
        <p>
          <strong>User ID:</strong> {profile.userId}
        </p>
        <p>
          <strong>Occupation:</strong> {profile.occupation}
        </p>
        <p>
          <strong>Major:</strong> {profile.major}
        </p>
        <p>
          <strong>School:</strong> {profile.school}
        </p>
        <p>
          <strong>Expertise:</strong> {profile.expertise}
        </p>
        <p>
          <strong>Aspiration:</strong> {profile.aspiration}
        </p>
        <p>
          <strong>Age:</strong> {profile.age}
        </p>
        <p>
          <strong>Birthday:</strong> {profile.birthday}
        </p>
        <p>
          <strong>Gender:</strong> {profile.gender}
        </p>
        <p>
          <strong>Ethnicity:</strong> {profile.ethnicity}
        </p>
        <p>
          <strong>Race:</strong> {profile.race}
        </p>
      </div>
    </main>
  );
}
