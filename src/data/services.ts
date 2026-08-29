import cadWireframe from "@/assets/cad-wireframe.jpg";
import finalRender from "@/assets/final-render.jpg";
import heroRing from "@/assets/hero-ring.jpg";
import craftMetal from "@/assets/craft-metal.jpg";
import workEternity from "@/assets/work-eternity.jpg";

export interface Service {
  id: string;
  slug: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
  image: { src: string; alt: string };
}

export const services: Service[] = [
  {
    id: "s-01",
    slug: "jewelry-cad",
    index: "01",
    title: "Jewelry CAD",
    summary: "Precision-ready digital jewelry models.",
    detail:
      "Parametric jewelry modelling with production tolerances — stone seats, prong geometry, gallery clearance and wall thickness resolved before anything reaches the caster.",
    deliverables: ["3DM / STL files", "Print-ready geometry", "Stone charts", "Technical views"],
    image: { src: cadWireframe, alt: "CAD wireframe of a ring" },
  },
  {
    id: "s-02",
    slug: "3d-modeling",
    index: "02",
    title: "3D Modeling",
    summary: "Detailed three-dimensional jewelry assets.",
    detail:
      "Clean, reusable meshes built for rendering, animation and real-time use, with consistent scale and material naming across a collection.",
    deliverables: ["Optimised meshes", "UV layouts", "GLB exports", "LOD variants"],
    image: { src: craftMetal, alt: "Macro of brushed gold surface" },
  },
  {
    id: "s-03",
    slug: "product-visualization",
    index: "03",
    title: "Product Visualization",
    summary: "Photorealistic jewelry renders.",
    detail:
      "Studio lighting recreated digitally: soft key, controlled rim light, contact shadow. Metal reads as metal, and stones return light the way they do on a bench.",
    deliverables: ["High-res stills", "Lifestyle crops", "E-commerce sets", "Retouched masters"],
    image: { src: finalRender, alt: "Photorealistic gold ring render" },
  },
  {
    id: "s-04",
    slug: "3d-animation",
    index: "04",
    title: "3D Animation",
    summary: "360-degree spins and cinematic product motion.",
    detail:
      "Turntables, macro camera moves and short cinematic sequences — paced slowly, lit consistently, delivered in web-ready formats.",
    deliverables: ["360° loops", "Cinematic sequences", "Web-optimised video", "Frame sets"],
    image: { src: heroRing, alt: "Ring on a dark pedestal" },
  },
  {
    id: "s-05",
    slug: "ar-vr",
    index: "05",
    title: "AR / VR",
    summary: "Interactive jewelry experiences.",
    detail:
      "Configurators, try-on prototypes and real-time viewers built from the same optimised asset pipeline used for rendering.",
    deliverables: ["GLB / USDZ", "Web configurators", "Real-time viewers", "Device-aware tiers"],
    image: { src: workEternity, alt: "Jewelry set on dark stone" },
  },
];
