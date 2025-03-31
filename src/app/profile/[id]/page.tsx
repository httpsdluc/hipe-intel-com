import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const client = await clientPromise;
  const db = client.db("hipe");
  const profile = await db
    .collection("profiles")
    .findOne({ userId: params.id });

  if (!profile) return notFound();

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow border border-gray-700">
      <h1 className="text-2xl font-bold mb-4">👤 {profile.occupation}</h1>
      <ul className="space-y-2 text-sm">
        {profile.major && (
          <li>
            <strong>Major:</strong> {profile.major}
          </li>
        )}
        {profile.school && (
          <li>
            <strong>School:</strong> {profile.school}
          </li>
        )}
        <li>
          <strong>Expertise:</strong> {profile.expertise}
        </li>
        <li>
          <strong>Aspiration:</strong> {profile.aspiration}
        </li>
        <li>
          <strong>Age:</strong> {profile.age}
        </li>
        <li>
          <strong>Birthday:</strong> {profile.birthday}
        </li>
        <li>
          <strong>Gender:</strong> {profile.gender}
        </li>
        <li>
          <strong>Ethnicity:</strong> {profile.ethnicity}
        </li>
        <li>
          <strong>Race:</strong> {profile.race}
        </li>
      </ul>
    </main>
  );
}
