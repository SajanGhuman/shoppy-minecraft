"use client";

import { useState } from "react";
import shops from "../public/shops.json";
import Fuse from "fuse.js";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(shops, {
    keys: ["name", "owner", "sells", "buys"],
    threshold: 0.3,
  });

  const results = query ? fuse.search(query).map((r) => r.item) : shops;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start p-8 
                 bg-main bg-cover bg-center bg-fixed text-black"
    >
      {/* Page Title */}
      <h1 className="text-5xl font-bold mb-8 text-accent drop-shadow-lg text-center text-black">
        🛒 TerraTrove Shops
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search items or shops..."
        className="w-full max-w-lg p-4 rounded-2xl bg-card/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg mb-12 text-lg text-center"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Shop Cards Grid */}
      <div className="max-w-7xl w-full grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {results.map((shop) => (
          <Link key={shop.id} href={`/shop/${shop.id}`} className="w-72">
            <div
              className="card w-full rounded-2xl overflow-hidden shadow-lg 
                   bg-white/20 backdrop-blur-md border border-white/30 
                   cursor-pointer hover:scale-105 transition-transform"
            >
              {/* Background Image */}
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

              {/* Card Body */}
              <div className="card-body p-4">
                <h2 className="card-title text-lg text-black">{shop.name}</h2>
                <p className="text-xs text-gray-800 mb-2">
                  👤 Owner: {shop.owner}
                </p>

                {/* Coordinates & Tags */}
                {/* <p className="mt-2 text-xs text-black drop-shadow-md"> */}
                {/*   📍 {shop.coords.join(", ")} */}
                {/* </p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
