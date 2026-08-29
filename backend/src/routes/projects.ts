import { Router } from "express";
import prisma from "../utils/prisma.js";
import {
  projectQuerySchema,
  createProjectSchema,
  updateProjectSchema,
} from "../utils/validators.js";
import { AuthRequest } from "../middleware/auth.js";
import { createError } from "../middleware/errorHandler.js";

const router = Router();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function generateUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) break;
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
}

// GET /api/projects - Public: List projects with filtering, pagination
router.get("/", async (req, res, next) => {
  try {
    const query = projectQuerySchema.parse(req.query);
    const { category, search, page, limit, featured } = query;

    const where: Record<string, unknown> = {};

    if (category) where.category = category;
    if (featured !== undefined) where.featured = featured;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      data: projects,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/featured - Public: Get featured projects
router.get("/featured", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:slug - Public: Get single project by slug
router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) {
      throw createError("Project not found", 404, "NOT_FOUND");
    }
    res.json({ data: project });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:slug/related - Public: Get related projects
router.get("/:slug/related", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const limit = parseInt(req.query.limit as string) || 2;

    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) {
      throw createError("Project not found", 404, "NOT_FOUND");
    }

    const related = await prisma.project.findMany({
      where: {
        slug: { not: slug },
        category: project.category,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    res.json({ data: related });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/projects - Admin: Create project
router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const data = createProjectSchema.parse(req.body);
    const slug = data.slug || (await generateUniqueSlug(slugify(data.title)));

    const project = await prisma.project.create({
      data: { ...data, slug },
    });

    res.status(201).json({ data: project });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/projects/:id - Admin: Update project
router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const data = updateProjectSchema.parse(req.body);

    let slug = data.slug;
    if (data.title && !data.slug) {
      slug = await generateUniqueSlug(slugify(data.title), id);
    } else if (data.slug) {
      slug = await generateUniqueSlug(data.slug, id);
    }

    const project = await prisma.project.update({
      where: { id },
      data: { ...data, slug },
    });

    res.json({ data: project });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/projects/:id - Admin: Delete project
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
