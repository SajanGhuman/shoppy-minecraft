"use client";

import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import ShopCard from "./components/ShopCard";

interface Shop {
  name: string;
  owner: string;
  coordinates: { x: number; z: number };
  sells: string[];
  buys?: string[];
  extra?: string;
}

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Shop[]>([]);

  useEffect(() => {
    fetch("/shop.json")
      .then(res => res.json())
      .then((data: Shop[]) => {
        setShops(data);
        setResults(data); // default show all
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setResults(shops);
      return;
    }

    const fuse = new Fuse(shops, {
      keys: ["name", "owner", "sells", "buys"],
      threshold: 0.3
    });

    setResults(fuse.search(query).map(r => r.item));
  }, [query, shops]);

  return (
    <div className="min-h-screen bg-stone-900 text-white p-6">
      <h1 className="text-3xl font-mono text-green-400 mb-4">
        TerraTrove Shopping District 🛒
      </h1>

      <input
        type="text"
        placeholder="Search shops or items..."
        className="w-full p-3 mb-6 rounded-lg bg-stone-800 border border-stone-600 focus:outline-none focus:ring focus:ring-green-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((shop, i) => (
          <ShopCard key={i} {...shop} />
        ))}
      </div>
    </div>
  );
}
