import { Router } from "express";
import prisma from "../utils/prisma.js";
import { createGemstoneSchema } from "../utils/validators.js";
import { AuthRequest } from "../middleware/auth.js";
import { createError } from "../middleware/errorHandler.js";

const router = Router();

// GET /api/gemstones - Public: List gemstones
router.get("/", async (req, res, next) => {
  try {
    const gemstones = await prisma.gemstone.findMany({ orderBy: { name: "asc" } });
    res.json({ data: gemstones });
  } catch (error) {
    next(error);
  }
});

// GET /api/gemstones/:id - Public: Get gemstone by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const gemstone = await prisma.gemstone.findUnique({ where: { id } });
    if (!gemstone) {
      throw createError("Gemstone not found", 404, "NOT_FOUND");
    }
    res.json({ data: gemstone });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/gemstones - Admin: Create gemstone
router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const data = createGemstoneSchema.parse(req.body);
    const gemstone = await prisma.gemstone.create({ data });
    res.status(201).json({ data: gemstone });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/gemstones/:id - Admin: Update gemstone
router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const data = createGemstoneSchema.partial().parse(req.body);
    const gemstone = await prisma.gemstone.update({ where: { id }, data });
    res.json({ data: gemstone });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/gemstones/:id - Admin: Delete gemstone
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.gemstone.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
