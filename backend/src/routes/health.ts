import { Router } from "express";
import prisma from "../utils/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  // Check database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      version: process.env.npm_package_version || "1.0.0",
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: "Database connection failed",
    });
  }
});

router.get("/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ready: true });
  } catch {
    res.status(503).json({ ready: false });
  }
});

export default router;
