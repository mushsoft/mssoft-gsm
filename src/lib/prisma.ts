import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import type { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

// Both the pg Pool and the PrismaClient must be cached across Next.js dev-mode
// Fast Refresh module re-evaluations — caching only the client (as before)
// left a fresh, never-closed `Pool` (each opening its own connections) leaking
// on every file save, eventually exhausting the local dev Postgres and
// causing writes to silently fail after long dev sessions.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

const pool = globalForPrisma.pgPool ?? new Pool({ connectionString });
const adapter = new PrismaPg(pool);

type PrismaClientCtor = new (options: { adapter: PrismaPg }) => unknown;

const prismaClientModule = (await import("@prisma/client")) as unknown as {
  PrismaClient?: PrismaClientCtor;
  default?: {
    PrismaClient?: PrismaClientCtor;
  };
};

const PrismaClientConstructor =
  prismaClientModule.PrismaClient ?? prismaClientModule.default?.PrismaClient;

if (!PrismaClientConstructor) {
  throw new Error("Could not resolve PrismaClient constructor from @prisma/client");
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? (new PrismaClientConstructor({ adapter }) as PrismaClient);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pgPool = pool;
}