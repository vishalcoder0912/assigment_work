import { Router } from "express";
import prisma from "../utils/prisma.js";
import { createProductSchema } from "../utils/validators.js";
import { AuthRequest } from "../middleware/auth.js";
import { createError } from "../middleware/errorHandler.js";

const router = Router();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET /api/products - Public: List products
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;

    const where: Record<string, unknown> = {};
    if (category) where.category = category;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      data: products,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:slug - Public: Get product by slug
router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      throw createError("Product not found", 404, "NOT_FOUND");
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/products - Admin: Create product
router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await prisma.product.create({ data });
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/products/:id - Admin: Update product
router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const data = createProductSchema.partial().parse(req.body);
    const product = await prisma.product.update({ where: { id }, data });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/products/:id - Admin: Delete product
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
