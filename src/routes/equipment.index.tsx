import { createFileRoute, redirect } from "@tanstack/react-router";
import { devices } from "@/data/equipment";

export const Route = createFileRoute("/equipment/")({
  beforeLoad: () => {
    throw redirect({ to: "/equipment/$slug", params: { slug: devices[0]?.slug ?? "" } });
  },
});
