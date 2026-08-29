import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { authMiddleware } from "./middleware/auth.js";
import projectRoutes from "./routes/projects.js";
import journalRoutes from "./routes/journal.js";
import inquiryRoutes from "./routes/inquiries.js";
import configurationRoutes from "./routes/configurations.js";
import productRoutes from "./routes/products.js";
import materialRoutes from "./routes/materials.js";
import gemstoneRoutes from "./routes/gemstones.js";
import authRoutes from "./routes/auth.js";
import healthRoutes from "./routes/health.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow frontend to load resources
    crossOriginEmbedderPolicy: false,
  }),
);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many authentication attempts, please try again later" },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging
app.use(morgan("combined"));

// Health check (no rate limit)
app.use("/api/health", healthRoutes);

// Public API routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/configurations", configurationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/gemstones", gemstoneRoutes);

// Protected admin routes (require authentication)
app.use("/api/admin", authMiddleware);
app.use("/api/admin/projects", projectRoutes);
app.use("/api/admin/journal", journalRoutes);
app.use("/api/admin/inquiries", inquiryRoutes);
app.use("/api/admin/configurations", configurationRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/admin/materials", materialRoutes);
app.use("/api/admin/gemstones", gemstoneRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
});

export default app;
