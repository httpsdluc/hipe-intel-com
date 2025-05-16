//src/app/profile/setup/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfileSetupPage() {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    username: "",
    occupation: "",
    major: "",
    school: "",
    expertise: "",
    aspiration: "",
    age: "",
    birthday: "",
    gender: "",
    ethnicity: "",
    race: "",
  });

  useEffect(() => {
    const checkProfile = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/profile/check?userId=${user.id}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        if (data.exists) {
          router.push(`/profile/${user.id}`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Error checking profile:", err);
        toast.error("Failed to check profile.");
        setLoading(false);
      }
    };

    checkProfile();
  }, [user, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: user?.id }),
      });

      if (res.ok) {
        toast.success("Profile saved!");
        router.push(`/profile/${user?.id}`);
      } else {
        const errorData = await res.json(); // ✅ log exact reason
        console.error("❌ Server error:", errorData);
        throw new Error("Profile creation failed");
      }
    } catch (err) {
      console.error("❌ Error saving profile:", err);
      toast.error("Error saving profile.");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-white mt-10">Checking your profile...</p>
    );
  }

  const occupations = ["Student", "Professional", "Educator", "Other"];
  const expertiseLevels = [
    "Novice",
    "Advanced Beginner",
    "Competent",
    "Proficient",
    "Expert",
  ];
  const aspirations = [
    "Air Force Intelligence",
    "Army Intelligence",
    "Central Intelligence Agency",
    "Coast Guard Intelligence",
    "Defense Intelligence Agency",
    "Department of Energy",
    "Department of Homeland Security",
    "Department of State",
    "Department of the Treasury",
    "Drug Enforcement Administration",
    "Federal Bureau of Investigation",
    "Marine Corps Intelligence",
    "National Geospatial-Intelligence Agency",
    "National Reconnaissance Office",
    "National Security Agency",
    "Navy Intelligence",
    "Space Force Intelligence",
  ];
  const genders = [
    "Male",
    "Female",
    "Non-binary",
    "Other",
    "Prefer not to say",
  ];
  const ethnicities = ["Hispanic or Latino", "Not Hispanic or Latino"];
  const races = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Two or More Races",
    "Some Other Ethnicity",
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-md border border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Set Up Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={user?.firstName || ""}
          disabled
          className="w-full p-2 rounded bg-gray-800 text-gray-300"
        />
        <input
          type="email"
          value={user?.emailAddresses[0]?.emailAddress || ""}
          disabled
          className="w-full p-2 rounded bg-gray-800 text-gray-300"
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        />

        <select
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="">Select Occupation</option>
          {occupations.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        {form.occupation === "Student" && (
          <>
            <input
              name="major"
              placeholder="Major"
              value={form.major}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
            <input
              name="school"
              placeholder="School"
              value={form.school}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
          </>
        )}

        <select
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="">Select Expertise</option>
          {expertiseLevels.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>

        <select
          name="aspiration"
          value={form.aspiration}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="">Select Aspiration</option>
          {aspirations.map((asp) => (
            <option key={asp}>{asp}</option>
          ))}
        </select>

        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <input
          name="birthday"
          type="date"
          value={form.birthday}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="">Select Gender</option>
          {genders.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        <select
          name="ethnicity"
          value={form.ethnicity}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="">Select Ethnicity</option>
          {ethnicities.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>

        <select
          name="race"
          value={form.race}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option value="">Select Race</option>
          {races.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold text-white"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
