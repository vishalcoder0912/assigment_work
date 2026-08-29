import { Router } from "express";
import prisma from "../utils/prisma.js";
import { createConfigurationSchema } from "../utils/validators.js";
import { AuthRequest } from "../middleware/auth.js";
import { createError } from "../middleware/errorHandler.js";

const router = Router();

const CUTS = [
  { id: "round", label: "Round", segments: 24 },
  { id: "princess", label: "Princess", segments: 4 },
  { id: "emerald", label: "Emerald", segments: 8 },
  { id: "radiant", label: "Radiant", segments: 6 },
  { id: "oval", label: "Oval", segments: 20 },
];

const FINISHES = [
  { id: "polished", label: "Polished", roughness: 0.06 },
  { id: "satin", label: "Satin", roughness: 0.28 },
  { id: "brushed", label: "Brushed", roughness: 0.46 },
];

function generateReference(): string {
  return `CFG-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

// GET /api/configurations/cuts - Public: Get available cuts
router.get("/cuts", async (_req, res) => {
  res.json({ data: CUTS });
});

// GET /api/configurations/finishes - Public: Get available finishes
router.get("/finishes", async (_req, res) => {
  res.json({ data: FINISHES });
});

// POST /api/configurations - Public: Save configuration
router.post("/", async (req, res, next) => {
  try {
    const data = createConfigurationSchema.parse(req.body);
    const reference = generateReference();

    const config = await prisma.configuration.create({
      data: { ...data, reference },
    });

    res.status(201).json({ data: config });
  } catch (error) {
    next(error);
  }
});

// GET /api/configurations - Public: List configurations
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const [configs, total] = await Promise.all([
      prisma.configuration.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.configuration.count(),
    ]);

    res.json({
      data: configs,
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

// GET /api/configurations/:reference - Public: Get configuration by reference
router.get("/:reference", async (req, res, next) => {
  try {
    const { reference } = req.params;
    const config = await prisma.configuration.findUnique({ where: { reference } });
    if (!config) {
      throw createError("Configuration not found", 404, "NOT_FOUND");
    }
    res.json({ data: config });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/configurations/:id - Admin: Delete configuration
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.configuration.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
