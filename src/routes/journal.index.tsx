import { createFileRoute } from "@tanstack/react-router";
import { Container, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { CTA } from "@/components/sections/CTA";
import { JournalSkeleton } from "@/components/journal/JournalSkeleton";
import { getJournal } from "@/lib/api/journal";
import type { JournalPost } from "@/types/domain";

export const Route = createFileRoute("/journal/")({
  loader: async () => {
    const posts = await getJournal();
    return { posts };
  },
  head: () => ({
    meta: [
      { title: "Studio Notes — Bambral 3D Studio" },
      {
        name: "description",
        content:
          "Writing on jewelry CAD, 3D animation for e-commerce, production-ready models and photorealistic visualization.",
      },
      { property: "og:title", content: "Studio Notes — Bambral 3D Studio" },
      {
        property: "og:description",
        content: "Notes on jewelry CAD, visualization and manufacturing.",
      },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const { posts } = Route.useLoaderData();

  return (
    <>
      <section className="pt-40 pb-20 md:pt-52">
        <Container>
          <SectionLabel>Journal</SectionLabel>
          <h1 className="display mt-10 text-[clamp(2.8rem,8vw,7rem)] text-ivory">
            <SplitLines lines={["Studio notes."]} />
          </h1>
          <div className="mt-16">
            {posts.length > 0 ? <JournalGrid posts={posts} /> : <JournalSkeleton count={6} />}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
