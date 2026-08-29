/**
 * Studio-level configuration. Replace these values with verified studio
 * details — nothing here should be treated as a factual claim until confirmed.
 */
export const studio = {
  name: "Bambral 3D Studio",
  location: "Delhi · India",
  disciplines: ["CAD", "3D", "CGI"],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  /** Set a real handle/number before publishing. */
  whatsapp: "https://wa.me/",
  email: "studio@example.com",
} as const;

export const projectTypes = [
  "Jewelry CAD",
  "3D Modeling",
  "Product Visualization",
  "3D Animation",
  "AR / VR",
  "Something else",
] as const;
