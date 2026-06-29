"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ExperienceCard } from "@/components/experience-card";
import type { Category, Experience } from "@/lib/data";

export function ExperienceFilters({
  experiences,
  categories,
}: {
  experiences: Experience[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");

  const filtered = useMemo(() => {
    return experiences.filter((experience) => {
      const matchesQuery = `${experience.name} ${experience.location} ${experience.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "Todas" || experience.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, experiences, query]);

  return (
    <div>
      <div className="grid gap-4 rounded-lg border border-[#e4e7ec] bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre, ubicación o categoría"
            className="h-12 w-full rounded-md border border-[#d0d5dd] pl-11 pr-4 text-sm outline-none focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-12 rounded-md border border-[#d0d5dd] bg-white px-4 text-sm outline-none focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
        >
          <option>Todas</option>
          {categories.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}
