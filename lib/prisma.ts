import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"; // Ensure you have 'pg' installed
import { PrismaClient } from "./generated/prisma/client";
import "dotenv/config";

// 1. Create a pool for your database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Initialize the adapter
const adapter = new PrismaPg(pool);

// 3. Prevent multiple instances in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    // Optional: Log queries in development mode
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
