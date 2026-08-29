import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { authLoginSchema, authRegisterSchema } from "../utils/validators.js";
import { generateToken, AuthRequest } from "../middleware/auth.js";
import { createError } from "../middleware/errorHandler.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = authLoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw createError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw createError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = authRegisterSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw createError("Email already registered", 409, "EMAIL_EXISTS");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", async (req: AuthRequest, res, next) => {
  try {
    if (!req.user) {
      throw createError("Not authenticated", 401, "UNAUTHORIZED");
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    if (!user) {
      throw createError("User not found", 404, "NOT_FOUND");
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/refresh", async (req: AuthRequest, res, next) => {
  try {
    if (!req.user) {
      throw createError("Not authenticated", 401, "UNAUTHORIZED");
    }

    const token = generateToken(req.user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
