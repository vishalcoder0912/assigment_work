import { Router } from "express";
import prisma from "../utils/prisma.js";
import { createInquirySchema, updateInquirySchema } from "../utils/validators.js";
import { AuthRequest } from "../middleware/auth.js";
import { createError } from "../middleware/errorHandler.js";

const router = Router();

function generateReference(): string {
  return `BM-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

// POST /api/inquiries - Public: Submit inquiry
router.post("/", async (req, res, next) => {
  try {
    const data = createInquirySchema.parse(req.body);

    const reference = generateReference();

    const inquiry = await prisma.inquiry.create({
      data: {
        ...data,
        reference,
      },
    });

    res.status(201).json({
      data: {
        ok: true,
        reference: inquiry.reference,
        id: inquiry.id,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/inquiries - Admin: List inquiries with pagination
router.get("/", async (req: AuthRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { reference: { contains: search, mode: "insensitive" } },
      ];
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { user: { select: { id: true, email: true, name: true } } },
      }),
      prisma.inquiry.count({ where }),
    ]);

    res.json({
      data: inquiries,
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

// GET /api/admin/inquiries/:id - Admin: Get single inquiry
router.get("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
    if (!inquiry) {
      throw createError("Inquiry not found", 404, "NOT_FOUND");
    }
    res.json({ data: inquiry });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/inquiries/:id - Admin: Update inquiry status
router.patch("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const data = updateInquirySchema.parse(req.body);

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data,
      include: { user: { select: { id: true, email: true, name: true } } },
    });

    res.json({ data: inquiry });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/inquiries/:id - Admin: Delete inquiry
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.inquiry.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
