import { Client } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { PrismaClient } from "@prisma/client";

// With PlanetScale (or its local HTTP simulator), use the PlanetScale adapter.
// Otherwise (e.g. TiDB Cloud), use a regular Prisma client over DATABASE_URL.
const createPrismaEdge = () => {
  if (process.env.PLANETSCALE_DATABASE_URL) {
    const client = new Client({ url: process.env.PLANETSCALE_DATABASE_URL });
    return new PrismaClient({ adapter: new PrismaPlanetScale(client) });
  }
  return new PrismaClient();
};

declare global {
  var prismaEdge: PrismaClient | undefined;
}

export const prismaEdge = global.prismaEdge ?? createPrismaEdge();

if (process.env.NODE_ENV !== "production") {
  global.prismaEdge = prismaEdge;
}
