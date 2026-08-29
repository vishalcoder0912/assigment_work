import { Request, Response, NextFunction } from "express";
import { createError } from "./errorHandler.js";

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(createError(`Route ${req.method} ${req.path} not found`, 404, "NOT_FOUND"));
}
