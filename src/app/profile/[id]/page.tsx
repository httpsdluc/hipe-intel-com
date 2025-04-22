// src/app/profile/[id]/page.tsx
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function ProfilePage({ params }: Props) {
  await connectToDatabase();
  const profile = await Profile.findOne({ userId: params.id });

  if (!profile) return notFound();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile for {profile.userId}</h1>
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

      <Link
        href="/profile/edit"
        className="inline-block mt-4 text-blue-500 hover:underline"
      >
        Edit Profile
      </Link>
    </div>
  );
}
