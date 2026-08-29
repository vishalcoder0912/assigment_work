import heroRing from "@/assets/hero-ring.jpg";
import cadWireframe from "@/assets/cad-wireframe.jpg";
import finalRender from "@/assets/final-render.jpg";
import craftFacets from "@/assets/craft-facets.jpg";
import craftMetal from "@/assets/craft-metal.jpg";
import workEternity from "@/assets/work-eternity.jpg";

export const projectCategories = [
  "3D Animation",
  "Product Visualization",
  "CAD Design",
  "AR / VR",
  "Diamond",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface VisualAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: VisualAsset;
  service: string;
  format: string;
  year: string;
  featured?: boolean;
  scale?: "sm" | "md" | "lg" | "full";
}

export const projects: Project[] = [
  {
    id: "p-01",
    slug: "ring-360-spin",
    title: "Ring 360° Spin",
    category: "3D Animation",
    description:
      "A continuous turntable animation built for e-commerce product pages, lit as a single studio pass so the metal reads consistently through every frame.",
    image: {
      src: heroRing,
      alt: "Solitaire ring on a dark stone pedestal",
      width: 1600,
      height: 1200,
    },
    service: "3D Animation",
    format: "1080×1080 loop · MP4 / WebM",
    year: "2025",
    featured: true,
    scale: "lg",
  },
  {
    id: "p-02",
    slug: "eternal-ring-cad",
    title: "Eternal Ring CAD",
    category: "CAD Design",
    description:
      "Production-ready CAD geometry with clean topology, prong tolerances and stone seats prepared for casting.",
    image: {
      src: cadWireframe,
      alt: "CAD wireframe of a solitaire ring",
      width: 1408,
      height: 1056,
    },
    service: "Jewelry CAD",
    format: "STL / 3DM · print ready",
    year: "2025",
    scale: "md",
  },
  {
    id: "p-03",
    slug: "white-gold-ring-showcase",
    title: "White Gold Ring Showcase",
    category: "Product Visualization",
    description:
      "A photorealistic still set exploring how a brushed white gold band responds to soft key light and controlled rim light.",
    image: {
      src: finalRender,
      alt: "Photorealistic render of an engraved gold solitaire ring",
      width: 1408,
      height: 1056,
    },
    service: "Product Visualization",
    format: "4000px stills · PNG",
    year: "2025",
    featured: true,
    scale: "md",
  },
  {
    id: "p-04",
    slug: "diamond-eternity-ring",
    title: "Diamond Eternity Ring",
    category: "Diamond",
    description:
      "Pavé geometry study: stone spacing, gallery depth and light return examined across the full band.",
    image: {
      src: workEternity,
      alt: "Eternity band and pendant on dark stone",
      width: 1400,
      height: 1000,
    },
    service: "CAD + Visualization",
    format: "Stills · 3DM",
    year: "2025",
    scale: "full",
  },
  {
    id: "p-05",
    slug: "classic-solitaire-ring",
    title: "Classic Solitaire Ring",
    category: "Product Visualization",
    description:
      "A restrained single-stone study — one light, one shadow, one reflection line across the shank.",
    image: { src: craftFacets, alt: "Macro study of diamond facets", width: 1200, height: 1500 },
    service: "Product Visualization",
    format: "Vertical stills",
    year: "2024",
    scale: "sm",
  },
  {
    id: "p-06",
    slug: "engagement-ring-cad",
    title: "Engagement Ring CAD",
    category: "CAD Design",
    description:
      "Bespoke engagement ring modelled from a hand sketch, delivered with a wax-print-ready file set.",
    image: {
      src: craftMetal,
      alt: "Macro study of brushed gold surface",
      width: 1200,
      height: 900,
    },
    service: "Jewelry CAD",
    format: "3DM / STL",
    year: "2024",
    scale: "sm",
  },
  {
    id: "p-07",
    slug: "ar-try-on",
    title: "AR Try-On",
    category: "AR / VR",
    description:
      "A browser-based try-on prototype: optimised jewelry meshes streamed to mobile with device-aware quality tiers.",
    image: {
      src: heroRing,
      alt: "Ring rendered for augmented reality try-on",
      width: 1600,
      height: 1200,
    },
    service: "AR / VR",
    format: "GLB / USDZ",
    year: "2025",
    scale: "md",
  },
  {
    id: "p-08",
    slug: "necklace-360-spin",
    title: "Necklace 360° Spin",
    category: "3D Animation",
    description:
      "Chain simulation and turntable animation for a pendant collection, rendered with matched studio lighting.",
    image: {
      src: workEternity,
      alt: "Pendant necklace photographed on dark fabric",
      width: 1400,
      height: 1000,
    },
    service: "3D Animation",
    format: "Loop · MP4",
    year: "2024",
    scale: "md",
  },
  {
    id: "p-09",
    slug: "three-stone-ring-cad",
    title: "Three-Stone Ring CAD",
    category: "CAD Design",
    description:
      "Symmetry, stone height and gallery clearance resolved across a three-stone setting.",
    image: {
      src: cadWireframe,
      alt: "Wireframe topology of a jewelry model",
      width: 1408,
      height: 1056,
    },
    service: "Jewelry CAD",
    format: "3DM",
    year: "2024",
    scale: "sm",
  },
  {
    id: "p-10",
    slug: "cgi-and-vfx",
    title: "CGI & VFX",
    category: "3D Animation",
    description:
      "Cinematic jewelry sequences combining CGI product passes with practical-feeling light and atmosphere.",
    image: { src: finalRender, alt: "Cinematic render of a gold ring", width: 1408, height: 1056 },
    service: "CGI / VFX",
    format: "Sequence · ProRes",
    year: "2025",
    scale: "lg",
  },
];
