import { createFileRoute, notFound } from "@tanstack/react-router";
import { Container, LuxLink, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { getJournalPost } from "@/lib/api/journal";
import type { JournalPost as JournalPostType } from "@/types/domain";

export const Route = createFileRoute("/journal/$slug")({
  loader: async ({ params }: { params: { slug: string } }) => {
    const post = await getJournalPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }: { loaderData?: { post: JournalPostType } | undefined }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable — Bambral 3D Studio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Bambral Studio Notes` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: JournalPost,
  notFoundComponent: () => (
    <div className="flex min-h-[70svh] items-center justify-center px-6 text-center">
      <div>
        <h1 className="display text-3xl text-ivory">That note isn't published.</h1>
        <div className="mt-8 flex justify-center">
          <LuxLink to="/journal" variant="outline">
            All notes
          </LuxLink>
        </div>
      </div>
    </div>
  ),
});

function JournalPost() {
  const { post } = Route.useLoaderData() as { post: JournalPostType };

  return (
    <>
      <article className="pt-40 pb-24 md:pt-52">
        <Container>
          <SectionLabel>{post.category}</SectionLabel>
          <h1 className="display mt-10 max-w-4xl text-[clamp(2.4rem,6.4vw,5.4rem)] text-ivory">
            <SplitLines lines={[post.title]} />
          </h1>
          <div className="label-tech mt-8 flex gap-6">
            <span>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>{post.readingTime} read</span>
          </div>

          <div className="mt-16 max-w-2xl space-y-8 border-t border-hairline pt-12">
            {post.body.map((paragraph: string) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </article>
      <CTA />
    </>
  );
}
