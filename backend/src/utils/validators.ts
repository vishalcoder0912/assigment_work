import { z } from "zod";

export const projectQuerySchema = z.object({
  category: z
    .enum(["ANIMATION_3D", "PRODUCT_VISUALIZATION", "CAD_DESIGN", "AR_VR", "DIAMOND"])
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
  featured: z.coerce.boolean().optional(),
});

export const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  description: z.string().min(1).max(5000),
  category: z.enum(["ANIMATION_3D", "PRODUCT_VISUALIZATION", "CAD_DESIGN", "AR_VR", "DIAMOND"]),
  imageUrl: z.string().url(),
  imageAlt: z.string().min(1).max(200),
  imageWidth: z.number().int().positive().optional(),
  imageHeight: z.number().int().positive().optional(),
  service: z.string().min(1).max(100),
  format: z.string().min(1).max(100),
  year: z.string().min(4).max(4),
  featured: z.boolean().default(false),
  scale: z.enum(["sm", "md", "lg", "full"]).optional(),
  modelUrl: z.string().url().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const journalQuerySchema = z.object({
  category: z.enum(["CAD", "MARKETING", "MANUFACTURING", "THREE_D", "TECHNOLOGY"]).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export const createJournalSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  category: z.enum(["CAD", "MARKETING", "MANUFACTURING", "THREE_D", "TECHNOLOGY"]),
  date: z.string().datetime(),
  excerpt: z.string().min(1).max(500),
  body: z.array(z.string().min(1)).min(1),
  readingTime: z.string().min(1).max(20),
});

export const updateJournalSchema = createJournalSchema.partial();

export const createInquirySchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  projectType: z.string().max(100).optional(),
  message: z.string().min(10).max(5000),
});

export const updateInquirySchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]).optional(),
});

export const createConfigurationSchema = z.object({
  productId: z.string().optional(),
  materialId: z.string().optional(),
  gemstoneId: z.string().optional(),
  metal: z.string().optional(),
  gemstone: z.string().optional(),
  cut: z.string().min(1).max(50),
  finish: z.string().min(1).max(50),
});

export const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(2000),
  modelUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  category: z.string().min(1).max(50),
});

export const createMaterialSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  roughness: z.number().min(0).max(1),
  metalness: z.number().min(0).max(1),
});

export const createGemstoneSchema = z.object({
  name: z.string().min(1).max(100),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  cut: z.string().min(1).max(50),
  modelUrl: z.string().url().optional(),
});

export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const authRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100).optional(),
});
