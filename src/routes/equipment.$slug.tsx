import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { ViewerFrame } from "@/components/ViewerFrame";
import { categories, devices, getDevice } from "@/data/equipment";

export const Route = createFileRoute("/equipment/$slug")({
  loader: ({ params }) => {
    const device = getDevice(params.slug);
    if (!device) throw notFound();
    return { device };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.device.name} — Biosynex Atlas` : "Equipment — Biosynex Atlas";
    const d = loaderData?.device.summary ?? "Explore medical equipment in 3D.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: DevicePage,
});

function DevicePage() {
  const { device } = Route.useLoaderData();
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-6 py-8 grid gap-6 lg:grid-cols-[220px_1fr_340px]">
        <aside className="space-y-6">
          {categories.map((c) => (
            <div key={c}>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">{c}</p>
              <ul className="space-y-1">
                {devices.filter((d) => d.category === c).map((d) => (
                  <li key={d.slug}>
                    <Link to="/equipment/$slug" params={{ slug: d.slug }} className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                      activeProps={{ className: "bg-secondary text-primary" }}>{d.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <section className="min-w-0">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">{device.category}</p>
          <h1 className="font-display text-4xl mt-2">{device.name}</h1>
          <ViewerFrame
            title={device.name}
            embedUrl={device.embedUrl}
            embedHtml={device.embedHtml}
            emptyTitle="3D viewer"
            emptyBody="The 3D model for this device will appear here once its embed is added."
          />
          <div className="mt-8 space-y-6">
            {device.descriptions.map((s) => (
              <article key={s.heading} className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-xl">{s.heading}</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed whitespace-pre-line">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-3">
          {[["Working Principles", device.workingPrinciples], ["Clinical Uses", device.clinicalUses]].map(([title, items], i) => (
            <details key={title as string} open={i === 0} className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none flex justify-between items-center p-4 font-display">
                {title as string}<span className="text-primary">+</span>
              </summary>
              <ul className="px-4 pb-4 space-y-2 text-sm text-muted-foreground">
                {(items as string[]).map((t) => <li key={t} className="flex gap-2"><span className="text-primary">—</span>{t}</li>)}
              </ul>
            </details>
          ))}
        </aside>
      </div>
    </SiteShell>
  );
}
