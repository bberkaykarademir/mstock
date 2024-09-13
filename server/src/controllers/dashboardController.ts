import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPopularProducts(limit: number) {
  const salesGroupedByProduct = await prisma.sales.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: limit,
  });

  const productIds = salesGroupedByProduct.map((sale) => sale.productId);

  const popularProductsWithoutTotalSalesQuantity =
    await prisma.products.findMany({
      where: { id: { in: productIds } },
    });

  return salesGroupedByProduct.map((sale) => {
    const product = popularProductsWithoutTotalSalesQuantity.find(
      (p) => p.id === sale.productId
    );
    return {
      ...product,
      totalSalesQuantity: sale._sum.quantity,
    };
  });
}

async function getBadPerformingProducts(limit: number) {
  const salesGroupedByProductAll = await prisma.sales.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
  });

  const allProductIds = salesGroupedByProductAll.map((sale) => sale.productId);

  const allProducts = await prisma.products.findMany({
    where: { id: { in: allProductIds } },
  });

  const nonSortedBadPerformingProducts = allProducts.map((product) => {
    const salesData = salesGroupedByProductAll.find(
      (sale) => sale.productId === product.id
    );
    const totalSalesQuantity = salesData?._sum.quantity || 0;
    const margin = ((product.price - product.cost) / product.price) * 100;
    const performanceScore = totalSalesQuantity * margin;

    return {
      ...product,
      totalSalesQuantity,
      margin,
      performanceScore,
    };
  });

  const minScore = Math.min(
    ...nonSortedBadPerformingProducts.map((p) => p.performanceScore)
  );
  const maxScore = Math.max(
    ...nonSortedBadPerformingProducts.map((p) => p.performanceScore)
  );

  return nonSortedBadPerformingProducts
    .map((item) => {
      const normalizedPerformanceScore =
        ((item.performanceScore - minScore) / (maxScore - minScore)) * 100;

      return {
        ...item,
        normalizedPerformanceScore: normalizedPerformanceScore.toFixed(2),
      };
    })
    .sort(
      (a, b) =>
        parseFloat(a.normalizedPerformanceScore) -
        parseFloat(b.normalizedPerformanceScore)
    )
    .slice(0, limit);
}

async function getSalesSummary(startDate: Date, endDate: Date) {
  const sales = await prisma.sales.findMany({
    where: {
      timestamp: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  return sales.map((sale) => ({
    ...sale,
    totalTurnover: sale.quantity * sale.unitPrice,
  }));
}

async function getCompanyMetrics() {
  const delivererCount = await prisma.deliverer.count();
  const staffCount = await prisma.staff.count();

  const vehicleCount = await prisma.assets
    .findMany({ where: { type: "VEHICLE" } })
    .then((vehicles) =>
      vehicles.reduce((acc, vehicle) => acc + vehicle.quantity, 0)
    );

  const computerCount = await prisma.assets
    .findMany({ where: { type: "COMPUTER" } })
    .then((computers) =>
      computers.reduce((acc, computer) => acc + computer.quantity, 0)
    );

  const furnitureCount = await prisma.assets
    .findMany({ where: { type: "FURNITURE" } })
    .then((furnitures) =>
      furnitures.reduce((acc, furniture) => acc + furniture.quantity, 0)
    );

  const officeCount = await prisma.assets
    .findMany({ where: { type: "OFFICE" } })
    .then((offices) =>
      offices.reduce((acc, office) => acc + office.quantity, 0)
    );

  return {
    delivererCount,
    staffCount,
    assets: {
      vehicles: vehicleCount,
      computers: computerCount,
      furnitures: furnitureCount,
      offices: officeCount,
    },
  };
}

async function getTotalExpenses() {
  const totalCostOfPurchases = await prisma.purchases
    .findMany()
    .then((purchases) =>
      purchases.reduce((total, purchase) => total + purchase.totalCost, 0)
    );

  const totalCostOfSalaries = await prisma.staff
    .findMany({ select: { salary: true } })
    .then((salaries) =>
      salaries.reduce((total, staff) => total + staff.salary, 0)
    );

  const totalCostOfAssets = await prisma.assets
    .findMany({ select: { quantity: true, cost: true } })
    .then((assets) =>
      assets.reduce((total, asset) => total + asset.quantity * asset.cost, 0)
    );

  return {
    purchases: totalCostOfPurchases,
    salaries: totalCostOfSalaries,
    assets: totalCostOfAssets,
  };
}

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await getPopularProducts(15);
    const badPerformingProducts = await getBadPerformingProducts(15);
    const salesSummary = await getSalesSummary(
      new Date("2024-01-01T00:00:00Z"),
      new Date("2025-01-01T00:00:00Z")
    );
    const companyMetrics = await getCompanyMetrics();
    const totalExpenses = await getTotalExpenses();

    res.json({
      popularProducts,
      badPerformingProducts,
      salesSummary,
      ...companyMetrics,
      totalExpenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
