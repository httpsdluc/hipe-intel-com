"use client";

import { useEffect, useState } from "react";

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("intelligence");

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=10&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`
      );
      const data = await res.json();
      console.log("📡 NewsAPI result:", data);
      setArticles(data.articles || []);
    };

    fetchNews();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        🗞️ Stay Up to Date
      </h1>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search news (e.g. CIA, NSA, Cybersecurity)"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-96 p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.length === 0 ? (
          <p className="text-center text-gray-400">No articles found.</p>
        ) : (
          articles.map((article, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">{article.title}</h2>
                <p className="text-sm text-gray-400">{article.description}</p>
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
