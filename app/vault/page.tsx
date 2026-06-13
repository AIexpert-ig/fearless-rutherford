"use client";

import { useState } from "react";
import ExperienceCard from "../components/ExperienceCard";


// Placeholder images – picsum.photos URLs with unique random seeds
const placeholderImages = {
  "Red Sea Private Yachts": "https://picsum.photos/800/600?random=1",
  "Dubai Ultra-Luxury Escapes": "https://picsum.photos/800/600?random=2",
  "Egyptian Desert Odyssey": "https://picsum.photos/800/600?random=3",
  "Private Jet Journeys": "https://picsum.photos/800/600?random=4",
  "Hurghada VIP Diving": "https://picsum.photos/800/600?random=5",
  "Bespoke Multi-Destination": "https://picsum.photos/800/600?random=6",
};

const experiences = Object.entries(placeholderImages).map(([title, img]) => ({
  title,
  imageUrl: img,
  price: "$25,000+",
}));

export default function VaultPage() {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");
  const correctPassword = "AXC2026"; // simple MVP gate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      setAuthorized(true);
    } else {
      alert("Incorrect password. Please request access via the application.");
    }
  };

  if (!authorized) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-obsidian text-alabaster">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-heading text-center">Enter Access Code</h2>
          <input
            type="password"
            placeholder="Password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-4 py-2 rounded bg-alabaster text-obsidian focus:outline-none focus:ring-2 focus:ring-champagne"
          />
          <button
            type="submit"
            className="border-2 border-champagne text-champagne font-body px-6 py-2 rounded hover:bg-champagne hover:text-obsidian transition-colors"
          >
            Unlock Vault
          </button>
        </form>
      </section>
    );
  }

  return (
    <div className="bg-obsidian text-alabaster min-h-screen">
      {/* Hero Banner */}
      <section className="relative flex flex-col items-center justify-center py-32 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1600/900?random=7')" }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="relative z-10 text-5xl md:text-7xl font-heading text-alabaster mb-4">The Private Vault</h1>
        <p className="relative z-10 text-lg md:text-xl font-body text-alabaster opacity-90">
          Experiences reserved for those who move in silence.
        </p>
      </section>

      {/* Experience Grid */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.title}
              title={exp.title}
              imageUrl={exp.imageUrl}
              price={exp.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
