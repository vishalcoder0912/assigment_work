export type JournalCategory = "CAD" | "Marketing" | "Manufacturing" | "3D" | "Technology";

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  category: JournalCategory;
  date: string;
  excerpt: string;
  body: string[];
  readingTime: string;
}

export const journal: JournalPost[] = [
  {
    id: "j-01",
    slug: "the-future-of-jewelry-cad",
    title: "The Future of Jewelry CAD",
    category: "CAD",
    date: "2026-02-18",
    readingTime: "6 min",
    excerpt:
      "Parametric thinking is quietly replacing the sketch-then-model habit. What changes when geometry becomes editable intent?",
    body: [
      "For most of the last two decades, jewelry CAD has been treated as a translation step: a designer draws, a modeller rebuilds. The file is the end of a conversation rather than part of it.",
      "Parametric workflows invert that. Shank width, stone size, gallery height and prong count become named values instead of frozen geometry, and a design becomes a family of designs.",
      "The practical benefit is not speed. It is revision confidence — the ability to change a stone size late in a project without quietly breaking the seat below it.",
    ],
  },
  {
    id: "j-02",
    slug: "3d-animation-for-jewelry-ecommerce",
    title: "3D Animation for Jewelry E-commerce",
    category: "Marketing",
    date: "2026-01-30",
    readingTime: "5 min",
    excerpt: "A 360° spin is not a gimmick. It is the closest a screen gets to picking a piece up.",
    body: [
      "Jewelry is judged by movement. Light travels across a polished shank and returns from a pavé line; a static photograph shows one instant of that.",
      "The discipline is restraint: slow rotation, consistent lighting, no cuts. The moment an animation becomes a showreel, it stops being product information.",
      "Delivery matters as much as the render. A loop that costs three megabytes and starts instantly beats a beautiful sequence nobody waits for.",
    ],
  },
  {
    id: "j-03",
    slug: "designing-production-ready-jewelry-models",
    title: "Designing Production-Ready Jewelry Models",
    category: "Manufacturing",
    date: "2026-01-12",
    readingTime: "7 min",
    excerpt:
      "The difference between a beautiful render and a castable piece is usually measured in tenths of a millimetre.",
    body: [
      "A model can look flawless in a viewport and fail on the bench. Wall thickness, prong mass and sprue placement are design decisions, not afterthoughts.",
      "We treat manufacturability as a review pass: every model is checked against casting minimums and stone-setting clearance before it is called finished.",
      "This is where CAD expertise and jewelry expertise have to sit in the same room.",
    ],
  },
  {
    id: "j-04",
    slug: "photorealistic-jewelry-visualization",
    title: "Photorealistic Jewelry Visualization",
    category: "3D",
    date: "2025-12-04",
    readingTime: "6 min",
    excerpt:
      "Realism in jewelry rendering is a lighting problem long before it is a material problem.",
    body: [
      "Metals are mirrors. A gold surface shows almost nothing of itself — it shows the room. Build the room first.",
      "Stones need the opposite attention: controlled refraction, believable dispersion, and enough dark in the environment for the bright returns to mean something.",
      "Most renders that read as fake are simply over-lit.",
    ],
  },
  {
    id: "j-05",
    slug: "3d-printing-and-jewelry-manufacturing",
    title: "3D Printing and Jewelry Manufacturing",
    category: "Technology",
    date: "2025-11-16",
    readingTime: "5 min",
    excerpt:
      "Resin printing changed the tolerance conversation between digital design and the casting floor.",
    body: [
      "High-resolution resin printing made fine detail reproducible, but it also made design errors reproducible at scale.",
      "Orientation, support placement and shrinkage all feed back into how a model should be built in the first place.",
      "The studios that get consistent results are the ones treating the printer as part of the design system rather than an output device.",
    ],
  },
];
