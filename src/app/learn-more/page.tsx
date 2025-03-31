"use client";

import Link from "next/link";

const agencies = [
  {
    name: "Air Force Intelligence",
    url: "https://www.af.mil",
    description:
      "Supports the U.S. Air Force through ISR operations in air, space, and cyberspace.",
  },
  {
    name: "Army Intelligence",
    url: "https://www.army.mil",
    description:
      "Provides tactical and strategic intelligence for Army operations worldwide.",
  },
  {
    name: "Central Intelligence Agency (CIA)",
    url: "https://www.cia.gov",
    description:
      "Responsible for foreign intelligence gathering, analysis, and covert operations.",
  },
  {
    name: "Coast Guard Intelligence",
    url: "https://www.uscg.mil",
    description: "Supports maritime law enforcement and homeland security.",
  },
  {
    name: "Defense Intelligence Agency (DIA)",
    url: "https://www.dia.mil",
    description:
      "Delivers military intelligence to the Department of Defense and policymakers.",
  },
  {
    name: "Department of Energy Intelligence",
    url: "https://www.energy.gov",
    description:
      "Focuses on nuclear weapons intelligence, energy security, and non-proliferation.",
  },
  {
    name: "Department of Homeland Security (DHS)",
    url: "https://www.dhs.gov",
    description:
      "Analyzes threats and shares intelligence with law enforcement and emergency services.",
  },
  {
    name: "Department of State INR",
    url: "https://www.state.gov",
    description:
      "Supports diplomacy through political, economic, and global trend analysis.",
  },
  {
    name: "Department of the Treasury Intelligence",
    url: "https://home.treasury.gov",
    description:
      "Focuses on threats to the financial system and sanctions enforcement.",
  },
  {
    name: "Drug Enforcement Administration (DEA)",
    url: "https://www.dea.gov",
    description:
      "Gathers intelligence to combat international drug trafficking and operations.",
  },
  {
    name: "Federal Bureau of Investigation (FBI)",
    url: "https://www.fbi.gov",
    description:
      "Focuses on domestic intelligence, counterterrorism, and cyber crime.",
  },
  {
    name: "Marine Corps Intelligence",
    url: "https://www.marines.mil",
    description:
      "Provides battlefield intelligence to support Marine Corps operations.",
  },
  {
    name: "National Geospatial-Intelligence Agency (NGA)",
    url: "https://www.nga.mil",
    description:
      "Delivers geospatial intelligence and mapping for national security.",
  },
  {
    name: "National Reconnaissance Office (NRO)",
    url: "https://www.nro.gov",
    description:
      "Designs and operates reconnaissance satellites for national defense.",
  },
  {
    name: "National Security Agency (NSA)",
    url: "https://www.nsa.gov",
    description: "Leads in signals intelligence and cybersecurity protection.",
  },
  {
    name: "Navy Intelligence",
    url: "https://www.navy.mil",
    description:
      "Provides naval intelligence and ocean surveillance for maritime operations.",
  },
  {
    name: "Space Force Intelligence",
    url: "https://www.spaceforce.mil",
    description: "Supports space domain awareness and space-based ISR.",
  },
];

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Explore the U.S. Intelligence Community
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Learn about all 18 components that make up the Intelligence Community
          — their missions, roles, and how they serve national security.
        </p>
      </section>

      {/* Agency Card Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map((agency) => (
            <div
              key={agency.name}
              className="flex flex-col justify-between bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200"
            >
              <div>
                <h2 className="text-lg font-bold text-blue-400">
                  {agency.name}
                </h2>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  {agency.description}
                </p>
              </div>
              <Link
                href={agency.url}
                target="_blank"
                className="mt-4 inline-block text-blue-500 hover:underline text-sm font-medium"
              >
                Visit Website →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
