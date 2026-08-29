import { Link } from "@tanstack/react-router";
import type { JournalPost } from "@/data/journal";
import { Reveal } from "@/components/motion/Reveal";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function JournalGrid({ posts }: { posts: JournalPost[] }) {
  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
      {posts.map((post, index) => (
        <Reveal key={post.id} delay={index * 0.06}>
          <Link
            to="/journal/$slug"
            params={{ slug: post.slug }}
            data-cursor="open"
            className="group flex h-full flex-col border-t border-hairline pt-6"
          >
            <div className="flex items-center justify-between">
              <span className="label-tech text-champagne">{post.category}</span>
              <span className="label-tech">{formatDate(post.date)}</span>
            </div>
            <h3 className="display mt-6 text-[clamp(1.6rem,3vw,2.5rem)] text-ivory">
              {post.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <span className="label-tech link-underline mt-8 w-fit group-hover:text-ivory">
              Read article — {post.readingTime}
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
