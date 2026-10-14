import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { devices, resources } from "@/data/equipment";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biosynex Atlas — Learn Medical Equipment in 3D" },
      { name: "description", content: "Learn about medical equipment, explore them in 3D and access materials for further study." },
      { property: "og:title", content: "Biosynex Atlas — Learn Medical Equipment in 3D" },
      { property: "og:description", content: "Learn about medical equipment, explore them in 3D and access study materials." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <section className="signal-grid border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Biomedical Equipment Library</p>
          <h1 className="font-display text-5xl md:text-7xl mt-6 max-w-4xl leading-[1.05]">
            Welcome to <span className="text-primary">Biosynex Atlas</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Where you can learn about a medical equipment, have a 3D viewing experience and access materials for further studies.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/equipment" className="rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90">Study Medical Equipment</Link>
            <Link to="/resources" className="rounded-md border border-border px-6 py-3 hover:border-primary">Browse Resources</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl">Study Medical Equipment</h2>
        <p className="text-muted-foreground mt-2">Pick a device to open its 3D viewer and study notes.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {devices.map((d) => (
            <Link key={d.slug} to="/equipment/$slug" params={{ slug: d.slug }} className="group rounded-xl border border-border bg-card p-6 hover:border-primary">
              <p className="font-mono text-xs text-primary uppercase tracking-widest">{d.category}</p>
              <h3 className="font-display text-xl mt-3 group-hover:text-primary">{d.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{d.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="font-display text-3xl">Books, Resources & Materials</h2>
        <p className="text-muted-foreground mt-2">Videos, books, PDFs, articles and journals for deeper study.</p>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {resources.slice(0, 4).map((r) => (
            <li key={r.url + r.title}>
              <a href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 py-4 hover:text-primary">
                <span className="font-mono text-xs w-20 text-primary">{r.type}</span>
                <span className="flex-1">{r.title}</span>
                <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <Link to="/resources" className="inline-block mt-6 text-primary font-mono text-sm hover:underline">View all resources →</Link>
      </section>
    </SiteShell>
  );
}
