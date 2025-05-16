// src/app/profile/[id]/page.tsx
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";
import { ProfileType } from "@/types/Profile";
import Link from "next/link";

export default async function Page(props: any) {
  const id = props?.params?.id;

  await connectToDatabase();

  const profile = (await Profile.findOne({
    userId: id,
  }).lean()) as ProfileType | null;

  if (!profile) return notFound();

  const fields: { label: string; value: string | undefined }[] = [
    { label: "Occupation", value: profile.occupation },
    { label: "Major", value: profile.major },
    { label: "School", value: profile.school },
    { label: "Expertise", value: profile.expertise },
    { label: "Aspiration", value: profile.aspiration },
    { label: "Age", value: profile.age },
    { label: "Birthday", value: profile.birthday },
    { label: "Gender", value: profile.gender },
    { label: "Ethnicity", value: profile.ethnicity },
    { label: "Race", value: profile.race },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-md border border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

      <div className="space-y-4">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between border-b border-gray-700 pb-2"
          >
            <span className="font-semibold text-gray-300">{label}</span>
            <span className="text-white">{value || "—"}</span>
          </div>
        ))}
      </div>

      <Link
        href="/profile/edit"
        className="block text-center mt-6 text-blue-400 hover:underline"
      >
        Edit Your Profile
      </Link>
    </div>
  );
}
