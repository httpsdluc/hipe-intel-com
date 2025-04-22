"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
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
    userId: "",
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`/api/profile?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...data, userId: user.id });
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch profile.");
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setSuccess(true);
      router.push(`/profile/${user?.id}`);
    } else {
      setError("Update failed.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(
          ([key, value]) =>
            key !== "userId" && (
              <div key={key}>
                <label className="block mb-1 capitalize">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
              </div>
            )
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
        {success && (
          <p className="text-green-500 mt-2">Profile updated successfully!</p>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
