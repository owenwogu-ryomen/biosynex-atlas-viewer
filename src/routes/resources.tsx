import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { resources } from "@/data/equipment";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Study Resources — Biosynex Atlas" },
      { name: "description", content: "Videos, books, PDFs, articles and journals on biomedical equipment." },
      { property: "og:title", content: "Study Resources — Biosynex Atlas" },
      { property: "og:description", content: "Videos, books, PDFs, articles and journals on biomedical equipment." },
    ],
  }),
  component: Resources,
});

function Resources() {
  const types = Array.from(new Set(resources.map((r) => r.type)));
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="font-display text-5xl">Resources & Materials</h1>
        <p className="text-muted-foreground mt-3">Curated videos, books, PDFs, articles and journals.</p>
        {types.map((t) => (
          <section key={t} className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">{t}s</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {resources.filter((r) => r.type === t).map((r) => (
                <li key={r.url + r.title}>
                  <a href={r.url} target="_blank" rel="noreferrer" className="flex justify-between gap-4 py-4 hover:text-primary">
                    <span>{r.title}{r.note && <span className="block text-sm text-muted-foreground">{r.note}</span>}</span>
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
