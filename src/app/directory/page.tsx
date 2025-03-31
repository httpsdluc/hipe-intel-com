"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProfileType {
  userId: string;
  occupation: string;
  major?: string;
  school?: string;
  expertise: string;
  aspiration: string;
}

export default function DirectoryPage() {
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [search, setSearch] = useState("");
  const [aspirationFilter, setAspirationFilter] = useState("");

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

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch("/api/profile/all");
      const data = await res.json();
      setProfiles(data);
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((p) => {
    const matchesSearch =
      p.aspiration?.toLowerCase().includes(search.toLowerCase()) ||
      p.major?.toLowerCase().includes(search.toLowerCase()) ||
      p.school?.toLowerCase().includes(search.toLowerCase()) ||
      p.expertise?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = aspirationFilter
      ? p.aspiration === aspirationFilter
      : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">User Directory</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by major, school, expertise, or aspiration"
          className="p-2 w-full sm:w-1/2 rounded bg-white text-black"
        />

        <select
          value={aspirationFilter}
          onChange={(e) => setAspirationFilter(e.target.value)}
          className="p-2 w-full sm:w-1/2 rounded bg-white text-black"
        >
          <option value="">Filter by Aspiration</option>
          {aspirations.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-scroll">
        {filteredProfiles.length === 0 ? (
          <p className="text-gray-300 text-center">
            No matching profiles found.
          </p>
        ) : (
          filteredProfiles.map((profile) => (
            <div
              key={profile.userId}
              className="bg-gray-900 p-4 rounded shadow hover:bg-gray-800 transition"
            >
              <Link
                href={`/profile/${profile.userId}`}
                className="text-blue-400 font-semibold hover:underline"
              >
                {profile.occupation === "Student" &&
                profile.major &&
                profile.school
                  ? `${profile.major} @ ${profile.school}`
                  : profile.occupation}
              </Link>
              <p className="text-sm text-gray-300">
                Expertise: {profile.expertise}
              </p>
              <p className="text-sm text-gray-300">
                Aspiration: {profile.aspiration}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
