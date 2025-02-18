import { PrismaClient } from "@prisma/client";
 
const globalForPrisma = global as unknown as { // object for keeping global prisma client 
  prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient(); // instantiate a new prisma client but we are first checking if there any prisma client instance

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma; // exporting the prisma ( used for any CRUD application in this app )