import { PrismaClient, ProjectCategory, JournalCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const bcrypt = await import("bcryptjs");
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bambral.studio" },
    update: {},
    create: {
      email: "admin@bambral.studio",
      passwordHash,
      name: "Admin User",
      role: "admin",
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create products
  const products = [
    {
      name: "Solitaire Ring",
      slug: "solitaire-ring",
      description: "Classic solitaire engagement ring with 4-prong setting",
      modelUrl: "/models/solitaire-ring.glb",
      thumbnailUrl: "/images/solitaire-thumb.jpg",
      category: "rings",
    },
    {
      name: "Eternity Band",
      slug: "eternity-band",
      description: "Full eternity band with channel-set diamonds",
      modelUrl: "/models/eternity-band.glb",
      thumbnailUrl: "/images/eternity-thumb.jpg",
      category: "rings",
    },
    {
      name: "Three Stone Ring",
      slug: "three-stone-ring",
      description: "Three-stone engagement ring with tapered baguettes",
      modelUrl: "/models/three-stone.glb",
      thumbnailUrl: "/images/three-stone-thumb.jpg",
      category: "rings",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log("✅ Created products");

  // Create materials
  const materials = [
    { name: "Yellow Gold", type: "gold", color: "#A88D62", roughness: 0.22, metalness: 0.9 },
    { name: "Rose Gold", type: "gold", color: "#B98A72", roughness: 0.24, metalness: 0.9 },
    { name: "Platinum", type: "platinum", color: "#C9C7C1", roughness: 0.16, metalness: 1.0 },
    { name: "Silver", type: "silver", color: "#D6D3CC", roughness: 0.12, metalness: 0.8 },
    { name: "White Gold", type: "gold", color: "#E8E4DC", roughness: 0.2, metalness: 0.9 },
  ];

  for (const material of materials) {
    await prisma.material.upsert({
      where: { name: material.name },
      update: {},
      create: material,
    });
  }
  console.log("✅ Created materials");

  // Create gemstones
  const gemstones = [
    { name: "Diamond", color: "#EDEAE3", cut: "round" },
    { name: "Ruby", color: "#8E1F2B", cut: "oval" },
    { name: "Emerald", color: "#1E5B45", cut: "emerald" },
    { name: "Sapphire", color: "#1B3A67", cut: "round" },
  ];

  for (const gemstone of gemstones) {
    await prisma.gemstone.upsert({
      where: { name: gemstone.name },
      update: {},
      create: gemstone,
    });
  }
  console.log("✅ Created gemstones");

  // Create projects
  const projects = [
    {
      slug: "ring-360-spin",
      title: "Ring 360° Spin",
      description:
        "A continuous turntable animation built for e-commerce product pages, lit as a single studio pass so the metal reads consistently through every frame.",
      category: ProjectCategory.ANIMATION_3D,
      imageUrl: "/assets/hero-ring.jpg",
      imageAlt: "Solitaire ring on a dark stone pedestal",
      imageWidth: 1600,
      imageHeight: 1200,
      service: "3D Animation",
      format: "1080×1080 loop · MP4 / WebM",
      year: "2025",
      featured: true,
      scale: "lg",
    },
    {
      slug: "eternal-ring-cad",
      title: "Eternal Ring CAD",
      description:
        "Production-ready CAD geometry with clean topology, prong tolerances and stone seats prepared for casting.",
      category: ProjectCategory.CAD_DESIGN,
      imageUrl: "/assets/cad-wireframe.jpg",
      imageAlt: "CAD wireframe of a solitaire ring",
      imageWidth: 1408,
      imageHeight: 1056,
      service: "Jewelry CAD",
      format: "STL / 3DM · print ready",
      year: "2025",
      scale: "md",
    },
    {
      slug: "white-gold-ring-showcase",
      title: "White Gold Ring Showcase",
      description:
        "A photorealistic still set exploring how a brushed white gold band responds to soft key light and controlled rim light.",
      category: ProjectCategory.PRODUCT_VISUALIZATION,
      imageUrl: "/assets/final-render.jpg",
      imageAlt: "Photorealistic render of an engraved gold solitaire ring",
      imageWidth: 1408,
      imageHeight: 1056,
      service: "Product Visualization",
      format: "4000px stills · PNG",
      year: "2025",
      featured: true,
      scale: "md",
    },
    {
      slug: "diamond-eternity-ring",
      title: "Diamond Eternity Ring",
      description:
        "Pavé geometry study: stone spacing, gallery depth and light return examined across the full band.",
      category: ProjectCategory.DIAMOND,
      imageUrl: "/assets/work-eternity.jpg",
      imageAlt: "Eternity band and pendant on dark stone",
      imageWidth: 1400,
      imageHeight: 1000,
      service: "CAD + Visualization",
      format: "Stills · 3DM",
      year: "2025",
      scale: "full",
    },
    {
      slug: "classic-solitaire-ring",
      title: "Classic Solitaire Ring",
      description:
        "A restrained single-stone study — one light, one shadow, one reflection line across the shank.",
      category: ProjectCategory.PRODUCT_VISUALIZATION,
      imageUrl: "/assets/craft-facets.jpg",
      imageAlt: "Macro study of diamond facets",
      imageWidth: 1200,
      imageHeight: 1500,
      service: "Product Visualization",
      format: "Vertical stills",
      year: "2024",
      scale: "sm",
    },
    {
      slug: "engagement-ring-cad",
      title: "Engagement Ring CAD",
      description:
        "Bespoke engagement ring modelled from a hand sketch, delivered with a wax-print-ready file set.",
      category: ProjectCategory.CAD_DESIGN,
      imageUrl: "/assets/craft-metal.jpg",
      imageAlt: "Macro study of brushed gold surface",
      imageWidth: 1200,
      imageHeight: 900,
      service: "Jewelry CAD",
      format: "3DM / STL",
      year: "2024",
      scale: "sm",
    },
    {
      slug: "ar-try-on",
      title: "AR Try-On",
      description:
        "A browser-based try-on prototype: optimised jewelry meshes streamed to mobile with device-aware quality tiers.",
      category: ProjectCategory.AR_VR,
      imageUrl: "/assets/hero-ring.jpg",
      imageAlt: "Ring rendered for augmented reality try-on",
      imageWidth: 1600,
      imageHeight: 1200,
      service: "AR / VR",
      format: "GLB / USDZ",
      year: "2025",
      scale: "md",
    },
    {
      slug: "necklace-360-spin",
      title: "Necklace 360° Spin",
      description:
        "Chain simulation and turntable animation for a pendant collection, rendered with matched studio lighting.",
      category: ProjectCategory.ANIMATION_3D,
      imageUrl: "/assets/work-eternity.jpg",
      imageAlt: "Pendant necklace photographed on dark fabric",
      imageWidth: 1400,
      imageHeight: 1000,
      service: "3D Animation",
      format: "Loop · MP4",
      year: "2024",
      scale: "md",
    },
    {
      slug: "three-stone-ring-cad",
      title: "Three-Stone Ring CAD",
      description:
        "Symmetry, stone height and gallery clearance resolved across a three-stone setting.",
      category: ProjectCategory.CAD_DESIGN,
      imageUrl: "/assets/cad-wireframe.jpg",
      imageAlt: "Wireframe topology of a jewelry model",
      imageWidth: 1408,
      imageHeight: 1056,
      service: "Jewelry CAD",
      format: "3DM",
      year: "2024",
      scale: "sm",
    },
    {
      slug: "cgi-and-vfx",
      title: "CGI & VFX",
      description:
        "Cinematic jewelry sequences combining CGI product passes with practical-feeling light and atmosphere.",
      category: ProjectCategory.ANIMATION_3D,
      imageUrl: "/assets/final-render.jpg",
      imageAlt: "Cinematic render of a gold ring",
      imageWidth: 1408,
      imageHeight: 1056,
      service: "CGI / VFX",
      format: "Sequence · ProRes",
      year: "2025",
      featured: true,
      scale: "lg",
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log("✅ Created projects");

  // Create journal posts
  const journalPosts = [
    {
      slug: "the-future-of-jewelry-cad",
      title: "The Future of Jewelry CAD",
      category: JournalCategory.CAD,
      date: new Date("2026-02-18"),
      excerpt:
        "Parametric thinking is quietly replacing the sketch-then-model habit. What changes when geometry becomes editable intent?",
      body: [
        "For most of the last two decades, jewelry CAD has been treated as a translation step: a designer draws, a modeller rebuilds. The file is the end of a conversation rather than part of it.",
        "Parametric workflows invert that. Shank width, stone size, gallery height and prong count become named values instead of frozen geometry, and a design becomes a family of designs.",
        "The practical benefit is not speed. It is revision confidence — the ability to change a stone size late in a project without quietly breaking the seat below it.",
      ],
      readingTime: "6 min",
    },
    {
      slug: "3d-animation-for-jewelry-ecommerce",
      title: "3D Animation for Jewelry E-commerce",
      category: JournalCategory.MARKETING,
      date: new Date("2026-01-30"),
      excerpt:
        "A 360° spin is not a gimmick. It is the closest a screen gets to picking a piece up.",
      body: [
        "Jewelry is judged by movement. Light travels across a polished shank and returns from a pavé line; a static photograph shows one instant of that.",
        "The discipline is restraint: slow rotation, consistent lighting, no cuts. The moment an animation becomes a showreel, it stops being product information.",
        "Delivery matters as much as the render. A loop that costs three megabytes and starts instantly beats a beautiful sequence nobody waits for.",
      ],
      readingTime: "5 min",
    },
    {
      slug: "designing-production-ready-jewelry-models",
      title: "Designing Production-Ready Jewelry Models",
      category: JournalCategory.MANUFACTURING,
      date: new Date("2026-01-12"),
      excerpt:
        "The difference between a beautiful render and a castable piece is usually measured in tenths of a millimetre.",
      body: [
        "A model can look flawless in a viewport and fail on the bench. Wall thickness, prong mass and sprue placement are design decisions, not afterthoughts.",
        "We treat manufacturability as a review pass: every model is checked against casting minimums and stone-setting clearance before it is called finished.",
        "This is where CAD expertise and jewelry expertise have to sit in the same room.",
      ],
      readingTime: "7 min",
    },
    {
      slug: "photorealistic-jewelry-visualization",
      title: "Photorealistic Jewelry Visualization",
      category: JournalCategory.THREE_D,
      date: new Date("2025-12-04"),
      excerpt:
        "Realism in jewelry rendering is a lighting problem long before it is a material problem.",
      body: [
        "Metals are mirrors. A gold surface shows almost nothing of itself — it shows the room. Build the room first.",
        "Stones need the opposite attention: controlled refraction, believable dispersion, and enough dark in the environment for the bright returns to mean something.",
        "Most renders that read as fake are simply over-lit.",
      ],
      readingTime: "6 min",
    },
    {
      slug: "3d-printing-and-jewelry-manufacturing",
      title: "3D Printing and Jewelry Manufacturing",
      category: JournalCategory.TECHNOLOGY,
      date: new Date("2025-11-16"),
      excerpt:
        "Resin printing changed the tolerance conversation between digital design and the casting floor.",
      body: [
        "High-resolution resin printing made fine detail reproducible, but it also made design errors reproducible at scale.",
        "Orientation, support placement and shrinkage all feed back into how a model should be built in the first place.",
        "The studios that get consistent results are the ones treating the printer as part of the design system rather than an output device.",
      ],
      readingTime: "5 min",
    },
  ];

  for (const post of journalPosts) {
    await prisma.journalPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log("✅ Created journal posts");

  // Create sample configurations
  const configurations = [
    {
      reference: "BM-A1B2C3",
      productId: "solitaire-ring",
      materialId: "Yellow Gold",
      gemstoneId: "Diamond",
      cut: "round",
      finish: "polished",
    },
    {
      reference: "BM-D4E5F6",
      productId: "eternity-band",
      materialId: "Platinum",
      gemstoneId: "Diamond",
      cut: "round",
      finish: "polished",
    },
    {
      reference: "BM-G7H8I9",
      productId: "three-stone-ring",
      materialId: "Rose Gold",
      gemstoneId: "Emerald",
      cut: "emerald",
      finish: "satin",
    },
  ];

  for (const config of configurations) {
    await prisma.configuration.upsert({
      where: { reference: config.reference },
      update: {},
      create: config,
    });
  }
  console.log("✅ Created sample configurations");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
