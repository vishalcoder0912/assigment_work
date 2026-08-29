import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  console.error("🔴 Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    statusCode: err.statusCode,
  });

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Invalid request data",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[])?.join(", ") || "field";
      return res.status(409).json({
        error: "Conflict",
        message: `A record with this ${target} already exists`,
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Not found",
        message: "Record not found",
      });
    }
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid token",
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Token expired",
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal server error" : "Request failed",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export function createError(message: string, statusCode: number = 500, code?: string): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  if (code) error.code = code;
  return error;
}
