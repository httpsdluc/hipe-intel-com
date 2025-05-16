// src/app/stay-up-to-date/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("intelligence agency");
  const [inputValue, setInputValue] = useState("");

  const presetTopics = [
    "CIA",
    "NSA",
    "FBI",
    "Cybersecurity",
    "Espionage",
    "Homeland Security",
    "National Intelligence",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          query
        )}&lang=en&max=10&sortby=publishedAt&token=${
          process.env.NEXT_PUBLIC_GNEWS_API_KEY
        }`;

        const res = await fetch(url);
        const data = await res.json();
        console.log("🛰️ GNews result:", data);
        setArticles(data.articles || []);
      } catch (err) {
        console.error("❌ Failed to fetch GNews articles:", err);
        setArticles([]);
      }
    };

    fetchNews();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        🗞️ Stay Up to Date
      </h1>

      {/* 🔍 Search Input */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search news (e.g. CIA, NSA, Cybersecurity)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setQuery(inputValue);
          }}
          className="w-full sm:w-96 p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button
          onClick={() => setQuery(inputValue)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Search
        </button>
      </div>

      {/* 🎯 Topic Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {presetTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => setQuery(topic)}
            className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-blue-500"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* 📰 Articles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.length === 0 ? (
          <p className="text-center text-gray-400">No articles found.</p>
        ) : (
          articles.map((article, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">{article.title}</h2>
                <p className="text-sm text-gray-400">
                  {article.description || "No description available."}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
