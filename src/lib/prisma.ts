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

// A connection idling in the pool can be dropped by the server at any time
// (e.g. Supabase's Supavisor pooler recycling it after a few idle minutes).
// node-postgres surfaces that as an 'error' event on the Pool — with no
// listener, Node treats it as an uncaught exception and crashes the whole
// process, which is what surfaced as a bare "Internal Server Error" page.
// Only attached once per Pool instance (not on every dev-mode Fast Refresh
// reuse of the cached one) to avoid stacking duplicate listeners.
if (!globalForPrisma.pgPool) {
  pool.on("error", (err) => {
    console.error("Unexpected error on idle Postgres client", err);
  });
}

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