import { Container, LuxLink, SectionLabel } from "@/components/ui/lux";
import { useJournal } from "@/hooks/useJournal";
import { JournalGrid } from "./JournalGrid";
import { JournalSkeleton } from "./JournalSkeleton";

export function JournalPreview() {
  const { data: posts = [], isLoading } = useJournal({ limit: 4 });
  const previewPosts = posts.slice(0, 4);

  return (
    <section className="hairline-t py-28 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel>Studio notes</SectionLabel>
            <h2 className="display mt-8 text-[clamp(2.2rem,5.4vw,4.4rem)] text-ivory">
              Notes from the bench.
            </h2>
          </div>
          <LuxLink to="/journal" variant="ghost">
            All notes
          </LuxLink>
        </div>

        <div className="mt-14">
          {isLoading && previewPosts.length === 0 ? (
            <JournalSkeleton count={4} />
          ) : (
            <JournalGrid posts={previewPosts} />
          )}
        </div>
      </Container>
    </section>
  );
}
