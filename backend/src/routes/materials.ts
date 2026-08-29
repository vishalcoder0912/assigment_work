import { Router } from "express";
import prisma from "../utils/prisma.js";
import { createMaterialSchema } from "../utils/validators.js";
import { AuthRequest } from "../middleware/auth.js";
import { createError } from "../middleware/errorHandler.js";

const router = Router();

// GET /api/materials - Public: List materials
router.get("/", async (req, res, next) => {
  try {
    const materials = await prisma.material.findMany({ orderBy: { name: "asc" } });
    res.json({ data: materials });
  } catch (error) {
    next(error);
  }
});

// GET /api/materials/:id - Public: Get material by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const material = await prisma.material.findUnique({ where: { id } });
    if (!material) {
      throw createError("Material not found", 404, "NOT_FOUND");
    }
    res.json({ data: material });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/materials - Admin: Create material
router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const data = createMaterialSchema.parse(req.body);
    const material = await prisma.material.create({ data });
    res.status(201).json({ data: material });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/materials/:id - Admin: Update material
router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const data = createMaterialSchema.partial().parse(req.body);
    const material = await prisma.material.update({ where: { id }, data });
    res.json({ data: material });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/materials/:id - Admin: Delete material
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.material.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
