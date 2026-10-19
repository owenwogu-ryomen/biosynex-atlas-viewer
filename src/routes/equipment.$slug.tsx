import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { ViewerFrame } from "@/components/ViewerFrame";
import { categories, categoryInfo, devices, getDevice, resources } from "@/data/equipment";
import ventilatorDiagram from "@/assets/ventilator-working-principle.svg.asset.json";

export const Route = createFileRoute("/equipment/$slug")({
  loader: ({ params }) => {
    const device = getDevice(params.slug);
    if (!device) throw notFound();
    return { device };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.device.name} — Biosynex Atlas` : "Equipment — Biosynex Atlas";
    const d = loaderData?.device.summary ?? "Explore medical equipment in 3D.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: DevicePage,
});

function DevicePage() {
  const { device } = Route.useLoaderData();
  const info = categoryInfo[device.category];
  const related = resources.filter((r) => r.categories.includes(device.category));
  const panels: [string, string[]][] = [
    ["Working Principles", device.workingPrinciples],
    ["Clinical Uses", device.clinicalUses],
  ];

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-6 py-8 grid gap-6 lg:grid-cols-[240px_1fr_340px]">
        <aside className="space-y-6">
          {categories.map((c) => {
            const list = devices.filter((d) => d.category === c);
            return (
              <div key={c}>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">{c}</p>
                {list.length === 0 ? (
                  <p className="px-3 text-xs text-muted-foreground">Coming soon</p>
                ) : (
                  <ul className="space-y-1">
                    {list.map((d) => (
                      <li key={d.slug}>
                        <Link to="/equipment/$slug" params={{ slug: d.slug }} className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                          activeProps={{ className: "bg-secondary text-primary" }}>{d.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        <section className="min-w-0">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">{device.category}</p>
          <h1 className="font-display text-4xl mt-2">{device.name}</h1>
          <p className="mt-2 text-muted-foreground">{device.summary}</p>
          <ViewerFrame
            title={device.name}
            embedUrl={device.embedUrl}
            embedHtml={device.embedHtml}
            emptyTitle="3D viewer"
            emptyBody="The 3D model for this device will appear here once its embed is added."
          />
          {device.slug === "mechanical-ventilator" && (
            <figure className="mt-6 rounded-xl border border-border bg-card p-4">
              <img src={ventilatorDiagram.url} alt="Medical ventilator working principle and gas flow diagram" className="w-full rounded-lg" />
              <figcaption className="mt-3 text-sm text-muted-foreground">Working principle and gas flow pathway of the medical ventilator.</figcaption>
            </figure>
          )}
          <div className="mt-8 space-y-6">
            {device.descriptions.map((s) => (
              <article key={s.heading} className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-xl">{s.heading}</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed whitespace-pre-line">{s.body}</p>
              </article>
            ))}
            {device.components && device.components.length > 0 && (
              <article className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-xl">Key Components</h2>
                <dl className="mt-4 divide-y divide-border">
                  {device.components.map((c) => (
                    <div key={c.name} className="py-3 grid gap-1 sm:grid-cols-[220px_1fr]">
                      <dt className="font-medium">{c.name}</dt>
                      <dd className="text-sm text-muted-foreground">{c.detail}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            )}
            {device.references && device.references.length > 0 && (
              <article className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-xl">References & Further Reading</h2>
                <ul className="mt-3 divide-y divide-border">
                  {device.references.map((r) => (
                    <li key={r.url}>
                      <a href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 py-3 hover:text-primary">
                        <span className="flex-1 text-sm">{r.title}{r.source ? <span className="text-muted-foreground"> — {r.source}</span> : null}</span>
                        <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            )}
            {related.length > 0 && (
              <article className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-xl">Further Study</h2>
                <ul className="mt-3 divide-y divide-border">
                  {related.map((r) => (
                    <li key={r.url + r.title}>
                      <a href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 py-3 hover:text-primary">
                        <span className="font-mono text-xs w-16 text-primary">{r.type}</span>
                        <span className="flex-1 text-sm">{r.title}</span>
                        <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </section>

        <aside className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4 text-sm space-y-2">
            <p className="font-display">Category profile</p>
            <p className="text-muted-foreground">{info.purpose}</p>
            <p><span className="text-muted-foreground">Risk level:</span> {device.risk ?? info.risk}</p>
            <p><span className="text-muted-foreground">Related devices:</span> {info.examples}</p>
          </div>
          {panels.map(([title, items], i) => (
            <details key={title} open={i === 0} className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none flex justify-between items-center p-4 font-display">
                {title}<span className="text-primary">+</span>
              </summary>
              <ul className="px-4 pb-4 space-y-2 text-sm text-muted-foreground">
                {items.map((t) => <li key={t} className="flex gap-2"><span className="text-primary">—</span>{t}</li>)}
              </ul>
            </details>
          ))}
        </aside>
      </div>
    </SiteShell>
  );
}
