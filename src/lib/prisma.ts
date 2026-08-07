import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
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

const globalForPrisma = globalThis as unknown as {
  prisma?: unknown;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClientConstructor({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;