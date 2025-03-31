"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // If you're using Clerk for auth
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing profile
  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/edit?userId=${user.id}`);
        const data = await res.json();
        if (data && !data.error) {
          setFormData((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/profile/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.id,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow border border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "occupation",
          "major",
          "school",
          "expertise",
          "aspiration",
          "age",
          "birthday",
          "gender",
          "ethnicity",
          "race",
        ].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block capitalize mb-1">
              {field}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
              required={["occupation", "expertise", "aspiration"].includes(
                field
              )}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
        >
          Save Changes
        </button>

        {success && <p className="text-green-400 mt-2">Profile updated!</p>}
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
    </main>
  );
}
