import request from 'supertest';
import { describe, it, expect } from "vitest";

//testi 1
describe("GET /api/dogs/random", () => {
it("Positive api test - random dog image", async () => {
const response = await request('http://localhost:5000')
.get("/api/dogs/random");
expect(response.status).toBe(200);
expect(response.body.success).toBe(true);
expect(response.body.data).toBeDefined();
expect(response.body.data.imageUrl).toBeDefined();
expect(typeof response.body.data.imageUrl).toBe("string");
});
});

//testi 2
describe("GET /api/dogs/invalid", () => {
it("Negative api test - invalid route", async () => {
const response = await request('http://localhost:5000')
.get("/api/dogs/invalid");
expect(response.status).toBe(404);
});
});
