import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "test-secret-key-for-testing-only";

describe("Backend API", () => {
  let app: express.Express;
  let adminToken: string;

  beforeAll(() => {
    adminToken = jwt.sign(
      { id: "test-user-id", email: "test@test.com", name: "Test User", role: "admin" },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
  });

  describe("Health Check", () => {
    it("should return healthy status", async () => {
      const response = await request(app).get("/api/health");
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("healthy");
    });
  });

  describe("Projects API", () => {
    it("should return empty list when no projects", async () => {
      const response = await request(app).get("/api/projects");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("Authentication", () => {
    it("should reject requests without token", async () => {
      const response = await request(app).post("/api/admin/projects").send({ title: "Test" });
      expect(response.status).toBe(401);
    });

    it("should accept valid token", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(response.status).toBe(200);
    });
  });
});
