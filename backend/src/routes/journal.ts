import { Router } from "express";
import prisma from "../utils/prisma.js";
import {
  journalQuerySchema,
  createJournalSchema,
  updateJournalSchema,
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
    const existing = await prisma.journalPost.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) break;
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
}

// GET /api/journal - Public: List journal posts
router.get("/", async (req, res, next) => {
  try {
    const query = journalQuerySchema.parse(req.query);
    const { category, search, page, limit } = query;

    const where: Record<string, unknown> = {};

    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { body: { hasSome: [search] } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.journalPost.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.journalPost.count({ where }),
    ]);

    res.json({
      data: posts,
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

// GET /api/journal/categories - Public: Get all categories
router.get("/categories", async (_req, res, next) => {
  try {
    const categories = await prisma.journalPost.groupBy({
      by: ["category"],
      _count: { category: true },
    });
    res.json({
      data: categories.map((c) => ({
        category: c.category,
        count: c._count.category,
      })),
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/journal/:slug - Public: Get single journal post
router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await prisma.journalPost.findUnique({ where: { slug } });
    if (!post) {
      throw createError("Journal post not found", 404, "NOT_FOUND");
    }
    res.json({ data: post });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/journal - Admin: Create journal post
router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const data = createJournalSchema.parse(req.body);
    const slug = data.slug || (await generateUniqueSlug(slugify(data.title)));

    const post = await prisma.journalPost.create({
      data: { ...data, slug, date: new Date(data.date) },
    });

    res.status(201).json({ data: post });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/journal/:id - Admin: Update journal post
router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const data = updateJournalSchema.parse(req.body);

    let slug = data.slug;
    if (data.title && !data.slug) {
      slug = await generateUniqueSlug(slugify(data.title), id);
    } else if (data.slug) {
      slug = await generateUniqueSlug(data.slug, id);
    }

    const updateData = { ...data, slug };
    if (data.date) updateData.date = new Date(data.date) as unknown as string;

    const post = await prisma.journalPost.update({
      where: { id },
      data: updateData as { slug: string; date?: Date },
    });

    res.json({ data: post });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/journal/:id - Admin: Delete journal post
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.journalPost.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
