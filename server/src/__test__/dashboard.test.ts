import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import request from "supertest";
import { app } from "../index";

describe("GET /dashboard", () => {
  let res: any;

  beforeAll(async () => {
    res = await request(app).get("/dashboard").expect(200);
  });

  const checkProductStructure = (product: any) => {
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("cost");
    expect(product).toHaveProperty("rating");
    expect(product).toHaveProperty("stockQuantity");
    expect(product).toHaveProperty("totalSalesQuantity");
  };

  it("should return the correct structure for popularProducts", () => {
    expect(res.body).toHaveProperty("popularProducts");
    expect(res.body.popularProducts).toHaveLength(15);
    res.body.popularProducts.forEach((product: any) => {
      checkProductStructure(product);
    });
  });

  it("should return the correct structure for badPerformingProducts", () => {
    expect(res.body).toHaveProperty("badPerformingProducts");
    expect(res.body.badPerformingProducts).toHaveLength(15);
    res.body.badPerformingProducts.forEach((product: any) => {
      checkProductStructure(product);
      expect(product).toHaveProperty("margin");
      expect(product).toHaveProperty("performanceScore");
      expect(product).toHaveProperty("normalizedPerformanceScore");
    });
  });

  it("should return a valid salesSummary structure", () => {
    expect(res.body).toHaveProperty("salesSummary");
    if (res.body.salesSummary.length > 0) {
      const sales = res.body.salesSummary[0];
      expect(sales).toHaveProperty("id");
      expect(sales).toHaveProperty("productId");
      expect(sales).toHaveProperty("timestamp");
      expect(sales).toHaveProperty("quantity");
      expect(sales).toHaveProperty("unitPrice");
      expect(sales).toHaveProperty("totalTurnover");
      expect(sales.totalTurnover).toEqual(sales.quantity * sales.unitPrice);
    }
  });

  it("should return a valid assets structure", () => {
    expect(res.body).toHaveProperty("assets");
    expect(res.body.assets).toHaveProperty("vehicles");
    expect(res.body.assets).toHaveProperty("computers");
    expect(res.body.assets).toHaveProperty("furnitures");
    expect(res.body.assets).toHaveProperty("offices");
  });

  it("should return a valid totalExpenses structure", () => {
    expect(res.body).toHaveProperty("totalExpenses");
    expect(res.body.totalExpenses).toHaveProperty("purchases");
    expect(res.body.totalExpenses).toHaveProperty("salaries");
    expect(res.body.totalExpenses).toHaveProperty("assets");
  });

  it("should return a valid staffCount", () => {
    expect(res.body).toHaveProperty("staffCount");
  });

  it("should return a valid delivererCount", () => {
    expect(res.body).toHaveProperty("delivererCount");
  });
});
