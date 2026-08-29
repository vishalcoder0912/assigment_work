import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { createError } from "./errorHandler.js";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError("Authentication required", 401, "UNAUTHORIZED"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name?: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(createError("Token expired", 401, "TOKEN_EXPIRED"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createError("Invalid token", 401, "INVALID_TOKEN"));
    }
    return next(createError("Authentication failed", 401, "AUTH_FAILED"));
  }
}

export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name?: string;
      role: string;
    };
    req.user = decoded;
  } catch {
    // Ignore invalid tokens for optional auth
  }

  next();
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError("Authentication required", 401, "UNAUTHORIZED"));
    }

    if (!roles.includes(req.user.role)) {
      return next(createError("Insufficient permissions", 403, "FORBIDDEN"));
    }

    next();
  };
}

export function generateToken(user: {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
}
