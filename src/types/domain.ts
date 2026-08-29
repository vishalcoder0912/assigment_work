export interface VisualAsset {
  src: string;
  alt: string;
  width?: number | undefined;
  height?: number | undefined;
}

export type ProjectCategory =
  "3D Animation" | "Product Visualization" | "CAD Design" | "AR / VR" | "Diamond";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: VisualAsset;
  service: string;
  format: string;
  year: string;
  featured?: boolean | undefined;
  scale?: "sm" | "md" | "lg" | "full" | undefined;
  modelUrl?: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  modelUrl: string;
  thumbnailUrl: string;
  category: string;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface Material {
  id: string;
  name: string;
  type: string;
  color: string;
  roughness: number;
  metalness: number;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface Gemstone {
  id: string;
  name: string;
  color: string;
  cut: string;
  modelUrl?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface RingConfiguration {
  metal: string;
  gemstone: string;
  cut: string;
  finish: string;
  productId?: string | undefined;
}

export interface Configuration {
  id?: string | undefined;
  productId: string;
  materialId: string;
  gemstoneId: string;
  cut: string;
  finish: string;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface SavedConfiguration extends Configuration {
  id: string;
  reference: string;
  metal?: string | undefined;
  gemstone?: string | undefined;
  product?: Product | undefined;
  material?: Material | undefined;
  gemstoneData?: Gemstone | undefined;
}

export interface Inquiry {
  id?: string | undefined;
  fullName: string;
  email: string;
  company?: string | undefined;
  projectType?: string | undefined;
  message: string;
  createdAt?: string | undefined;
}

export interface InquirySubmitPayload {
  fullName: string;
  email: string;
  company?: string | undefined;
  projectType?: string | undefined;
  message: string;
}

export interface InquiryResult {
  ok: boolean;
  reference: string;
}

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
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}
