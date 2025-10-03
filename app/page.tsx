"use client";

import { useState } from "react";
import shops from "../public/shops.json";
import Fuse from "fuse.js";
import Link from "next/link";

const FILTER_CATEGORIES = [
  "All",
  "Blocks",
  "Minerals & Ores",
  "Tools",
  "Armor",
  "Enchanted Items",
  "Food",
  "Potion & Brewing",
  "Redstone Components",
  "Building Material",
  "Decorative Items",
  "Transportation",
  "Farming Supplies",
  "Animals & Mobs",
  "Nether Items",
  "End Items",
  "Music & Records",
  "Maps & Compasses",
  "Contract Work",
  "Misc",
];

const SORT_OPTIONS = [
  { label: "Shop Name A → Z", value: "name-asc" },
  { label: "Shop Name Z → A", value: "name-desc" },
];

interface ShopItem {
  name: string;
  price: number;
  quantity?: number;
  image?: string;
}

interface Shop {
  id: number;
  name: string;
  owner: string;
  type?: string[];
  sells: ShopItem[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("name-asc");

  // Fuse.js setup
  const fuse = new Fuse(shops, {
    keys: ["name", "owner", "sells.name", "buys.name"],
    threshold: 0.3,
  });

  // Search results
  let results: Shop[] = query ? fuse.search(query).map((r) => r.item) : shops;

  // Apply category filter
  if (typeFilter !== "All") {
    results = results.filter((shop) => shop.type?.includes(typeFilter));
  }

  // Sort results
  results = results.sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-main bg-cover bg-center bg-fixed text-black">
      <h1 className="text-5xl font-bold mb-8 text-accent drop-shadow-lg text-center text-black">
        🛒 TerraTrove Shops
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search items or shops..."
        className="w-full max-w-lg p-4 rounded-2xl bg-card/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg mb-4 text-lg text-center"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["All", ...FILTER_CATEGORIES.filter((c) => c !== "All")].map(
          (category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
          bg-card/90 backdrop-blur-md border border-white/30 shadow-md
          transition-transform hover:scale-105
          ${
            typeFilter === category
              ? "bg-accent text-white border-accent"
              : "text-black"
          }
        `}
              onClick={() => setTypeFilter(category)}
            >
              {category}
            </button>
          ),
        )}
      </div>

      {/* Sorting */}
      <div className="flex justify-center mb-8 gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded-2xl bg-card/90 backdrop-blur-md text-black border border-white/30 shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Shop Cards */}
      <div className="max-w-7xl w-full grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {results.map((shop) => (
          <Link key={shop.id} href={`/shop/${shop.id}`} className="w-72">
            <div className="card w-full rounded-2xl overflow-hidden shadow-lg bg-white/20 backdrop-blur-md border border-white/30 cursor-pointer hover:scale-105 transition-transform">
              <div
                className="h-40 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('/shops/${
                    shop.owner && shop.owner.trim() !== ""
                      ? shop.owner.replace(/\s+/g, "_")
                      : "shop"
                  }.png')`,
                }}
              />
              <div className="card-body p-4">
                <h3 className="card-title text-lg text-black">{shop.name}</h3>
                <p className="text-xs text-gray-800 mb-2">
                  👤 Owner: {shop.owner}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
