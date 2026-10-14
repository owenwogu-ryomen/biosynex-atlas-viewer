import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { categories, resources, resourceTypes } from "@/data/equipment";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Study Resources — Biosynex Atlas" },
      { name: "description", content: "Search open-access videos, books, articles and journals by equipment category." },
      { property: "og:title", content: "Study Resources — Biosynex Atlas" },
      { property: "og:description", content: "Search open-access videos, books, articles and journals by equipment category." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Resources,
});

function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [type, setType] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (category !== "All" && !r.categories.includes(category as (typeof categories)[number])) return false;
      if (type !== "All" && r.type !== type) return false;
      if (!q) return true;
      return [r.title, r.source, r.topics, r.note, r.type, ...r.categories].join(" ").toLowerCase().includes(q);
    });
  }, [query, category, type]);

  const types = resourceTypes.filter((t) => filtered.some((r) => r.type === t));
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`;

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="font-display text-5xl">Resources & Materials</h1>
        <p className="text-muted-foreground mt-3">Open-access videos, books, articles and journals, organised by equipment category.</p>

        <div className="mt-10 rounded-xl border border-border bg-card p-5 space-y-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, device (e.g. MRI, ECG, ventilator) or source…"
            className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary"
            aria-label="Search resources"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Equipment category</p>
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} className={chip(category === c)}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Media type</p>
            <div className="flex flex-wrap gap-2">
              {["All", ...resourceTypes.filter((t) => resources.some((r) => r.type === t))].map((t) => (
                <button key={t} type="button" onClick={() => setType(t)} className={chip(type === t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} result{filtered.length === 1 ? "" : "s"}</p>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-xl border border-border bg-card p-6 text-muted-foreground">No materials match your search. Try another word or category.</p>
        )}

        {types.map((t) => (
          <section key={t} className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">{t}s</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {filtered.filter((r) => r.type === t).map((r) => (
                <li key={r.url + r.title}>
                  <a href={r.url} target="_blank" rel="noreferrer" className="flex justify-between gap-4 py-4 hover:text-primary">
                    <span>
                      <span className="font-medium">{r.title}</span>
                      {r.source && <span className="block text-sm text-muted-foreground">{r.source}</span>}
                      {r.note && <span className="block text-sm text-muted-foreground mt-1">{r.note}</span>}
                      {r.topics && <span className="block text-xs text-muted-foreground mt-1">Covers: {r.topics}</span>}
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        {r.categories.map((c) => (
                          <span key={c} className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{c}</span>
                        ))}
                      </span>
                    </span>
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}
